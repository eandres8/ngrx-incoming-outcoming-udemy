import { Routes } from '@angular/router';

import { InvoicingComponent } from '../invoicing/invoicing.component';
import { StatisticsComponent } from '../invoicing/statistics/statistics.component';
import { DetailsComponent } from '../invoicing/details/details.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'incoming-outcoming', component: InvoicingComponent },
    { path: 'details', component: DetailsComponent },
];
