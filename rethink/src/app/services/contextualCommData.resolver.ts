import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

// Model
import { ContextualComm } from './../models/models';


// Service
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommService } from './contextualComm.service';
import { ChatService } from './services';

@Injectable()
export class ContextualCommDataResolver implements Resolve<ContextualComm> {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private contextualCommService: ContextualCommService,
    private contextualCommDataService: ContextualCommDataService
    ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let context = route.params['context'];
      let task = route.params['task'];
      let name = '';

      if (context) {name = context; };
      if (task) { name = task; };

      this.contextualCommDataService.getContext(name).subscribe({
        next: contextualComm => {

          this.contextualCommService.activeContext = contextualComm.url;
          this.chatService.activeDataObjectURL = contextualComm.url;

          resolve(contextualComm);
        },
        error: reason => reject(reason)
      });

    });

  }

}
