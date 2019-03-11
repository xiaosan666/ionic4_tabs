import { NgModule } from '@angular/core';
import { ValidatorRegularDirective } from './validator-regular.directive';
import { ValidatorUsernameExistDirective } from './validator-username-exist';
import { ValidatorPasswordIdenticalDirective } from './validator-password-identical';
import { ContentEditableDirective } from './content-editable.directive';

@NgModule({
    declarations: [
        ValidatorRegularDirective,
        ValidatorUsernameExistDirective,
        ValidatorPasswordIdenticalDirective,
        ContentEditableDirective
    ],
    imports: [],
    exports: [
        ValidatorRegularDirective,
        ValidatorUsernameExistDirective,
        ValidatorPasswordIdenticalDirective,
        ContentEditableDirective
    ]
})
export class DirectivesModule {
}
