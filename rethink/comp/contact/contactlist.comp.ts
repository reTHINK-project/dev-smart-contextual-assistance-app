import { Component, AfterViewInit, Input, Output, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ContactComponent } from './contact.comp';
import { User } from '../../models/models';

import { ContextService }     from '../../services/context.service';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements AfterViewInit {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() model: Observable<Array<User>>

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contactsFilter: Observable<Array<User>>

  constructor(
    private cd:ChangeDetectorRef){}

  ngAfterViewInit() {

    this.model.subscribe((contacts) => {

      // console.log('Contacts:', contacts);
      // will be called every time an item is added/removed
      this.filter('');

      this.cd.detectChanges();
      this.cd.markForCheck();
    });

  }

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    this.contactsFilter = this.model.map((users:User[], index:number) => {
      console.log('Filter Users: ', users);
      return users.filter((user:User) => {
        return user.cn.includes(value);
      });
    })

  }
}
