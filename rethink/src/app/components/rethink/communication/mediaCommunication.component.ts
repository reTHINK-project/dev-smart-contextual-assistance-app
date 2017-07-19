import { Component, Input, OnInit, HostBinding,
  OnDestroy, ViewContainerRef, AfterViewInit,
  ViewChild, ElementRef, Renderer2, ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Models
import { User } from '../../../models/models';

// Services
import { ContextualCommDataService } from '../../../services/contextualCommData.service';
import { ContactService, ConnectorService } from '../../../services/services';
import { Subscription } from 'rxjs/Subscription';
import { FullscreenDirective } from '../../../shared/fullscreen.directive';

@Component({
  moduleId: module.id,
  selector: 'media-view',
  templateUrl: './mediaCommunication.component.html',
  styleUrls: ['./mediaCommunication.component.scss']
})
export class MediaCommunicationComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'video-box row no-gutters h-100';

  @ViewChild(FullscreenDirective) fullscreen: FullscreenDirective;

  @Input() user: User;
  @Input() mode: string;

  myStream: any;
  stream: any;
  duration: Date;
  notificationsService: any;

  private params: Subscription;
  private streamingActive = false;
  private localStream: Subscription;
  private remoteStream: Subscription;
  private connStatus: Subscription;
  private onDisconnect: Subscription;

  constructor(
    private rd: Renderer2,
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private vcRef: ViewContainerRef,
    private contactService: ContactService,
    private connectorService: ConnectorService,
    private contextualCommDataService: ContextualCommDataService
  ) {
    console.log('[Media Communication Component] - Constructor:', this.route.queryParams);

    this.streamingActive = false;

    this.localStream = this.connectorService.getLocalStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get local stream: ', stream);
      this.myStream = stream;
      this.duration = new Date();
    });

    this.remoteStream = this.connectorService.getRemoteStream().subscribe((stream) => {
      console.log('[Media Communication Component] - get remote stream: ', stream);
      this.streamingActive = true;
      this.stream = stream;
      this.duration = new Date();
    });

    this.params = this.route.queryParams.subscribe((params: any) => {
      console.log('[Media Communication Component] - queryParams: ', params, this.streamingActive);
      const action = params['action'];
      this.mode = action;
      this.connectorService.mode = action;

      if (this.mode) {
        this.prepareComponent();
      } else {
        if (this.streamingActive && this.mode === 'video') {
          this.connectorService.enableVideo();
        }
      }

    })

    this.connStatus = this.connectorService.connectorStatus().subscribe((status: string) => {
      console.log('[Media Communication Component] -  connector status: ', status);

      if (status === 'end') {
        this.reset();
      }

    });

    console.log('[Media Communication Component] - Params Action:', this.mode);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

  }

  ngOnDestroy() {
    console.log('[Media Communication] - ngOnDestroy');

    if (this.params) { this.params.unsubscribe(); }
    if (this.connStatus) { this.connStatus.unsubscribe(); }
    if (this.localStream) { this.localStream.unsubscribe(); }
    if (this.remoteStream) { this.remoteStream.unsubscribe(); }

    this.onHangup();
  }

  reset() {
    this.stream = null;
    this.myStream = null;
    this.duration = null;
    this.streamingActive = false;
    this.fullscreen.exitFullScreen();
  }

  private prepareComponent() {

    console.log('[Media Communication Component] - connection mode: ', this.connectorService.connectorMode, this.streamingActive);

    if (this.connectorService.connectorMode === 'offer' && !this.streamingActive) {
      this.callTo(this.user);
    }

  }

  callTo(user: User) {

    const options = {video: true, audio: true};

    const contextID = this.contextualCommDataService.activeContext().id;

    console.log('[Media Communication Component] - ' + this.mode + ' call To', user, contextID);

    this.connectorService.connect(user.username, options, contextID, user.domain)
      .then((controller) => {
        this.streamingActive = true;
        controller.dataObjectReporter.data.mode = this.mode;

        if (this.mode === 'video') {
          this.connectorService.enableVideo();
        }

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
    // this.fullscreen.toogleFullscreen();
  }

  onHangup() {
    console.log('[Media Communication Component] - Hangup', this.connectorService);
    this.connectorService.hangup();
    this.reset();
  }

  onMute() {
    this.connectorService.mute();
  }

  onVolume() {
    this.connectorService.disableAudio();
  }
}
