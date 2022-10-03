import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.createUser(this.registerForm.value)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
