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
    private rethinkService: RethinkService,
    private contactService: ContactService
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

  private startObservation()
  {
   console.log('[UserAvailability service. start observation] ');

      // let's first start the AvailabilityObserver Hyperty 
        this.rethinkService.getHyperty(this.availabilityObserverURL)
        .then((hyperty: any) => {
          this.availabilityObserver = hyperty.instance;
          console.log('[UserAvailability Service - getHyperty] Observer hyperty was instantiated ', this.availabilityObserver);
          this.hyperty = hyperty;

          // Let's retrieve observers from previous sessions
          this.availabilityObserver.start().then((controllers: any) => {
            // lets retrieve all users to be observed
            this.contactService.getUserList().subscribe((users: User[]) => { 
              console.log('[UserAvailability Service - startObservation] users to be observed:', users);

              let uncontrolledUsers: Array<User> = [];

              //for each User lets start observation 
              users.forEach((user: User)=>{
                if (user.statustUrl) {
                  // TODO: confirm controllers is a list not an array
                  user.startStatusObservation(controllers[user.statustUrl]); 
                } else {
                  uncontrolledUsers.push(user);
                }
              });

              // Users that have no controller resumed, let's subscribe to have one

              if (uncontrolledUsers.length >= 0) {
                this.subscribeUsers(uncontrolledUsers);
              }

          });

        });
      });
  }

  private subscribeUsers(users: Array<User>) {
    //for each user let's discover reporter Hyperties

    users.forEach((user: User) => {
      this.discoverUserAvailability(user).then((availability: any)=>{

        //lets start a new user availability observation

        this.availabilityObserver.observe(availability).then((controller: any)=>{
          user.startStatusObservation(controller);

        });

      });

    });
    
  }





  private discoverUserAvailability(user: User): Promise<Object>
   {
    // discover and return last modified user availability hyperty

    return new Promise((resolve, reject) => {
      this.availabilityObserver.discoverUsers(user.identifiers, user.domain).then((discovered:Array <any>) => {
        resolve( this.getLastModifiedAvailability(discovered) );

      });
    });

  }

  private getLastModifiedAvailability(hyperties: Array<any>) {
    // from a list of discovered Availability Hyperty reporters return the one that was last modified

    let lastModifiedHyperty: any = hyperties[0];

    hyperties.forEach((hyperty)=>{
      if (hyperty.lastModified > lastModifiedHyperty.lastModified) {
        lastModifiedHyperty = hyperty;
      }
    });
    return lastModifiedHyperty;
  }



  setStatus(status: string) {

    console.log('[UserAvailability service. setStatus]', status);

    this.myAvailabilityReporter.setStatus(status);
 
  }



}
