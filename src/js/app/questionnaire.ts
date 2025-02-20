import {RadioToggler} from "./RadioToggler";

class Questionnaire {
    el: HTMLFormElement;
    previousStep: string | null;
    actualStep: string;
    buttonsStep: NodeListOf<Element>;
    buttonsPrev: NodeListOf<Element>;
    sections: NodeListOf<Element>;

    processBlock: HTMLElement;
    progressLine: HTMLElement | undefined;
    progressField: Element | undefined;

    checkboxPolicy: NodeListOf<HTMLInputElement>;
    checkboxButtons: NodeListOf<HTMLInputElement>;

    resetButtons: NodeListOf<HTMLElement>;

    constructor(el: HTMLFormElement) {
        this.el = el;
        this.previousStep = null;
        this.actualStep = '0';

        this.buttonsStep = el.querySelectorAll('[data-step-target]');
        this.buttonsPrev = el.querySelectorAll('[data-step-back]');
        this.sections = el.querySelectorAll('[data-step-section]');
        this.progressLine = el.querySelector('[data-form-progress="line"]');
        this.progressField = el.querySelector('[data-form-progress="field"]');
        this.checkboxPolicy = el.querySelectorAll('[data-form-questionare="policy"]');
        this.checkboxButtons = el.querySelectorAll('[data-form-questionare="submit-button"]');
        this.processBlock = el.querySelector('[data-questionnaire-progress="block"]');
        this.resetButtons = el.querySelectorAll('[data-form-questionare="button-reset"]');

        this.setListeners();
        this.initRadioTogglers();
        this.initResultMessage();
    }

    setListeners = () => {
        this.buttonsStep.forEach((item) => {
           item.addEventListener('click', () => {
               const attr = item.getAttribute('data-step-target');
               const actualSection: HTMLElement = this.el.querySelector(`[data-step-section='${this.actualStep}']`);

               const isValid = (Number(attr) > Number(this.actualStep)) ? this.validateSection(actualSection) : true;

               if (isValid) this.changeSection(attr);
           })
        });

        this.buttonsPrev.forEach((item) => {
            item.addEventListener('click', () => {
                if (this.previousStep) {
                    this.changeSection(this.previousStep);
                } else {
                    console.error('Предыдущего шага нет');
                }
            })
        });

        this.checkboxPolicy.forEach((item) => {
            item.addEventListener('change', () => {
                this.setPolicy(item.checked);
            });
        });

        this.resetButtons.forEach((item) => {
            item.addEventListener('click', () => {
                this.resetForm();
            })
        });
    }

    changeSection = (id: string) => {
        this.sections.forEach((item) => {
            const atrKey = item.getAttribute('data-step-section');

            if (atrKey !== id) {
                item.setAttribute('hidden', 'hidden');
            } else {
                this.previousStep = this.actualStep;
                this.actualStep = atrKey;
                item.removeAttribute('hidden');
                this.setProgress(item);
                this.hideProcess(atrKey === 'completed');
            }
        });
    }

    initRadioTogglers = () => {
        const elements = this.el.querySelectorAll('[data-radio-toggler="block"]');

        elements.forEach((item) => {
            new RadioToggler(item);
        })
    }

    setProgress = (el: Element) => {
        const progressVal = el.getAttribute('data-questionnaire-progress');
        this.progressField.innerHTML = progressVal;
        this.progressLine.style.setProperty('width', `${progressVal}%`);
    }

    setPolicy = (mode: boolean) => {
        this.checkboxPolicy.forEach((item) => {
            item.checked = mode;
        });

        this.checkboxButtons.forEach((item) => {
            if (mode) {
                item.removeAttribute('disabled');
            } else {
                item.setAttribute('disabled', 'disabled');
            }
        });
    }

    hideProcess = (mode: boolean) => {
        if (mode) {
            this.processBlock.setAttribute('hidden', 'hidden');
        } else {
            this.processBlock.removeAttribute('hidden');
        }
    }

    resetForm = () => {
        this.changeSection('0');
        this.el.reset();
    }

    validateSection = (el: HTMLElement): boolean => {
        const inputs = el.querySelectorAll('input, textarea');
        const fieldsByName: { [key: string]: (HTMLInputElement | HTMLTextAreaElement)[] } = {};

        inputs.forEach((field: HTMLInputElement | HTMLTextAreaElement) => {
            const name = field.name;
            if (!fieldsByName[name]) {
                fieldsByName[name] = [];
            }
            fieldsByName[name].push(field);
        });

        for (const name in fieldsByName) {
            if (fieldsByName.hasOwnProperty(name)) {
                const fields = fieldsByName[name];

                if (fields[0].type === 'radio' || fields[0].type === 'checkbox') {
                    const isAnyChecked = fields.some((field: HTMLInputElement) => field.checked);
                    if (!isAnyChecked) {
                        return false;
                    }
                }

                else if (fields[0].type === 'text' || fields[0].tagName.toLowerCase() === 'textarea') {
                    const isEmpty = fields.every((field: HTMLInputElement | HTMLTextAreaElement) => field.value.trim() === '');

                    if (isEmpty) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    initResultMessage = () => {
        const self = this;

        try {
            document.addEventListener('fetchit:after', (e) => {
                // @ts-ignore
                const { response } = e.detail;
                console.log(response);

                if (response['success'] === true) {
                    if (
                        this.el.id === 'form-ipoteka'
                        || this.el.id === 'form-lawyer'
                        || this.el.id === 'form-rooms'
                    ) {
                        self.changeSection('completed');
                        console.log('Вывести последний блок');
                    }
                }
            })
        } catch {
            console.error('Неизвестная ошибка во время отправки');
        }
    }
}

export {
    Questionnaire,
}
