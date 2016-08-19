import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user-identity',
    templateUrl: 'components/rethink/userIdentity/userIdentity.component.html'
})
export class UserIdentityComponent implements OnInit {

    @Input() model:any;

    constructor() { }

    ngOnInit() { }

}