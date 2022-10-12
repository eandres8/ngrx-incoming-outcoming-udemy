import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { NotificationsFacadeService } from 'src/app/shared/services/facades/notifications-facade.service';
import { UiFacadeService } from 'src/app/shared/services/facades/ui-facade.service';

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
    private readonly notify: NotificationsFacadeService,
    public readonly uiFacade: UiFacadeService,
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

    this.uiFacade.startLoading();

    this.authService.signIn(this.loginForm.value)
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.notify.error(error.message);
      })
      .finally(() => {
        this.uiFacade.stopLoading();
      });
  }

}
