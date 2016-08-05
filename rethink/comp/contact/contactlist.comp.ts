import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ContactComponent } from './contact.comp';
import { User } from '../../models/models';

import { ContextService }     from '../../services/context.service';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent]
})
export class ContactListComponent implements OnInit, OnDestroy, AfterViewInit {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() model: Observable<Array<User>>

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contactsFilter: Observable<Array<User>>
  private contactObs: Subscription;

  constructor(
    private cd:ChangeDetectorRef){}
  
  ngOnInit() {
    // this.cd.detach();
  }

  ngAfterViewInit() {

    this.contactObs = this.model.subscribe((contacts) => {

      this.filter('');
      // will be called every time an item is added/removed      

      this.cd.detectChanges();
      this.cd.markForCheck();
      // this.cd.reattach();
    })

  }

  ngOnDestroy() {
    this.contactObs.unsubscribe();
  }

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    this.contactsFilter = this.model.map((users:User[], index:number) => {
      return users.filter((user:User) => {
        return user.cn.includes(value);
      });
    })

  }
}
