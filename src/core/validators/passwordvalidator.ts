import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password').value;
  const confirmPassword = control.get('password_rep').value;
  return password && confirmPassword && password === confirmPassword
    ? null
    : {passwordsNotEqual: true};
};
