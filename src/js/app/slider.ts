import Swiper, {Autoplay, Pagination} from "swiper";

class Slider {
    el: HTMLElement;
    instance: Swiper;
    container: HTMLElement;
    buttonPrev?: HTMLElement;
    buttonNext?: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;
        this.container = el.querySelector('[data-slider="container"]');
        this.buttonPrev = el.querySelector('[data-slider="nav-prev"]');
        this.buttonNext = el.querySelector('[data-slider="nav-next"]');

        const sliderName = el.getAttribute('data-slider');

        if (sliderName === 'reviews') this.initReviewSlider();
        if (sliderName === 'preview') this.initPreviewSlider();
        if (sliderName === 'services') this.initServicesSlider();

        if (this.instance && this.buttonPrev) {
            this.buttonPrev.addEventListener('click', () => {
                this.instance.slidePrev();
            });
        }

        if (this.instance && this.buttonNext) {
            this.buttonNext.addEventListener('click', () => {
                console.log('4');
                this.instance.slideNext();
            });
        }
    }

    initReviewSlider = () => {
        const self = this;

        this.instance = new Swiper(this.container, {
            loop: false,
            breakpoints: {
                0: {
                    enabled: false,
                },
                1280: {
                    enabled: true,
                    spaceBetween: 16,
                    slidesPerView: 'auto',
                }
            },
            on: {
                afterInit: function (swiper) {
                    self.updateSliderClasses(swiper.progress);
                },
                progress: function (swiper, progress) {
                    self.updateSliderClasses(progress);
                },
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        self.removeInlineStyles(el);
                    }
                },
                resize: (el: Swiper) => {
                    if (!el.params.enabled) {
                        self.removeInlineStyles(el);
                    }
                }
            },
        });
    }

    initPreviewSlider = () => {
        const self = this;

        this.instance = new Swiper(this.container, {
            loop: true,
            slidesPerView: 1,
            modules: [Pagination, Autoplay],
            autoplay: {
                delay: 5000,
            },
            pagination: {
                bulletClass: 'pagination__bullet',
                bulletActiveClass: 'pagination__bullet--active',
                el: this.el.querySelector('[data-slider="pagination"]') as HTMLElement,
            }
        });
    }

    initServicesSlider = () => {
        const self = this;

        this.instance = new Swiper(this.container, {
            loop: false,
            breakpoints: {
                0: {
                    enabled: false,
                },
                1280: {
                    enabled: true,
                    spaceBetween: 16,
                    slidesPerView: 3,
                }
            },
            on: {
                afterInit: function (swiper) {
                    self.updateSliderClasses(swiper.progress);
                },
                progress: function (swiper, progress) {
                    self.updateSliderClasses(progress);
                },
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        self.removeInlineStyles(el);
                    }
                },
                resize: (el: Swiper) => {
                    if (!el.params.enabled) {
                        self.removeInlineStyles(el);
                    }
                }
            },
        });
    }

    updateSliderClasses = (progress: number) => {
        this.container.classList.add('isEnd');
        this.container.classList.add('isStart');

        if (progress <= 0) {
            if (this.container.classList.contains('isStart')) {
                this.container.classList.remove('isStart');
            }

            if (this.buttonPrev && !this.buttonPrev.getAttribute('disabled')) {
                this.buttonPrev.setAttribute('disabled', 'disabled');
            }

        } else if (progress >= 1) {
            if (this.container.classList.contains('isEnd')) {
                this.container.classList.remove('isEnd');
            }

            if (this.buttonNext && !this.buttonNext.getAttribute('disabled')) {
                this.buttonNext.setAttribute('disabled', 'disabled');
            }
        } else {
            if (this.buttonPrev) this.buttonPrev.removeAttribute('disabled');
            if (this.buttonNext) this.buttonNext.removeAttribute('disabled');
        }
    }

    removeInlineStyles = (el: Swiper) => {
        el.wrapperEl.removeAttribute('style');

        el.slides.forEach((item: Element) => {
            item.removeAttribute('style');
        })
    };
}

export {
    Slider,
}
