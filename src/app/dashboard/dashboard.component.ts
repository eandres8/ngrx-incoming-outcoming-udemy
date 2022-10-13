import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';

import { IncomingOutcomingService } from '../services/incoming-outcoming.service';
import { AuthFacadeService } from '../shared/services/facades/auth-facade.service';
import { InvoicingFacadeService } from '../shared/services/facades/invoicing-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subs: Subscription | undefined;

  constructor(
    private readonly incomingOutcomingService: IncomingOutcomingService,
    private readonly authFacade: AuthFacadeService,
    private readonly invoicingFacade: InvoicingFacadeService,
  ) {}

  ngOnInit(): void {
    this.subs = this.authFacade.userId$
      .pipe(
        switchMap((userId) =>
          this.incomingOutcomingService.initInvoicingListener(userId)
        )
      ).subscribe(items => {
        this.invoicingFacade.setInvoicing(items);
      });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
