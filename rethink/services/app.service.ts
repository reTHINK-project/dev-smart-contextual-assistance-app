import { Injectable } from '@angular/core';

import {Contact} from '../comp/contact/contact';
import {Activity} from '../comp/activity/activity';
import {Context} from '../comp/context/context';

import rethink from 'runtime-browser';

@Injectable()
export class AppService {
  domain = 'hybroker.rethink.ptinovacao.pt'
  runtimeURL = 'https://' + this.domain + '/.well-known/runtime/Runtime';
  hypertyURL = 'hyperty-catalogue://catalogue.' + this.domain + '/.well-known/hyperty/HypertyChat'

  config = { runtimeURL: this.runtimeURL, development: true }

  chat: any
  runtime: any

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
    {
      name: "Work",
      icon: 'a',
      communication: 'comm://hybroker.rethink.ptinovacao.pt',
      contacts: [
        this.contacts[1],
        this.contacts[2]
      ],
      activities: [
        { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 1' },
        { contact: this.contacts[2], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 2' },
        { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 3' },
        { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 4' },
        { contact: this.contacts[2], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 5' },
        { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'message 6' },
      ]
    },
    {name: "Fitness", icon: 'a', communication: 'comm://hybroker.rethink.ptinovacao.pt', contacts: [], activities: []},
    {name: "School", icon: 'a', communication: 'comm://hybroker.rethink.ptinovacao.pt', contacts: [], activities: []}
  ]

  constructor() {
    this._loadRuntime()
  }

  getChatGroup(resource: string) {
    return new Promise((resolve, reject) => {
      if (this.chat) {
        console.log('[Return Chat]', resource)
        resolve(this.chat)
      } else {
        this._waitRuntimeReady(() => {
          this.runtime.requireHyperty(this.hypertyURL).then((hyperty: any) => {
            console.log('[Hyperty Loaded]', hyperty)
            hyperty.instance.join(resource).then((chat: any) => {
              console.log('[Joined Chat]', resource)
              this.chat = chat
              resolve(this.chat)
            })
          })
        })
      }
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

  getContact(id:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Contact>((resolve, reject) => {

      let contact = this.contacts.filter((contact) => {
        if(contact.id.indexOf(id) !== -1) return true
      })

      if (contact.length === 1) {
        resolve(contact[0])
      } else {
        reject('Contact not found');
      }


    })
  }

  getActivities() {
    return Promise.resolve(this.activities)
  }

  getContexts() {
    return Promise.resolve(this.contexts)
  }

  private _waitRuntimeReady(callback: any) {
    if (this.runtime) {
      callback()
    } else {
      setTimeout(() => { this._waitRuntimeReady(callback) })
    }
  }

  private _loadRuntime() {
    console.log('[Loading Rethink Runtime at] ', this.config.runtimeURL)
    rethink.install(this.config).then((runtime) => {
      console.log('[Runtime Loaded]')
      this.runtime = runtime
    }).catch((error) => {
      console.error('[Error Loading Runtime] ', error)
    })
  }

}
