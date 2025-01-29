class ArticleReview {
    el: Element;
    inner: Element;
    toolbar: Element;
    button: HTMLButtonElement;
    constructor(el: Element) {
        this.el = el;
        this.inner = el.querySelector('[data-article-review="inner"]');
        this.toolbar = el.querySelector('[data-article-review="toolbar"]');
        this.button = el.querySelector('[data-article-review="button"]');
        this.setListeners();
    }

    setListeners = () => {
        if (this.inner.scrollHeight <= this.inner.clientHeight) {
            this.setMode();
        }

        this.button.addEventListener('click', () => {
            this.setMode();
        });
    }

    setMode = () => {
        this.el.classList.add('_active');
        this.toolbar.setAttribute('hidden', 'hidden');
    }
}

export {
    ArticleReview,
}
