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

  myAvailabilityReporter: any;
  availabilityObserver: any;
  myAvailability: any;
  domain: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rethinkService: RethinkService,
    private contactService: ContactService
   ) {

    this.domain = this.rethinkService.domain;

  }


  getHyperty() {

    return new Promise((resolve, reject) => {

      console.log('[UserAvailability Service - get hyperty reporter] - ');

      const availabilityReporterURL = 'hyperty-catalogue://catalogue.' + this.domain + '/.well-known/hyperty/UserAvailabilityReporter';

      this.rethinkService.getHyperty(availabilityReporterURL)
        .then((hyperty: any) => {
          this.myAvailabilityReporter = hyperty.instance;
          console.log('[UserAvailability Service - getHyperty] Reporter hyperty was instantiated ', this.myAvailabilityReporter);
          this.myAvailabilityReporter.start().then((availability: any) => {
            this.myAvailability = availability;

            console.log('[UserAvailability Service - User Session] ', this.contactService.sessionUser);

            this.contactService.sessionUser.statustUrl = availability.url;
            this.contactService.sessionUser.status = 'available';
            this.myAvailabilityReporter.setStatus('available');
            this.startObservation();

            resolve(this.myAvailabilityReporter);
          });
        }).catch((reason: any) => {
          reject(reason);
        })

    });

  }

  stopObservation(availability: any) {
    console.log('[UserAvailability service. stop observing] ', availability);
    this.availabilityObserver.unobserve(availability);
  }

  private startObservation() {

    console.log('[UserAvailability service. start observation] ');

    const availabilityObserverURL = 'hyperty-catalogue://catalogue.' + this.domain + '/.well-known/hyperty/UserAvailabilityObserver';

    // let's first start the AvailabilityObserver Hyperty
    this.rethinkService.getHyperty(availabilityObserverURL).then((hyperty: any) => {
      this.availabilityObserver = hyperty.instance;
      console.log('[UserAvailability Service - getHyperty] Observer hyperty was instantiated ', this.availabilityObserver);

      // Let's retrieve observers from previous sessions
      this.availabilityObserver.start().then((availabilities: any) => {
        // lets retrieve all users to be observed
        this.contactService.getUsers().subscribe((users: User[]) => {
          console.log('[UserAvailability Service - startObservation] users to be observed:', users);
          const newUsers: User[] = [];
          users.forEach((user: User) => {

            if (user.statustUrl && availabilities[user.statustUrl]) {
              // TODO: confirm controllers is a list not an array
              user.startStatusObservation(availabilities[user.statustUrl]);
            } else if (user.userURL !== this.contactService.sessionUser.userURL) { // don't observe myself
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

    // for each user let's discover reporter Hyperties

    users.forEach((user: User) => {
      this.discoverUserAvailability(user).then((availability: any) => {

        // lets start a new user availability observation
        this.availabilityObserver.observe(availability).then((controller: any) => {
          user.startStatusObservation(controller);

        });

      });

    });

  }

  private discoverUserAvailability(user: User): Promise<Object> {
    // discover and return last modified user availability hyperty

    return new Promise((resolve, reject) => {
      this.availabilityObserver.discoverUsers(user.userURL.split('://')[1].split('/')[1], this.rethinkService.domain).then((discovered: Array <any>) => {
        resolve( this.getLastModifiedAvailability(discovered) );

      });
    });

  }

  private getLastModifiedAvailability(hyperties: Array<any>) {
    // from a list of discovered Availability Hyperty reporters return the one that was last modified
    let lastModifiedHyperty: any = hyperties[0];

    hyperties.forEach((hyperty) => {
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
