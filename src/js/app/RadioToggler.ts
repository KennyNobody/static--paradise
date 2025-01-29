class RadioToggler {
    el: Element;
    inputs: NodeListOf<HTMLInputElement>;
    button: NodeListOf<HTMLElement>;

    constructor(el: Element) {
        this.el = el;
        this.inputs = el.querySelectorAll('[data-radio-toggler="input"]');
        this.button = el.querySelectorAll('[data-radio-toggler="button"]');

        console.log('init');

        this.inputs.forEach((item) => {
            item.addEventListener('change', () => {
                const val = item.getAttribute('data-radio-toggler-taget');
                this.setValue(val);
            })
        })
    }

    setValue = (val: string): void => {
        this.button.forEach((item) => {
            item.setAttribute('data-step-target', val);
        })
    }
}

export {
    RadioToggler,
}
