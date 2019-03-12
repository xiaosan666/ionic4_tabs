/**
 * Created by yanxiaojun617@163.com on 3-12.
 */
import { Injectable } from '@angular/core';
import { AbstractControl, Validators as angularValidators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Validators extends angularValidators {

    /*E-mail*/
    static email(control: AbstractControl) {
        const pattern = '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?';
        return Validators.validatorsByPattern('email', control, pattern);
    }

    /*手机号码*/
    static phone(control: AbstractControl) {
        return Validators.validatorsByPattern('phone', control, '1(3|4|5|7|8)[0-9]{9}');
    }

    /*中文*/
    static chinese(control: AbstractControl) {
        return Validators.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
    }

    /*用户名（英文+数字，4到12位）*/
    static legallyNamed(control: AbstractControl) {
        return Validators.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9]{4,20}');
    }

    private static validatorsByPattern(name: string, control: AbstractControl, pattern: string) {
        const validatorFn = Validators.pattern(pattern)(control);
        if (validatorFn != null) {
            validatorFn[name] = validatorFn['pattern'];
        }
        return validatorFn;
    }
}
