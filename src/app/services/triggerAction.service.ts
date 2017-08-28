import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import { TriggerActions } from '../models/app.models';

@Injectable()
export class TriggerActionService {

  private triggerAction: Subject<TriggerActions> = new Subject();

  constructor() {

  }

  /**
   *
   *
   * @param {TriggerActions} action
   *
   * @memberof TriggerActionService
   */
  trigger(action: TriggerActions) {
    this.triggerAction.next(action);
  }

  /**
   *
   *
   * @returns {Observable<TriggerActions>}
   *
   * @memberof TriggerActionService
   */
  action(): Observable<TriggerActions> {
    return this.triggerAction;
  }

}
