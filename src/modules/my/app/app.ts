import { LightningElement, track, createElement } from 'lwc';
import Navigo from 'navigo';

import MyHomehero from 'my/homehero';

export default class App extends LightningElement {
    @track hash = window.location.hash;

    router = new Navigo('http://localhost:3001', true);

    constructor() {
        super();

        // console.log(this.router);
        this.router.on({
            home: async () => {
                console.log('home page');
                this.setPage('my-homehero', MyHomehero);
            },
            testdrive: async () => {
                console.log('home page');
            }
        });
    }

    setPage(tagName: string, component?: string, props = {}) {
        const el = createElement(tagName, {
            is: component,
            fallback: false
        });

        Object.assign(el, props);

        // Remove previous components from the container if necessary
        const container = this.template.querySelector('.content');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(el);
    }
}
