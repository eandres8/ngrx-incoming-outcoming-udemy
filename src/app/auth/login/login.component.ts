import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';
import { AppState } from 'src/app/app.store';
import { startLoadingAction, stopLoadingAction } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private store$: Subscription | undefined;
  public isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['elb.andres8@gmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    })
  }

  ngOnInit(): void {
    this.store$ = this.store.select('ui').subscribe(ui => {
      console.log('cargando subs');
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.store$?.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(startLoadingAction());

    // Swal.fire({
    //   title: 'Espere un momento!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    this.authService.signIn(this.loginForm.value)
      .then(data => {
        this.router.navigate(['/']);
        Swal.close();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      })
      .finally(() => {
        this.store.dispatch(stopLoadingAction());
      });
  }

}
