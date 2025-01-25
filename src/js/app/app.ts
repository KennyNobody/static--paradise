import {initOldCode} from "../scripts";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        initOldCode();
        console.log('App Inited');
    }
}

export {App};

