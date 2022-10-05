import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';
import { AppState } from 'src/app/app.store';
import { startLoadingAction, stopLoadingAction } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private store$: Subscription | undefined;
  public isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
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

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(startLoadingAction());

    // Swal.fire({
    //   title: 'Espere un momento!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

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
      })
      .finally(() => {
        this.store.dispatch(stopLoadingAction());
      });
  }

}
