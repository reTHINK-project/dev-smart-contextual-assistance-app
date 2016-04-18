
var sessionManager =  angular.module('sessionManager', ['contactManager']);

sessionManager.controller('LoginController', function($scope, $location, sessionManagerFactory, wonderFactory){
	$scope.loading = false ;
	$scope.closeSession = function(coisas){
		var identity = wonderFactory.getMyIdentity();
		if(identity != null){
			identity.setStatus(IdentityStatus.UNAVAILABLE, false);
			identity.messagingStub.disconnect();
		}
		
		if($location.$path != "/Login"){
			var conversa = true;
		    for(var j = 0; j < identity.messagingStub.listeners.length;j++){
		    	var aux = identity.messagingStub.listeners[j];

		    	if(aux[0]){
		    		conversa = false;
		    	}
		    }
		    	if(conversa){
					$location.path($scope.path + '/' + "Login");
					wonderFactory.setMyIdentity(null);
				}
	    }
	}

	sessionManager.connected = function(){
		$location.path( $scope.path + '/' + wonderFactory.getMyIdentity().rtcIdentity);
        $scope.$apply();
	}

	sessionManager.onMessage = function (message) {
		
		switch (message.type) {

			case MessageType.CRUD_OPERATION:
	            break;

	        case MessageType.ACCEPTED:
	     		contactManager.onMessage(message);
	            break;
	        case MessageType.CONNECTIVITY_CANDIDATE:
	            
	            // put candidate to PC
	            break;
	        case MessageType.NOT_ACCEPTED:
	         	
	            break;
	        case MessageType.CANCEL:
	            
	            break;
	        case MessageType.ADD_RESOURCE:
	            
	            break;
	        case MessageType.REDIRECT:
	            
	            break;
	        case MessageType.BYE:
	        	contactManager.onMessage(message);
	            break;
	        case MessageType.OFFER_ROLE: // set new moderator of the conversatoin
	            
	            break;
	        case MessageType.INVITATION:
	            //console.log("INF---->",message.from.rtcIdentity)
				
				//
				
				contactManager.onMessage(message);

	            break;
	        case MessageType.RESOURCE_REMOVED:
	            break;
	        case MessageType.REMOVE_PARTICIPANT:
	            
	            break;
	        case MessageType.SHARE_RESOURCE:
	            
	            break;
	        case MessageType.UPDATE:
	       
	            break;
	        case MessageType.UPDATED:
	          
	            break;
	        case MessageType.SUBSCRIBE:
	            
	            break;
	        case MessageType.CONTEXT:
	            if(!message.login){
                	console.log("updateidentity statys");
                	contactManager.onMessage(message);
	            }
	            break;
	        case MessageType.MESSAGE:
	        	contactManager.onMessage(message);
	        	break;
	        default:
	            
         	   break;
  	   }
	}
	$scope.login = function (path, credentials) {
		if(credentials){
			$scope.path = path;
			$scope.loading = true ; 
			var myIdentity;
			var user = credentials.rtcIdentity;
			var status;

			var credentials = {"username": "vasco", "password": "vasco"};

			Idp.getInstance().createIdentity(user, function(identity) {
				myIdentity = identity;
				
				wonderFactory.setMyIdentity(identity);
				identity.resolve(function(stub) {
				stub.addListener(sessionManager.onMessage); //<- como adicionar o handler da aplicação no angular. esta definido no login ou home?
				   stub.connect(user, credentials, function(reply, sessionId){
	                console.log(reply);
	                if(reply == 'success'){
	                    myIdentity.sessionId = sessionId;
	                    
	                   var message = new MessageFactory.createCRUDMessage( "read", "Identities.<" + wonderFactory.getMyIdentity().rtcIdentity + ">.privategroups","");
					   wonderFactory.getMyIdentity().messagingStub.sendMessage(message, sessionManagerFactory.callBackGrupos);	
	                   var message = new MessageFactory.createCRUDMessage( "read", "Identities.<" + myIdentity.rtcIdentity + ">","");
				       myIdentity.messagingStub.sendMessage(message, sessionManagerFactory.callBackIdentities);
	                   myIdentity.setStatus("online", true);
	                   var msg = new MessageFactory.createCRUDMessage( "read", "Identities","");
				       myIdentity.messagingStub.sendMessage(msg, sessionManagerFactory.callBackAllIdentities);
	                   var msg1 = new MessageFactory.createCRUDMessage( "read", "Identities<" + myIdentity.rtcIdentity + ">.conversations" ,"");
				       myIdentity.messagingStub.sendMessage(msg1, sessionManagerFactory.callBackConversations);


	                }

	            });
				});
			}, function(e){
			console.log("error", e);
			});
			//$location.path( $scope.path + '/' + wonderFactory.getMyIdentity().rtcIdentity);
	        //$scope.apply()
		};
	}
});

