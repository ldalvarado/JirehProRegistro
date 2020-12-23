import { FormControl } from '@angular/forms';

export const isValidDate = (c: FormControl) => {
    const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return DATE_REGEXP.test(c.value) || c.value === '' ? null : {
        validateEmail: {
            valid: false
        }
    };
}