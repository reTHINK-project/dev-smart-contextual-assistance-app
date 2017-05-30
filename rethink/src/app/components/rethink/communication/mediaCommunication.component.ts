import { Component, Input, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { User } from '../../../models/models';

// Services
import { ContextualCommDataService } from '../../../services/contextualCommData.service';
import { ContactService, ConnectorService } from '../../../services/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'div[media-view]',
  templateUrl: './mediaCommunication.component.html',
  styleUrls: ['./mediaCommunication.component.css']
})
export class MediaCommunicationComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClass = 'all-100';

  @Input() user: User;
  @Input() mode: string;

  myStream: any;
  stream: any;
  duration: Date;

  private subscription: Subscription;

  private streamingActive = false;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private connectorService: ConnectorService,
    private contextualCommDataService: ContextualCommDataService
  ) {
    console.log('[Media Communication Component] - Constructor:', this.route.queryParams);

    this.streamingActive = false;

    // if (this.mode === 'video') {

    this.connectorService.getLocalStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get local stream: ', stream);
      this.myStream = stream;
    });

    // }

    this.connectorService.getRemoteStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get remote stream: ', stream);
      this.stream = stream;
      this.duration = new Date();
    });

    this.connectorService.connectorStatus().subscribe((status: string) => {
      console.log('[Media Communication Component] -  connector status: ', status);

      if (status === 'end') {
        this.reset();
      }

    });

    console.log('[Media Communication Component] - Params Action:', this.mode);
  }

  ngOnInit() {

    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        console.log('[Media Communication Component] - Params Action:', queryParam['action']);
        this.mode = queryParam['action'];
        this.connectorService.mode = queryParam['action'];
        return queryParam['action'];
      }
    );

     console.log('[Media Communication Component] - ngOnInit:', this.mode);

    if (this.mode) {

      console.log('[Media Communication Component] - connection mode: ', this.connectorService.connectorMode, this.streamingActive);

      if (this.connectorService.connectorMode !== 'answer' && !this.streamingActive) {
        this.callTo(this.user);
      } else if (this.streamingActive && this.mode === 'video') {
        this.connectorService.enableVideo();
      }

    }

  }

  ngOnDestroy() {
    console.log('[Media Communication] - ngOnDestroy');
    this.onHangup();
    this.reset();
  }

  reset() {
    this.subscription.unsubscribe();
    this.streamingActive = false;
    this.stream = null;
  }

  callTo(user: User) {

    let options = {video: true, audio: true};

    let contextID = this.contextualCommDataService.getActiveContext().id;

    console.log('[Media Communication Component] - ' + this.mode + ' call To', user, contextID);

    this.connectorService.connect(user.username, options, contextID, 'localhost')
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

  onFullscreen() {

  }

  onHangup() {
    this.reset();
    this.connectorService.hangup();
  }

  onMute() {
    this.connectorService.mute();
  }

  onVolume() {
    this.connectorService.disableAudio();
  }
}
