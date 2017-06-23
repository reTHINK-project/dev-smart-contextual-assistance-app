import { Component, Input, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
  notificationsService: any;
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100';

  @Input() user: User;
  @Input() mode: string;

  myStream: any;
  stream: any;
  duration: Date;

  private subscription: Subscription;

  private streamingActive = false;
  private localStream: Subscription;
  private remoteStream: Subscription;
  private connStatus: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private connectorService: ConnectorService,
    private contextualCommDataService: ContextualCommDataService
  ) {
    console.log('[Media Communication Component] - Constructor:', this.route.queryParams);

    this.streamingActive = false;

    this.subscription = this.router.events.subscribe((event: NavigationEnd) => {

      if (event instanceof NavigationEnd) {
        let action = event['action'];
        console.log('[Media Communication Component] - Params Action:', action);
        this.mode = action;
        this.connectorService.mode = action;
        return action;
      }

    });

    // if (this.mode === 'video') {

    this.localStream = this.connectorService.getLocalStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get local stream: ', stream);
      this.myStream = stream;
    });

    // }

    this.remoteStream = this.connectorService.getRemoteStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get remote stream: ', stream);
      this.stream = stream;
      this.duration = new Date();
    });

    this.connStatus = this.connectorService.connectorStatus().subscribe((status: string) => {
      console.log('[Media Communication Component] -  connector status: ', status);

      if (status === 'end') {
        this.reset();
      }

    });

    console.log('[Media Communication Component] - Params Action:', this.mode);
  }

  ngOnInit() {

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
    this.connStatus.unsubscribe();
    this.localStream.unsubscribe();
    this.remoteStream.unsubscribe();
    this.subscription.unsubscribe();
    this.streamingActive = false;
    this.stream = null;
  }

  callTo(user: User) {

    let options = {video: true, audio: true};

    let contextID = this.contextualCommDataService.activeContext().id;

    console.log('[Media Communication Component] - ' + this.mode + ' call To', user, contextID);

    this.connectorService.connect(user.username, options, contextID, user.domain)
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
