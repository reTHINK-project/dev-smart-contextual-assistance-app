import { provide } from '@angular/core';

export class LocalStorage {

    public localStorage:any;

    constructor() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }

    public set(key:string, value:string):void {
      this.localStorage[key] = value;
    }

    public get(key:string):any {
      return this.localStorage[key] || false;
    }

    public setObject(key:string, value:any):void {
        this.localStorage[key] = JSON.stringify(value);
    }

    public getObject(key:string):any {
      return JSON.parse(this.localStorage[key] || '{}'); 
    }

    public remove(key:string):any {
        this.localStorage.removeItem(key);
    }

    public hasObject(key:string):any {
      return this.localStorage.hasOwnProperty(key);
    }
}

export const LOCAL_STORAGE_PROVIDERS:any[] = [
    provide(LocalStorage, {useClass: LocalStorage})
];
