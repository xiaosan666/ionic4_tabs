import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validator-password-identical]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatorPasswordIdenticalDirective,
    multi: true
  }]
})
export class ValidatorPasswordIdenticalDirective implements Validator {

  validate(control: FormGroup): { [key: string]: any } | null {
    const password = control.get('password');
    const newPassword = control.get('newPassword');
    return password && newPassword && password.value === newPassword.value ? null : {'passwordInvalid': true};
  }

}
