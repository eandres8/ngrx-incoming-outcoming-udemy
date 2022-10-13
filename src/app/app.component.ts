import { Component, OnInit } from '@angular/core';

import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ingreso-egreso';

  constructor(private readonly initService: InitService) {

  }
  ngOnInit(): void {
    this.initService.initAuthListener();
  }
}
