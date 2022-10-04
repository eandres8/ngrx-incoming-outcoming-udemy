import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['elb.andres8@gmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere un momento!',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.signIn(this.loginForm.value)
      .then(data => {
        console.log({ data });
        this.router.navigate(['/']);
        Swal.close();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

}
