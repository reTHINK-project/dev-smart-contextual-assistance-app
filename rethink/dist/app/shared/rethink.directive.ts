import { Directive, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';

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
export class ContextNameValidatorDirective implements Validator, OnChanges {

  @Input() name: string;

  private valFn = Validators.composeAsync(null);

  constructor(
    private contextualCommDataService: ContextualCommDataService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['name'];
    if (change) {
      this.valFn = RethinkValidators.contextName(this.contextualCommDataService);
    } else {
      this.valFn = Validators.composeAsync(null);
    }

  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
      return this.valFn(control);
  }
}
