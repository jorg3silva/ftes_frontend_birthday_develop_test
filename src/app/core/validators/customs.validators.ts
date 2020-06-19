import { FormControl } from '@angular/forms';


/**
 *
 *      Class to handle specifics validators for forms.
 *
 * @author Jorge Silva Aguilera
 */
export class CustomsValidators {

    /**
     *
     *      Not blank input validator for forms
     *
     * @param {FormControl} control
     * @return {{notBlank: {valid: boolean}}}
     * @author Jorge Silva Aguilera
     */
    static notBlank(control: FormControl) {
        if ( control !== undefined && control.value !== undefined ) {
            return null;
        }
        const empty = (control.value || '').trim().length === 0;
        return !empty ? null : {
            notBlank: {
                valid: false
            }
        };
    }
}


