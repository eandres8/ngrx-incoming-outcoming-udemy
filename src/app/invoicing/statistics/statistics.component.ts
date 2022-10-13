import { Component, OnInit } from '@angular/core';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';
import { InvoicingFacadeService } from 'src/app/shared/services/facades/invoicing-facade.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  incoming: number = 0;
  outcoming: number = 0;

  incomingTotal: number = 0;
  outcomingTotal: number = 0;

  constructor(
    private readonly invoicingFacade: InvoicingFacadeService,
  ) { }

  ngOnInit(): void {
    this.invoicingFacade.items$.subscribe(items => this.makeCalcsStatistics(items));
  }

  makeCalcsStatistics(items: IIncomingOutcoming[]) {
    let incoming = 0;
    let outcoming = 0;
    let incomingTotal = 0;
    let outcomingTotal = 0;

    for (const item of items) {
      if (item.type === 'INCOMING') {
        incoming++;
        incomingTotal += Number(item.value);
      } else {
        outcoming++;
        outcomingTotal += Number(item.value);
      }
    }

    this.incoming = incoming;
    this.outcoming = outcoming;
    this.incomingTotal = incomingTotal;
    this.outcomingTotal = outcomingTotal;
  }

  get difference() {
    return this.incomingTotal - this.outcomingTotal;
  }

}
