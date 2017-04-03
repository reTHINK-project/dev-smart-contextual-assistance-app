import { Component, Input, Output, OnInit, HostBinding, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Utils
import { getUserMedia } from '../../../utils/utils';

// Models
import { User, Message } from '../../../models/models';

// Services
import { ContactService, ConnectorService } from '../../../services/services';

@Component({
  moduleId: module.id,
  selector: 'div[media-view]',
  templateUrl: './mediaCommunication.component.html',
  styleUrls: ['./mediaCommunication.component.css']
})
export class MediaCommunicationComponent implements OnInit {
  @HostBinding('class') hostClass ='all-100'

  @Input() user:User;
  @Input() mode:string;

  private myStream:any;
  private stream:any;

  private streamingActive = false;

  constructor(
    private route:ActivatedRoute,
    private contactService: ContactService,
    private connectorService: ConnectorService,
  ) {

  }

  ngOnInit() {
    
    this.route
      .queryParams
      .subscribe(params => {
        console.log('[Media Communication Component] - Params Action:', params['action']);
        this.connectorService.mode = params['action'];
        this.mode = params['action'];

        console.log('[Media Communication Component] - connection mode: ', this.connectorService.connectorMode, this.streamingActive);

        if (this.connectorService.connectorMode !== 'answer' && !this.streamingActive) {
          this.callTo(this.user);
        } else if (this.streamingActive && this.mode === 'video') {
          this.connectorService.enableVideo();
        }

      });

    if (this.mode === 'video') {

      this.connectorService.getLocalStream().subscribe((stream) => {
        console.log('[Media Communication Component] - get local stream: ', stream);
        this.myStream = stream;
      })

    }

    this.connectorService.getRemoteStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get remote stream: ', stream);
      this.stream = stream;
      this.streamingActive = true;
    })

    console.log('[Media Communication Component] - Params Action:', this.mode);
  }

  ngOnDestroy() {
    this.streamingActive = false;
  }

  callTo(user:User) {

    let options = {video: true, audio: true};

    console.log('[Media Communication Component] - ' + this.mode + ' Call To', user);

    this.connectorService.connect(user.username, options, user.userURL, 'localhost')
      .then((controller) => {
        controller.dataObjectReporter.data.mode = this.mode;
        this.streamingActive = true;
        console.log('[Media Communication Component] - called');
      }).catch(function(reason) {
        console.error(reason);
      });

  }


  enableVideo() {
    this.connectorService.disableVideo();
  }

  disableVideo() {
    this.connectorService.disableVideo();
  }

  onHangup() {
    this.streamingActive = false;
    this.connectorService.hangup();
  }

  onMute() {
    this.connectorService.mute();
  }

  onVolume() {
    this.connectorService.disableAudio();
  }
}
