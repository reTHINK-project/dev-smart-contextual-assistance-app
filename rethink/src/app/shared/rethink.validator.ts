import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { ContextualCommDataService } from '../services/contextualCommData.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export class RethinkValidators {

  static contextName(
    contextualCommDataService: ContextualCommDataService
  ): AsyncValidatorFn {

    return (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {

      let name = control.value;
      return new Promise((resolve) => {

        contextualCommDataService.getContext(name).toPromise().then((result) => {
          console.log('COntext:', result);

          if (result) {
            resolve({ 'exist': name});
          } else {
            resolve(null);
          }
        }).catch((reason) => {
          console.log('Not found', reason);
          resolve(null);
        });
      });

    };

  }

}
