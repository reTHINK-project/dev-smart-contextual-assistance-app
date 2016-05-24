import { Component, Input, Output, OnInit, AfterViewChecked, HostBinding, EventEmitter } from '@angular/core';

import { Context } from '../context/context';
import { Activity } from '../activity/activity';

@Component({
  selector: 'div[content-box]',
  templateUrl: 'comp/user/content-box.comp.html'
})
export class ContentBox implements OnInit, AfterViewChecked {
  @HostBinding('class') hostClass = 'content-box user'

  @Input() model:Context

  private activities:Activity[] = []

  ngOnInit() {
    this.activities = this.model.activities;

    console.log('HERE:', this.model)
  }

  ngAfterViewChecked() {

  }
}
