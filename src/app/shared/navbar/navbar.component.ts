import { Component, OnInit } from '@angular/core';

import { AuthFacadeService } from '../services/facades/auth-facade.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  user$ = this.authFacade.user$;

  constructor(
    private readonly authFacade: AuthFacadeService,
  ) { }

  ngOnInit(): void {
  }

}
