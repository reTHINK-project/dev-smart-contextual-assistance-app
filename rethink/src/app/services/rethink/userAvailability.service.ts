import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';

// Models
import { User, Message } from '../../models/models';

@Injectable()
export class UserAvailabilityService {

  /*public chatControllerActive: any;

  private controllerList: Map<string, any> = new Map<string, any>();*/

  hyperty: any;
  availabilityReporterURL: string;
  availabilityObserverURL: string;

  myAvailabilityReporter: any;
  availabilityObserver: any;
  myAvailability: any;
  availabilityControllers: Map<string, Object>;

  observedUsers: Map<User,Object>

  /*private _onUserAdded: Function;
  private _onInvitation: Function;
  private _onMessage: Function;
  private _discovery: any;*/

  /*private _activeDataObjectURL: string;
  public get activeDataObjectURL(): string {
    return this._activeDataObjectURL;
  }

  public set activeDataObjectURL(value: string) {
    console.log('[Chat Service] - active controller:', value, this.controllerList);
    this._activeDataObjectURL = value;
    this.chatControllerActive = this.controllerList.get(value);
    console.info('[Chat Service] - active controller: ', this.chatControllerActive);
  }*/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rethinkService: RethinkService
   ) {       
    console.log('[UserAvailability Service - constructor] - ');

      this.availabilityReporterURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityReporter';
      this.availabilityObserverURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityObserver';
    
      this.rethinkService.getHyperty(this.availabilityReporterURL)
        .then((hyperty: any) => {
          this.myAvailabilityReporter = hyperty.instance;
          console.log('[UserAvailability Service - getHyperty] Reporter hyperty was instantiated ', this.myAvailabilityReporter);
          this.hyperty = hyperty;
          this.myAvailabilityReporter.start().then((availability: any) => {
            this.myAvailability = availability;

          });
       });



   }

  // Init

  private init(users: Array<User>, controllers: Array<Object>) {

  }

  private controllersToObservedUsers(users: Array<User>, controllers: Array<Object>): Map<User,Object>
  {
  // match users and controller returning observedUsers
  return;

  }

  private startUserObservation(user: User) {
    // from user.statusUrl find the right controller from availabilityControllers and set listener to updates

  }

  private discoverUserAvailability(user: User): Promise<Object>
   {
    // discover and return user availability objects
  }

  private getLastModifiedAvailability(availabilities: Array<Object>) {
    // from a list of discovered Availability objects return the one that was last modified
  }

  private subscribeAvailability(user: User, availability: Object): Promise<void>
  {
    //subscribe 
  }

  setStatus(status: string) {

    console.log('[UserAvailability service. setStatus]', status);

    this.myAvailabilityReporter.setStatus(status);
 
  }

  _getControllers(users: Array<User>) {
    //TODO: translate users in userURLs arrays, check if they exist in the current list of controllers.
    // If users are not observed yet, ask to observe and set the contextURL in the User. At the end return a Map<user,controller>

    users.forEach((user) => {
      this.availabilityControllers.forEach((observer) => {
      //  observer.
      });
    });

  }

  observeUsers(users: Array<User>)
  {
   console.log('[UserAvailability service. observe] ', users);

    return new Promise((resolve, reject) => {
      // First time we ask to observe users?
      if (!this.availabilityObserver) {
      // let's first start the AvailabilityObserver Hyperty 
        this.rethinkService.getHyperty(this.availabilityObserverURL)
        .then((hyperty: any) => {
          this.availabilityObserver = hyperty.instance;
          console.log('[UserAvailability Service - getHyperty] Observer hyperty was instantiated ', this.availabilityObserver);
          this.hyperty = hyperty;

          // Let's retrieve observers from previous sessions
          this.availabilityObserver.start().then((controllers: any) => {

            this.init(users, controllers).then(()=>{
              resolve();

            });

           this.observedUsers = this.controllersToObservedUsers(users, controllers);

           this.observedUsers.forEach((controller, user )=>{
              if (user.statustUrl) {
                // start observation
                this.startUserObservation(user);
              } else {

              }

           });

          });
       });

    users.forEach((user) => {
      if (user.statustUrl) {
        // start observation
        this.startUserObservation(user);
      } else {
        // discover, subscribe and start observation
        this.discoverUserAvailability(user).then((availabilities)=>{
          let availability = this.getLastModifiedAvailability(availabilities);
          this.subscribeAvailability(user, availability).then((user)=>{
            this.startUserObservation(user);
          });
          
        });
      }
    });
  }
    }

      }





  this.availabilityObserver.discoverUsers(users, domains).then(function(result) {
      console.log('[UserAvailabilityObserverDemo.discoverUsers] discovered: ', result);

      result.forEach((discoveredUser) => {

        if (discoveredUser.hasOwnProperty('userID')) {
          collectionItem = '<li data-url="' + discoveredUser.userID + '" class="collection-item">' +
          '<span class="title"><b>UserURL: </b>' + discoveredUser.userID + '</span>' +
          '<a hyperty-id= "'+discoveredUser.hypertyID+'" user-id= "'+discoveredUser.userID+'" href="#" title="Subscribe to ' + discoveredUser.userID + '" class="waves-effect waves-light btn subscribe-btn secondary-content" ><i class="material-icons">import_export</i></a>' +
          '<p><b>DescriptorURL: </b>' + discoveredUser.descriptor + '<br><b> HypertyURL: </b>' + discoveredUser.hypertyID +
          '<br><b>Resources: </b>' + JSON.stringify(discoveredUser.resources) +
          '<br><b>DataSchemes: </b>' + JSON.stringify(discoveredUser.dataSchemes) +
          '</p></li>';
        } else {
          collectionItem = '<li class="collection-item">' +
          '<span class="title">' + discoveredUser + '</span>' +
          '</li>';
        }

        let $item = $(collectionItem);

        let subscribe = $item.find('.subscribe-btn');

        subscribe.on('click', subscribeAvailability);
        collection.append($item);

      });
    }); 
    });
  }


  /*prepareHyperty() {

    console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);

    this.chatGroupManager.onResumeReporter((controllers: any) => {
      console.log('[Chat Service - prepareHyperty] - onResume reporters: ', controllers);

      Object.keys(controllers).forEach((url: string) => {

        this.controllerList.set(url, controllers[url]);
        this._updateControllersList(url, controllers[url]);

      });

    });

    this.chatGroupManager.onResumeObserver((controllers: any) => {
      console.log('[Chat Service - prepareHyperty] - onResume observers: ', controllers);

      Object.keys(controllers).forEach((url: string) => {

        this.controllerList.set(url, controllers[url]);
        this._updateControllersList(url, controllers[url]);

      });

    });

    this.chatGroupManager.onInvitation((event: any) => {
      console.log('[Chat Service - prepareHyperty] - onInvitation', event, this._onInvitation);
      if (this._onInvitation) { this._onInvitation(event); }
    });

  }*/

  /*prepareController(chatController: any) {

    console.log('[Chat Service - prepareController]', chatController);

    chatController.onUserAdded((user: any) => {
      let dataObjectURL = chatController.dataObject.url;

      console.log('[Chat Service - prepareController] - onUserAdded', user, dataObjectURL);
      let current: User;

      if (user.hasOwnProperty('data')) {
        current = this.contactService.getUser(user.data.identity.userURL);
        if (!current) { current = new User(user.data.identity); }
      } else {
        current = this.contactService.getUser(user.userURL);
        if (!current) { current = new User(user); }
      }

      console.log('[Chat Service - prepareController] - current user:', current);
      this.contextualCommService.updateContextUsers(current, dataObjectURL);
    });


    chatController.onMessage((message: any) => {

      console.log('[Chat Service - prepareController] - onMessage', message, this.chatControllerActive);

      let dataObjectURL = chatController.dataObject.url;
      let user: User = this.contactService.getUser(message.identity.userProfile.userURL);

      if (user) {
        let msg = {
          type: 'message',
          message: message.value.content,
          user: user
        };

        let currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    });

  }*/

  


/*  onSubscription(callback: Function) {
    this._onInvitation = callback;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

  onMessage(callback: Function) {
    this._onMessage = callback;
  }*/

}
