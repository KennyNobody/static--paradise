class Dropdown {
    el: Element;
    button: Element;

    constructor(el: Element) {
        this.el = el;
        this.button = el.querySelector('[data-dropdown="button"]');
        this.setListeners();
    }

    setListeners = () => {
        this.button.addEventListener('click', () => {
            this.toggle();
        });
    }

    toggle = () => {
        if (this.el.classList.contains('_active')) {
            this.el.classList.remove('_active');
            this.button.innerHTML = 'Показать еще отзывы';
        } else {
            this.el.classList.add('_active');
            this.button.innerHTML = 'Свернуть';
        }
    }
}

export {
    Dropdown,
}
