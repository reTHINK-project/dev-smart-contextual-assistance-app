import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';
import { Observable } from 'rxjs/Observable';

// Models
import { User, Message } from '../../models/models';


@Injectable()
export class UserAvailabilityService {


  hyperty: any;
  availabilityReporterURL: string;
  availabilityObserverURL: string;

  myAvailabilityReporter: any;
  availabilityObserver: any;
  myAvailability: any;


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
          this.myAvailabilityReporter.start().then((availability: any) => {
            this.myAvailability = availability;
            this.contactService.sessionUser.statustUrl = availability.url;
            this.contactService.sessionUser.status = 'available';
            this.myAvailabilityReporter.setStatus('available');
            this.startObservation();
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

          // Let's retrieve observers from previous sessions
          this.availabilityObserver.start().then((availabilities: any) => {
            // lets retrieve all users to be observed
            this.contactService.getUsers().subscribe((users: User[]) => { 
              console.log('[UserAvailability Service - startObservation] users to be observed:', users);

              let newUsers: User[] = [];


              //for each User lets start observation 
              users.forEach((user: User)=>{
                
                  if (user.statustUrl && availabilities[user.statustUrl]) {
                    // TODO: confirm controllers is a list not an array
                    user.startStatusObservation(availabilities[user.statustUrl]);
                  } else if (user.username !== this.contactService.sessionUser.username) {//don't observe myself
                    newUsers.push(user);
                  }

              });

              // Users that are not subscribed yet, let's subscribe

              if (newUsers.length >= 0) {
                this.subscribeUsers(newUsers);
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
      this.availabilityObserver.discoverUsers(user.username, this.rethinkService.domain).then((discovered:Array <any>) => {
        resolve( this.getLastModifiedAvailability(discovered) );

      });
    });

  }

  private getLastModifiedAvailability(hyperties: Array<any>) {
    // from a list of discovered Availability Hyperty reporters return the one that was last modified

    let lastModifiedHyperty: any = hyperties[0];

    hyperties.forEach((hyperty)=>{
      if (new Date(hyperty.lastModified).getTime() > new Date(lastModifiedHyperty.lastModified).getTime()) {
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
