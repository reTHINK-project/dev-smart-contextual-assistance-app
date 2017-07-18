import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { User } from '../../../models/models';

@Component({
    moduleId: module.id,
    selector: 'user-identity',
    templateUrl: './userIdentity.component.html'
})
export class UserIdentityComponent implements OnInit {

    @HostBinding('class') hostClass = 'user-identity';

    @Input() model: User;

    constructor() { }

    ngOnInit() { }

}
