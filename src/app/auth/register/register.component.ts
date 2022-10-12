import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { NotificationsFacadeService } from 'src/app/shared/services/facades/notifications-facade.service';
import { UiFacadeService } from 'src/app/shared/services/facades/ui-facade.service';

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
    private readonly notify: NotificationsFacadeService,
    public readonly uiFacade: UiFacadeService,
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

    this.uiFacade.startLoading();

    this.authService.createUser(this.registerForm.value)
      .then(data => {
        console.log(data);
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
