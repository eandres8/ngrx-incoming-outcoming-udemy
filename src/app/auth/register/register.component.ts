import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    private readonly router: Router,
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

    Swal.fire({
      title: 'Espere un momento!',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.createUser(this.registerForm.value)
      .then(data => {
        console.log(data);
        Swal.close();
        this.router.navigate(['/']);
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
