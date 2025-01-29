import {initOldCode} from "../scripts";
import {ArticleReview} from "./articleReview";
import {Slider} from "./slider";
import {Dropdown} from "./dropdown";
import {Tabs} from "./tabs";
import {Questionnaire} from "./questionnaire";

class App {
    constructor() {
        this.init();
        this.initReviews();
        this.initSliders();
        this.initDropdowns();
        this.initTabs();
        this.initQuestionnaire();
    }

    init = () => {
        initOldCode();
        console.log('App Inited');
    }

    initReviews = () => {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-article-review="block"]');

        elements.forEach((item) => new ArticleReview(item));
    }

    initSliders = () => {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-slider]');

        elements.forEach((item) => new Slider(item));
    }

    initDropdowns = () => {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-dropdown="block"]');

        elements.forEach((item) => new Dropdown(item));
    }

    initTabs = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-tabs="block"]');

        elements.forEach((item) => new Tabs(item));
    }

    initQuestionnaire = () => {
        const elements: NodeListOf<HTMLFormElement> = document.querySelectorAll('[data-form-questionnaire="block"]');

        elements.forEach((item) => new Questionnaire(item));
    }
}

export {App};

