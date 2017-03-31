import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

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
  private incomingCall:boolean = false;
  private invitationUser:User;

  constructor(
    private contactService: ContactService,
    private connectorService: ConnectorService,
  ) {

    this.connectorService.onInvitation((videoController:any, identity:any) => {

      this.incomingCall = true;
      this.invitationUser = this.contactService.getUser(identity.userURL);

    })

    if (this.mode === 'video') {

      this.connectorService.getLocalStream().subscribe((stream) => {
        this.myStream = stream;
      })

    }

    this.connectorService.getRemoteStream().subscribe((stream) => {
      this.stream = stream;
    })

  }

  ngOnInit() {
    this.connectorService.mode = this.mode;
    this.videoCallTo(this.user);
  }

  videoCallTo(user:User) {

    let options = {video: true, audio: true};

    this.connectorService.connect(user.username, options, user.userURL, 'localhost')
      .then((controller) => {
        controller.dataObjectReporter.data.mode = this.mode;
        console.log('[Media Communication Component] - ' + this.mode + ' Call To', controller);
      }).catch(function(reason) {
        console.error(reason);
      });

  }

  onCall() {
    console.log('[MediaCommunicationComponent ] - OnCall Click: ', this.user);
  }

  onHangup() {

  }

  onMute() {

  }

  onVolume() {

  }
}
