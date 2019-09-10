import { LightningElement, api, track } from 'lwc';

export default class Button extends LightningElement {
    @track styleClass = 'slds-button';

    @api url: string = '';
    @api target = '_blank';

    @api disabled: boolean = false;

    @api label: string = '';
    _variant = 'base';

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = value;
        switch (value) {
            case 'base':
                this.styleClass = 'slds-button';
                break;
            case 'neutral':
                this.styleClass = 'slds-button slds-button_neutral';
                break;
            case 'brand':
                this.styleClass = 'slds-button slds-button_brand';
                break;
            case 'destructive':
                this.styleClass = 'slds-button slds-button_destructive';
                break;
            case 'success':
                this.styleClass = 'slds-button slds-button_success';
                break;
            case 'inverse':
                this.styleClass = 'slds-button slds-button_inverse';
                break;
            case 'outline-brand':
                this.styleClass = 'slds-button slds-button_outline-brand';
                break;
            case 'text-destructive':
                this.styleClass = 'slds-button slds-button_text-destructive';
                break;
            default:
                this.styleClass = 'slds-button slds-button_neutral';
        }
    }

    click() {
        if (this.url) {
            this.dispatchEvent(
                new CustomEvent('navigate', {
                    // bubbles: true,
                    // composed: true,
                    detail: {
                        path: this.url
                    }
                })
            );
        } else {
            this.dispatchEvent(
                new CustomEvent('click', {
                    detail: {
                        label: this.label
                    }
                })
            );
        }
    }
}
