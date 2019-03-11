import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Validators } from '../providers/Validators';

@Directive({
    selector: '[validator-regular]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ValidatorRegularDirective,
        multi: true
    }]
})
export class ValidatorRegularDirective implements Validator {
    // tslint:disable-next-line:no-input-rename
    @Input('validator-regular') regularName: string;

    validate(control: AbstractControl): ValidationErrors | null {
        if (!this.regularName) {
            return null;
        }
        const validatorFn = Validators[this.regularName];
        if (!validatorFn) {
            alert('未找到名称为' + this.regularName + '的验证规则，请添加');
            return null;
        }
        return validatorFn(control);
    }

}
