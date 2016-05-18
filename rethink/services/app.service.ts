import { Injectable } from '@angular/core';

import {Contact} from '../comp/contact/contact';
import {Activity} from '../comp/activity/activity';
import {Context} from '../comp/context/context';

import rethink from 'runtime-browser';

@Injectable()
export class AppService {
  domain = 'vitor.dev'
  runtime = 'https://' + this.domain + '/.well-known/runtime/Runtime';
  config = { runtimeURL: this.runtime, development: true }

  contacts: [Contact] = [
    {id: 'id1', name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', unread: 1 },
    {id: 'id2', name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg' },
    {id: 'id3', name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg' },
    {id: 'id4', name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg' }
  ]

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

  contexts: [Context] = [
    {name: "Work", icon: 'a', childs: []},
    {name: "Fitness", icon: 'a', childs: []},
    {name: "School", icon: 'a', childs: []}
  ]

  constructor() {
    console.log('[Loading Rethink Runtime at] ', this.config.runtimeURL)
    rethink.install(this.config).then((runtime) => {
      console.log('[Runtime Loaded]')
      this.getListOfHyperties().then((result) => {
        console.log('[Hyperties] ', result)
      })

      let hypertyURL = 'hyperty-catalogue://catalogue.' + this.domain + '/.well-known/hyperty/HelloWorldObserver'
      runtime.requireHyperty(hypertyURL).then((hyperty) => {
        console.log('[Hyperty Loaded]: ', hyperty)
      })
    }).catch((error) => {
      console.error('[Error Loading Runtime] ', error)
    })
  }

  getListOfHyperties() {
    let hypertiesURL = 'https://catalogue.' + this.domain + '/.well-known/hyperty/'
    if (this.config.development) {
      hypertiesURL = 'https://' + this.domain + '/.well-known/hyperty/Hyperties.json'
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: hypertiesURL,
        success: (result: any, status: string, jqXHR: JQueryXHR) => {
          let response: any = []
          if (typeof result === 'object') {
            Object.keys(result).forEach(function(key) {
              response.push(key)
            })
          } else if (typeof result === 'string') {
            response = JSON.parse(result)
          }
          resolve(response)
        },
        error: (jqXHR: JQueryXHR, status: string, error: string) => {
          console.log(error)
          reject(error)
        }
      })
    })
  }

  getContacts() {
     return Promise.resolve(this.contacts)
  }

  getActivities() {
    return Promise.resolve(this.activities)
  }

  getContexts() {
    return Promise.resolve(this.contexts)
  }

}
