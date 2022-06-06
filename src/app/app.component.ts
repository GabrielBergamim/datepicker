import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datepicker';

  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      date: [null, this._customValidator]
    });
  }

  teste() {
    console.log(this.formGroup.get('date'));
  }

  private _customValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    console.log('customValidator -> form')
    return { teste: 'teste' };
  }

}
