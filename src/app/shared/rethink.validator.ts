import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { ContextualCommDataService } from '../services/contextualCommData.service';
import { ContextualComm } from '../models/models';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

export class RethinkValidators {

  static contextName(
    contextualCommDataService: ContextualCommDataService
  ): AsyncValidatorFn {

    return (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {

      const name: string = control.value.toLowerCase();
      return new Promise((resolve) => {

        contextualCommDataService.getContext(name).subscribe((context: ContextualComm) => {

          if (context) {
            resolve({ 'exist': name});
          } else {
            resolve(null);
          }

        }, (error: any) => {
          resolve(null);
        });
      });

    };

  }

}
