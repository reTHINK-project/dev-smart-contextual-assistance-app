/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import { Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';

@Pipe({ name: 'amTimeElapsed', pure: false })
export class TimeElapsedPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastValue: Date | moment.Moment;
  private lastText: string;
  private format: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment, formatStyle: string): string {
    this.format = formatStyle || 'h:mm:ss';
    this.lastValue = value;
    this.createTimer();

    return this.lastText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }

    let begin = moment(this.lastValue);
    const timeToUpdate = 1000;

    this.currentTimer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {

          let now = moment();
          let diff = now.diff(begin);
          this.lastText = moment.duration(diff).format(this.format, { trim: false });

          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, timeToUpdate);
      }
    });
  }


  private removeTimer() {
    if (this.currentTimer) {
      window.clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

}
