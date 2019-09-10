import { LightningElement, track, createElement } from 'lwc';
import Navigo from 'navigo';

import MyHomehero from 'my/homehero';
import MyTestDrive from 'my/testDrive';
import MyTestDriveSuccess from 'my/testDriveSuccess';
import MyService from 'my/service';

export default class App extends LightningElement {
    @track hash = window.location.hash;

    isRendered = false;
    router = new Navigo('http://localhost:3001', true);

    constructor() {
        super();

        // console.log(this.router);
        this.router.on({
            home: async () => {
                this.setPage('my-homehero', MyHomehero);
            },
            testdrive: async () => {
                this.setPage('my-testdrive', MyTestDrive);
            },
            testdrivesuccess: async () => {
                this.setPage('my-testdrivesuccess', MyTestDriveSuccess);
            },
            service: async () => {
                this.setPage('my-service', MyService);
            }
        });

        const navigateToDefault = () => {
            this.setPage('my-homehero', MyHomehero);
        };

        this.router.on(navigateToDefault);
        this.router.notFound(navigateToDefault);
    }

    renderedCallback() {
        // Resolve the current view only after the container has rendered
        if (!this.isRendered) {
            this.isRendered = true;
            this.router.resolve();
        }
    }

    handleNavigateEvent(event: CustomEvent) {
        console.log(event);
        const { path } = event.detail;
        this.router.navigate(path);
    }

    setPage(tagName: string, component?: string, props = {}) {
        const el = createElement(tagName, {
            is: component,
            fallback: false
        });

        Object.assign(el, props);

        // Remove previous components from the container if necessary
        const container = this.template.querySelector('.content');

        /*eslint-disable-next-line*/
        this.template.addEventListener('navigate', (event: any) => {
            this.handleNavigateEvent(event);
        });

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(el);
    }
}
