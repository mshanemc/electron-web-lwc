import { LightningElement } from 'lwc';

export default class Homehero extends LightningElement {
    passOut() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                composed: true,
                bubbles: true,
                detail: {
                    path: '/#testdrive'
                }
            })
        );
    }
}
