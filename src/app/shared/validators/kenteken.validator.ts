import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { KentekenCheck } from "rdw-kenteken-check";
import { Observable, of } from "rxjs";

export function kentekenValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const kt = new KentekenCheck(control.value);
    kt.formatLicense();
    return kt.valid ? of(null) : of({ invalidKenteken: true });
  };
}