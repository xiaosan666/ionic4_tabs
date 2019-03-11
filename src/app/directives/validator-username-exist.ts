import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, flatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[validator-username-exist]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => ValidatorUsernameExistDirective),
        multi: true
    }]
})
export class ValidatorUsernameExistDirective implements AsyncValidator {
    constructor(public auth: AuthService) {
    }

    validate(c: AbstractControl): Observable<any> {
        return c.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            flatMap(() => this.auth.getUserByName((c.value))),
            first()
        );
    }
}
