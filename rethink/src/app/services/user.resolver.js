"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Service
var services_1 = require("./services");
var UserResolver = (function () {
    function UserResolver(rethinkService, chatService, messageService, contextService, contactService, router) {
        this.rethinkService = rethinkService;
        this.chatService = chatService;
        this.messageService = messageService;
        this.contextService = contextService;
        this.contactService = contactService;
        this.router = router;
    }
    UserResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var selectedUser = route.params['user'];
            console.log(selectedUser);
            var user = _this.contactService.getByUserName(selectedUser);
            if (user)
                resolve(user);
            else
                reject('no user found');
        });
        /*let userURL:string = route.params['user'];
    
        console.log('[User] Resolve: ', userURL, route );
    
        // TODO: check why the Observable don't work;
        return new Promise((resolve, reject) => {
    
          // let user:User = this.contactService.getContact(userURL);
          let name: string = user.userURL;
          let context: string = this.contextService.getContextPath;
          let task: string = this.contextService.getTaskPath;
    
          let parent: string = context;
    
          if (task) {
            parent = task;
          }
    
          this.chatService.create(name, [user.userURL], [user.domain]).then((chatController: any) => {
            console.log('Create chat service for all my contacts', chatController);
            return this.contextService.create(name, chatController.dataObject, parent)
          }, (error) => {
            console.log('Error creating the context: ', error);
            reject(error);
          }).then((contextualComm:ContextualComm) => {
            this.contextService.getContextByName(name).then((contextualComm:ContextualComm) => {
    
              this.messageService.setMessages(contextualComm.messages);
    
              resolve(user);
            })
          });
    
        });
    */
    };
    return UserResolver;
}());
UserResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [services_1.RethinkService,
        services_1.ChatService,
        services_1.MessageService,
        services_1.ContextService,
        services_1.ContactService,
        router_1.Router])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map