class Tabs {
    el: Element;
    activeIndex: number;
    pictures: NodeListOf<Element>;
    articles: NodeListOf<Element>;
    isAnimating: boolean;
    constructor(el: Element) {
        this.el = el;
        this.pictures = el.querySelectorAll('[data-tabs="picture"]');
        this.articles = el.querySelectorAll('[data-tabs="item"]');
        this.isAnimating = false;

        this.setListeners();
    }

    setListeners = () => {
        this.articles.forEach((item, index) => {
            const button = item.querySelector('[data-tabs="button"]');

            button.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.activeIndex = index;
                    this.changeIndex();
                }
            });

            button.addEventListener('mouseover', () => {
                if (!this.isAnimating) {
                    this.activeIndex = index;
                    this.changeIndex();
                }
            });
        });
    };

    changeIndex = () => {
        if (this.isAnimating) return;

        this.isAnimating = true;

        const currentActivePicture = Array.from(this.pictures).find(
            (item) => !item.hasAttribute('hidden')
        );

        if (currentActivePicture) {
            this.hidePicture(currentActivePicture as HTMLElement).then(() => {
                const newActivePicture = this.pictures[this.activeIndex];
                this.showPicture(newActivePicture as HTMLElement).then(() => {
                    this.isAnimating = false;
                });
            });
        } else {
            const newActivePicture = this.pictures[this.activeIndex];
            this.showPicture(newActivePicture as HTMLElement).then(() => {
                this.isAnimating = false;
            });
        }

        this.articles.forEach((item, index) => {
            const content = item.querySelector('[data-tabs="item-content"]');

            if (index !== this.activeIndex) {
                content.classList.add('isHidden');
            } else {
                content.classList.remove('isHidden');
            }
        });
    };

    showPicture = (el: HTMLElement) => {
        return new Promise<void>((resolve) => {
            el.removeAttribute('hidden');
            setTimeout(() => {
                el.classList.remove('fade-out');
                el.classList.add('fade-in');
                resolve();
            }, 10);
        });
    };

    hidePicture = (el: HTMLElement) => {
        return new Promise<void>((resolve) => {
            el.classList.remove('fade-in');
            el.classList.add('fade-out');

            setTimeout(() => {
                el.setAttribute('hidden', 'hidden');
                resolve();
            }, 500);
        });
    };
}

export { Tabs };
