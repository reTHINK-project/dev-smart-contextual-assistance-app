import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'user-identity',
    templateUrl: './userIdentity.component.html'
})
export class UserIdentityComponent implements OnInit {

    @Input() model:any;

    constructor() { }

    ngOnInit() { }

}