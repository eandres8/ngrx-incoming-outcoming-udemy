import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AuthFacadeService } from '../services/facades/auth-facade.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  user$ = this.authFacade.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly authFacade: AuthFacadeService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
