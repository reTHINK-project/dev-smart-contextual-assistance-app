import { Directive, SimpleChanges, OnChanges, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { RethinkValidators } from './rethink.validator';
import { ContextualCommDataService } from '../services/contextualCommData.service';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NameValidator
 * @implements {Validator}
 */
@Directive({
    selector: '[exist]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: RethinkValidators, multi: true }]
})
export class ContextNameValidatorDirective implements AsyncValidator, OnChanges {

  @Input() name: string;

  private valFn = RethinkValidators.contextName(this.contextualCommDataService);

  constructor(
    private contextualCommDataService: ContextualCommDataService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['name'];

    console.log(changes);

    if (change) {
      console.log('CHANGE:', change, name);

      this.valFn = RethinkValidators.contextName(this.contextualCommDataService);
    }

  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
      console.log('AQUI:', control);
      return this.valFn(control);
  }
}
