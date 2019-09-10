import { LightningElement } from 'lwc';

export default class TestDrive extends LightningElement {
    async formSubmit(event) {
        const postBody = {};
        // console.log(event.detail);
        // event.preventDefault();
        if (event.detail.label === 'Submit') {
            this.template.querySelectorAll('input').forEach(input => {
                postBody[input.name] = input.value;
            });
            this.template.querySelectorAll('select').forEach(input => {
                postBody[input.name] = input.value;
            });
            console.log(postBody);
        }

        await fetch('/testdrive', {
            method: 'post',
            body: JSON.stringify(postBody)
        });
    }
}
