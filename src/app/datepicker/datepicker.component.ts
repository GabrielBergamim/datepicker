import { Component, DoCheck, forwardRef, Injector, Input, OnInit, Type } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator, ValidatorFn, Validators
} from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { SatDatepickerInputEvent } from 'saturn-datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DatepickerComponent),
    },
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor, Validator, DoCheck {

  @Input()
  label: string;

  @Input()
  rangeMode: boolean = true;

  @Input()
  placeholder = 'Select a date';

  @Input()
  minDate: Moment = moment();

  @Input()
  maxDate: Moment;

  control = new FormControl();

  private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    console.log('minValidator -> component')
    return { min: 'teste' };
  }

  private _ngControl: NgControl;
  private _validator: ValidatorFn | null = Validators.compose([this._minValidator]);

  private _fnOnChange: (value: any) => void;
  private _fnOnTouch: () => void;
  private _validatorOnChange = () => { };

  maskConfig = {
    mask: [
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      ' ',
      '-',
      ' ',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
    ],
    showMask: false,
    guide: false,
    placeholderChar: '_',
  };

  constructor(private injector: Injector) { }

  ngDoCheck(): void {
    if (this._ngControl && this._ngControl.errors) {
      this.control.setErrors(this._ngControl.errors);
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this._validator ? this._validator(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  ngOnInit() {
    this._ngControl = this.injector.get(NgControl as Type<NgControl>, null);
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this._fnOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._fnOnTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  blur(event: FocusEvent): void {
    this._fnOnTouch();
  }

  change({ value }: SatDatepickerInputEvent<Moment>): void {
    this._fnOnChange(value);
  }

  dateInput({ value }: SatDatepickerInputEvent<Moment>) {
    this._fnOnChange(value);
  }



}
