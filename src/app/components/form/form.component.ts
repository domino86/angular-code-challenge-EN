import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleForm } from '../../shared/interfaces/vehicle-form.interface';
import { Subject, pairwise, startWith, takeUntil, tap, using } from 'rxjs';
import { kentekenValidator } from '../../shared/validators/kenteken.validator';
import { KentekenMaskPipe } from '../../shared/pipes/kenteken-mask.pipe';
import { Store } from '@ngrx/store';
import { FormState } from 'src/app/shared/interfaces/form-state.interface';
import { initialState } from 'src/app/store/form/form.reducer';
import { formValueChange } from 'src/app/store/form/form.actions';
import { vehicleSubTypes, vehicleTypes } from 'src/app/shared/constants/vehicle.const';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() selectedType = new EventEmitter<string>();
  vehicleForm = this.createForm();

  valueChanges$ = this.vehicleForm.valueChanges.pipe(
    startWith(initialState),
    pairwise(),
    tap(([prev, curr]) => {
      if (prev.vehicleType !== curr.vehicleType) {
        this.store.dispatch(formValueChange(curr as FormState))
      }
    })
  );

  formValues$ = using(
    () => this.valueChanges$.subscribe(),
    () => this.store.select(state => state.form)
  );

  destroy$: Subject<boolean> = new Subject<boolean>();

  readonly vehicleTypes = vehicleTypes;
  readonly vehicleSubTypes = vehicleSubTypes;

  constructor(private fb: FormBuilder, private ktFormatPipe: KentekenMaskPipe, private store: Store<{ form: FormState }>) { 
  }

  ngOnInit(): void {
    this.formValues$.pipe(takeUntil(this.destroy$)).subscribe(formValues => {
      this.vehicleForm.patchValue(formValues, { emitEvent: false });
    });
    this.vehicleForm.controls.vehicleType.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(vehicleType => {
      this.vehicleTypeChanged(vehicleType);
      if (vehicleType === 'Scooter') {
        this.vehicleForm.controls.vehicleSubType.disable();
      } else {
        this.vehicleForm.controls.vehicleSubType.enable();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  formatKenteken(event: { target: EventTarget | null }): void {
    const kentekenCtrl = this.vehicleForm.controls.kenteken;
    if ((event.target as HTMLInputElement).value) {
      kentekenCtrl.setValue(this.ktFormatPipe.transform((event.target as HTMLInputElement).value));
    }
  }

  private vehicleTypeChanged(type: string): void {
    this.selectedType.emit(type);
  }

  private createForm(): FormGroup<VehicleForm> {
    return this.fb.group<VehicleForm>({
      vehicleType: this.fb.nonNullable.control(initialState.vehicleType), // set default value
      vehicleSubType: this.fb.nonNullable.control(initialState.vehicleSubType), // set default value
      kenteken: this.fb.control(null, { 
        validators: [
          Validators.minLength(6), 
          Validators.maxLength(8), 
          Validators.pattern('[a-zA-Z]{2}[-][0-9]{2}[-][a-zA-Z]{2}')], 
          asyncValidators: kentekenValidator(), updateOn: 'blur'})
    })
  }

}
