import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// utils
import { strMapToObj } from '../utils/utils';

// Services
import { LocalStorage } from './storage.service';

// Interfaces
import { HypertyResourceType } from '../models/rethink/HypertyResource';
import { ContextualCommTrigger } from '../models/models';

@Injectable()
export class ContextualCommTriggerService {

  public activeContextTrigger: ContextualCommTrigger;

  private cxtTrigger: Map<string, ContextualCommTrigger> = new Map<string, ContextualCommTrigger>();

  private _contextualCommTriggerList: Observable<ContextualCommTrigger[]>;
  private _contextualCommTriggerUpdate: Subject<any> = new Subject<any>();
  private _contextualCommTrigger: Subject<ContextualCommTrigger> = new Subject<ContextualCommTrigger>();

  // Temporary data for initial contexts;
  private work: ContextualCommTrigger = {
    contextName: 'Work',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'briefcase'
  };

  private fitness: ContextualCommTrigger = {
    contextName: 'Fitness',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'heartbeat'
  };

  private school: ContextualCommTrigger = {
    contextName: 'School',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'heart'
  };

  constructor(
    private localStorage: LocalStorage,
  ) {

    this._contextualCommTriggerList = this._contextualCommTriggerUpdate
      .scan((triggers: ContextualCommTrigger[], trigger: ContextualCommTrigger) => {
       console.log('[ContextualCommTriggerService - scan] - ', triggers, trigger);

       if (triggers.indexOf(trigger) === -1) {
         return triggers.concat(trigger);
       } else {
         return triggers;
       }

      }, [])
      .publishReplay(1)
      .refCount();

    this._contextualCommTrigger.subscribe(this._contextualCommTriggerUpdate);

    this._contextualCommTriggerList.subscribe((a: any) => {
      console.log('[ContextualCommTriggerService - list] - ', a);
    });


    if (this.localStorage.hasObject('context-triggers')) {
      let mapObj = this.localStorage.getObject('context-triggers');
      for (let k of Object.keys(mapObj)) {

        let currentTrigger: ContextualCommTrigger = new ContextualCommTrigger(mapObj[k]);
        console.log('[ContextualCommTriggerService - storage]', mapObj[k], currentTrigger);
        this.cxtTrigger.set(k, currentTrigger);
        this._contextualCommTrigger.next(currentTrigger);
      }
    } else {
      this._contextualCommTrigger.next(this.work);
      this._contextualCommTrigger.next(this.fitness);
      this._contextualCommTrigger.next(this.school);

      // this.cxtTrigger.set(this.work.contextName, this.work);
      // this.cxtTrigger.set(this.fitness.contextName, this.fitness);
      // this.cxtTrigger.set(this.school.contextName, this.school);
    }

  }

  createContextTrigger(name: string) {

    return new Promise<ContextualCommTrigger>((resolve, reject) => {
      console.log('[ContextualCommTriggerService - Get Localstorage] ', name);

      let contextualCommTriggerName = 'trigger-' + name;
      let contextTrigger: ContextualCommTrigger;

      if (!this.cxtTrigger.has(contextualCommTriggerName)) {
        console.info('[Create a new ContextualTrigger]', name);

        let context: ContextualCommTrigger = {
          contextName: name,
          contextScheme: 'context',
          contextResource: [HypertyResourceType.video, HypertyResourceType.audio, HypertyResourceType.chat],
          values: [],
          trigger: []
        };

        contextTrigger = new ContextualCommTrigger(context);

        /*let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }*/

      } else {
        console.info('[Get the exist ContextualTrigger]', name);
        contextTrigger = <ContextualCommTrigger> this.cxtTrigger.get(contextualCommTriggerName) as ContextualCommTrigger;
      }

      this.activeContextTrigger = contextTrigger;
      this.updateContextTrigger(contextualCommTriggerName, contextTrigger);

      this._contextualCommTrigger.next(contextTrigger);

      console.info('[ContextualCommTriggerService - create]', contextTrigger);

      resolve(contextTrigger);
    });

  }

  updateContextTrigger(name: string, contextTrigger: ContextualCommTrigger) {

    let contextTriggerName: string;
    if (name.includes('trigger')) {
      contextTriggerName = name;
    } else {
      contextTriggerName = 'trigger-' + name;
    }

    this.cxtTrigger.set(contextTriggerName, contextTrigger);
    this.localStorage.setObject('context-triggers', strMapToObj(this.cxtTrigger));

    console.info('[ContextualCommTriggerService - updateContextTrigger]', name, contextTrigger);
    this._contextualCommTrigger.next(contextTrigger);
  }

  getContextualCommTriggers(): Observable<any> {
    return this._contextualCommTriggerList;
  }

}
