import { Injectable, Output, EventEmitter } from '@angular/core';

import { MediaModalType } from '../interfaces/mediaModal.type';

@Injectable()
export class MediaModalService {

  @Output() openEvent: EventEmitter<any> = new EventEmitter();

  open(data: MediaModalType) {
    this.openEvent.emit(data);
  }

}
