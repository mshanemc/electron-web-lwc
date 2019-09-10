import { LightningElement } from 'lwc';

export default class TestDrive extends LightningElement {
    async formSubmit(event) {
        if (event.detail.label !== 'Submit') {
            return;
        }

        const postBody = {};
        // console.log(event.detail);
        // event.preventDefault();
        this.template.querySelectorAll('input,select').forEach(input => {
            postBody[input.name] = input.value;
        });
        console.log(postBody);

        await fetch('/testdrive', {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.dispatchEvent(
            new CustomEvent('navigate', {
                composed: true,
                bubbles: true,
                detail: {
                    path: '/#testdrivesuccess'
                }
            })
        );
    }
}
