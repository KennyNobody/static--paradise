class Tabs {
    el: Element;
    activeIndex: number;
    pictures: NodeListOf<Element>;
    articles: NodeListOf<Element>;
    constructor(el: Element) {
        this.el = el;
        this.pictures = el.querySelectorAll('[data-tabs="picture"]');
        this.articles = el.querySelectorAll('[data-tabs="item"]');

        this.setListeners();
    }

    setListeners = () => {
        this.articles.forEach((item, index) => {
            const button = item.querySelector('[data-tabs="button"]');

            button.addEventListener('click', () => {
                this.activeIndex = index;
                this.changeIndex();
            });

            button.addEventListener('mouseover', () => {
                this.activeIndex = index;
                this.changeIndex();
            });
        })
    }

    changeIndex = () => {
        this.pictures.forEach((item, index) => {
            if (index !== this.activeIndex) {
                item.setAttribute('hidden', 'hidden');
            } else {
                item.removeAttribute('hidden');
            }
        });

        this.articles.forEach((item, index) => {
            const content = item.querySelector('[data-tabs="item-content"]');

            if (index !== this.activeIndex) {
                content.classList.add('isHidden');
            } else {
                content.classList.remove('isHidden');
            }
        });
    }
}

export {
    Tabs,
}