sessionManager.presenceHandler = function (message) {
	contactManager.receiveMessage(message);
}	

sessionManager.factory('sessionManagerFactory', function(wonderFactory ){
	
	var factory = {};
	var grupos = new Array () //--> needed?
	
	var listConversations = new Array();
	var listAllUsers = new Array();
	var listGroups = new Array();
	var fvertxwonder = new Array()
	var fnodejswonder = new Array()
	var fwonder = new Array()
	factory.callBackAllIdentities = function(message)
	{
		var list  = wonderFactory.getListAllUsers();
		for(var i =0;i<message.results.length;i++){
			if(message.results[i].rtcIdentity != wonderFactory.getMyIdentity().rtcIdentity){
				var obj = new Object();
				obj.name = message.results[i].username;
				obj.avatar = message.results[i].avatar;
				list.push(obj);
			}

		}
		
		wonderFactory.setListAllUsers(list);
	}

	factory.callBackConversations = function(message)
	{
		var myIdentity = wonderFactory.getMyIdentity();

		var timeLine = wonderFactory.getTimeLine();
				


		for(var i =0; i< message.results.length;i++){
			var audio = false;
			var video = false;

			for(var j = 0; j< message.results[i].resources.length;j++){
				if(message.results[i].resources[j].type == "audioVideo"){
					audio = true;
					video = true
				}else{
					if(message.results[i].resources[j].type == "audioMic"){
						audio = true;
					}else{
						if(message.results[i].resources[j].type == "video"){
							video = true;
						}
					}
				}
			}

			var type = new Object();

			var c ;

			// remover participante myself 
			//console.log("xxxxx conversation retrieved ", message.results[i]);
			var participants = message.results[i].participants;
			//console.log("xxxxx conversation participants antes ", participants);
			var index = participants.indexOf(myIdentity.rtcIdentity);

			//console.log("xxxxx conversation participants ", participants);
			type.time = message.results[i].lastModified;
			//var d = Idp.getInstance().identities;
			//console.log("LENGHT", d.le)
			/*if(Idp.getInstance().identities){
				console.log("PAULO------", Idp.getInstance().identities.length)
				for (var i = 0; i < Idp.getInstance().identities.length; i++) {
					console.log("PAULO------", Idp.getInstance().identities[i].identity.rtcIdentity)
					if (participants[0] == Idp.getInstance().identities[i].identity.rtcIdentity) {
						console.log("PAULO------", Idp.getInstance().identities[i].identity.avatar)
						type.avatar = Idp.getInstance().identities[i].identity.avatar;
					}
				}
			}*/
			//if(participants.length==1){

			var setTimeline = function ( participantIdentities){

				//console.log("xxxxx identities created ", participantIdentities);

 				if (participantIdentities[0].avatar == "")
 					participantIdentities[0].avatar = "css/images/avatar-group.jpg";

				type.participants = participantIdentities;
					//console.log("pchpch timeline conversa participantes ", type.participants);
					if(video && audio){
							type.call = "Video-chamada com ";
						}else{
							if(audio){
								type.call = "Chamada com ";
							}else{
								if(video){
									type.call = "Video com ";
					}
							}
						}
					wonderFactory.addToTimeLine(type);
				}


 				//console.log("xxxxx conversation users  ", participants);

				wonderFactory.getIdentities( participants, setTimeline);

				//Idp.getInstance().createIdentities(participants, function(participantIdentities) {
					//timeLine.push(type);



/*					if(identityIdp.length == 1){
						type.avatar = identityIdp[0].avatar;
					}*/
					/*}, function(e){
						console.log("error", e);

					});*/
		/*	}else{
				type.avatar = "css/images/avatar-group.jpg";
			}*/
			
			/*console.log("BURRRAOOO", d)
			for(var y = 0; y< d.length;y++){
				if(y == 0){
					c = d[y].identity.username
				}else{
					if(y >3){
						c = c + ", e com outros " + type.participants.length - y;
						//break;
					}else{

						c =  c + ", " + d[y].identity.username
					}
				}
				
			}
			type.time = "Agora mesmo";
			type.participants = c;*/
			/*Idp.getInstance().createIdentities(participants, function(identityIdp) {
 			console.log("xxxxx identities created ", identityIdp);
				//type.participants = identityIdp.rtcIdentity;
						if(identityIdp.length == 1){
							type.avatar = identityIdp[0].avatar;
						}
						for(var y = 0; y< identityIdp.length;y++){
							if(y == 0){
								c = identityIdp[y].username
							}else{
								if(y >3){
									c = c + ", e com outros " + type.participants.length - y;
									//break;
								}else{

									c =  c + ", " + identityIdp[y].username
								}
							}
							
						}
						type.time = "Agora mesmo";
						type.participants = c;
						
						
							}, function(e){
						console.log("error", e);

						});*/


		}

		sessionManager.connected();	

		//console.log("pchpch setting timeline  ", timeLine);
		//wonderFactory.setTimeLine(timeLine);
	}
		factory.callBackGrupos = function(message)
	{
		
		//console.log("pch pch callBackGrupos message ", message);
		var splitrtc = new Array ();

		for (i=0; i<=message.results.length-1;i++){
				var groupData = message.results[i];
				if (groupData.elements){
				//console.log("pch pch callBackGrupos groupData elements ", groupData.elements);
					if(groupData.elements.length != 0){

						wonderFactory.createGroup(groupData);


						for (j=0; j<=message.results[i].elements.length-1;j++){	
							var user = new Object()
							user.presence = "offline";
							user.rtcIdentity = message.results[i].elements[j];			
							user.statecss="cfghcgcvgh";
							
							splitrtc = user.rtcIdentity.split("@");
							var	splitname = splitrtc [0];
							var	splitdomain = splitrtc [1];
							if (splitdomain=="vertx.wonder") {
								fvertxwonder.push(user.rtcIdentity)
							}
							if (splitdomain=="nodejs.wonder") {
								fnodejswonder.push(user.rtcIdentity)
							}
							if (splitdomain=="asterisk.wonder") {
								fwonder.push(user.rtcIdentity)
							}
						}
					}else {
						wonderFactory.createGroup(groupData);
					}
			}										
		}
		if(fvertxwonder.length >0){
			if(Idp.getInstance().checkForIdentity(fvertxwonder[0]) == null && fvertxwonder[0].split("@")[1] == wonderFactory.getMyIdentity().rtcIdentity.split("@")[1]){
				var msg = new MessageFactory.createIdentitySubscribeMessage(wonderFactory.getMyIdentity(), fvertxwonder)
				wonderFactory.getMyIdentity().messagingStub.sendMessage(msg, factory.subscriptionHandler);
			}
		}
		if(fnodejswonder.length >0){
			var msg = new MessageFactory.createIdentitySubscribeMessage(Idp.getInstance().checkForIdentity(fnodejswonder[0]), fnodejswonder)
			Idp.getInstance().checkForIdentity(fnodejswonder[0]).messagingStub.sendMessage(msg, factory.subscriptionHandler);
		}
		if(fwonder.length >0){
			var msg = new MessageFactory.createIdentitySubscribeMessage(Idp.getInstance().checkForIdentity(fwonder[0]), fwonder)
			Idp.getInstance().checkForIdentity(fwonder[0]).messagingStub.sendMessage(msg, factory.subscriptionHandler);
		}

	};

	factory.callBackIdentities = function(message)
	{

		var myIdentity = wonderFactory.getMyIdentity();
		myIdentity.username = message.results[0].username;
		myIdentity.avatar = message.results[0].avatar;
	};

		
	factory.subscriptionHandler = function(message)
	{
		console.log("SUBSCRIBE ACCEPTED.....", message)
	};


	factory.getListConversations = function()
	{
		return listConversations;
	};
	
	factory.addConversation = function(conversation)
	{
		var index = listConversations.indexOf(conversation);
		if (index != -1)
			listConversations.splice(index,1, conversation);
		else
			listConversations.push(conversation);
	};


	factory.removeConversation = function(conversation)
	{
		var index = listConversations.indexOf(conversation);
		if (index != -1)
			listConversations.splice(index,1)
	};

	factory.getConversation = function(conversation)
	{

    for(var i = 0; i<listConversations.length; i++){
        if(listConversations[i].conversation)
            if(listConversations[i].conversation.id == conversation.id ){
				return listConversations[i];
			}
		return null;
	}

	};

	factory.getConversationById = function(id)
	{

    for(var i = 0; i<listConversations.length; i++){
        if(listConversations[i].conversation)
            if(listConversations[i].conversation.id == id )
				return listConversations[i];
		}

		return null;

	};

	factory.setListConversations = function(newListConversations)
	{
		listConversations = newListConversations;
	};

	factory.getListAllUsers = function()
	{
		return listAllUsers;
	};
	
	factory.setListAllUsers = function(newListAllUsers)
	{
		listAllUsers = newListAllUsers;
	};

	factory.getListGroups = function()
	{
		return listGroups;
	};

	factory.setListGroups = function(newListGroups)
	{
		listGroups = newListGroups;
	};
	return factory;
});


