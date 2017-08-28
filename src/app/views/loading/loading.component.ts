import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @HostBinding('class') hostClass = 'main-content d-flex flex-row align-items-center';

  @Input() status: string;

  constructor() { }

  ngOnInit() {
    console.log('Status:', status);
  }

}
