import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  public onSubmit(): void {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
  }

}
