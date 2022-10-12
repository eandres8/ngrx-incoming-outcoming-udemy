import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IncomingOutcomingType } from '../models/interfaces/incoming-outcomming.interface';
import { IncomingOutcomingService } from '../services/incoming-outcoming.service';
import { NotificationsFacadeService } from '../shared/services/facades/notifications-facade.service';
import { UiFacadeService } from '../shared/services/facades/ui-facade.service';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styles: []
})
export class InvoicingComponent implements OnInit {
  invoicingForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly incomingOutcomingService: IncomingOutcomingService,
    private readonly notify: NotificationsFacadeService,
    public readonly uiFacade: UiFacadeService,
  ) { 
    this.invoicingForm = this.fb.group({
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      type: ['INCOMING', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  resetForm() {
    this.invoicingForm.setValue({
      type: 'INCOMING',
      description: '',
      value: '',
    });
  }

  changeInvoicingType(type: IncomingOutcomingType) {
    this.invoicingForm.get('type')?.setValue(type);
  }

  isType(type: IncomingOutcomingType) {
    return this.invoicingForm.get('type')?.value === type;
  }

  saveInvoicing() {
    if( this.invoicingForm.invalid ) {
      return;
    }

    this.uiFacade.startLoading();

    this.incomingOutcomingService.createIncomingOutcoming(this.invoicingForm.value)
      .then(ref => {
        this.notify.success('Invoicing was created');
        this.resetForm();
      })
      .catch(err => {
        this.notify.error(err.message)
      })
      .finally(() => this.uiFacade.stopLoading());
  }

}
