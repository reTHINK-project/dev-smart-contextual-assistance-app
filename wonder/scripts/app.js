//Definicao do Module
var wonderApp = angular.module('wonderApp', ['ngRoute', 'ngDraggable', 'sessionManager', 'contactManager']);		

//Definicao das Routes
wonderApp.config(function($routeProvider){
	$routeProvider
		.when('/Login',
		{
			controller: 'LoginController',
			templateUrl: 'partials/login.html'
		})
		.when('/home/:username',
		{
			controller: 'contactController',
			templateUrl: 'partials/home.html'
		})
		.otherwise({redirectTo: '/Login' });
});

wonderApp.factory('wonderFactory', function(){
	
	var factory = {};
	var myIdentity;
	var timeLine = [];
	var identities = [];

	var listMessages = new Object();
	listMessages.users = new Array();
	
	factory.getIdentity = function(rtcIdentity, callback, callbackincomplete)
	{
		//console.log("pchpch getIdentity ", rtcIdentity ," from ",  identities);

		//if (identities){
		for(var j = 0; j < identities.length ;j++){
		//console.log("pchpch getIdentity is ", rtcIdentity ," equal to ",  identities[j]);
			if (identities[j].rtcIdentity == rtcIdentity )
			{
				//console.log("pchpch getIdentity returning existing Identity ",  identities[j]);
				callback( identities[j] );
				return;
				}
				
			}
		//}

		Idp.getInstance().createIdentity(rtcIdentity, function(newIdentity) {
			//console.log("pchpch getIdentity gone push identity " , newIdentity ," into ",  identities);
			if (newIdentity.username)
				identities.push(newIdentity);
			else{
				callbackincomplete(newIdentity);
				return;
				}
			//console.log("pchpch getIdentity returning new Identity ",  newIdentity);

			callback( newIdentity );
				}, function(e){
						console.log("error", e);

					});
	};

	factory.getIdentities = function(rtcIdentities,callback)
	{
		that = this;
		//console.log("pchpch getIdentities  ", rtcIdentities);

		var identityToReturn = function ( rtcIdentity, identityDone){
				that.getIdentity(rtcIdentity, function processIdentity(ident){
					if (ident){
						//console.log("pchpch getIdentities identityToReturn ", ident);

						identityDone(null, ident );
					} 
				}, function processIncompleteIdent(incIdent){ identityDone("error", incIdent ) } );
			}

		//var identitiesToReturn = new Array();

		var i = 0;

		if (rtcIdentities){
			//while (i<10){
			//console.log("pchpch getIdentities trying .. ", rtcIdentities);

			async.map(rtcIdentities , identityToReturn , function (error, identitiesToReturn){
				//console.log("pchpch getIdentities returned identities ", identitiesToReturn);

				//console.log("pchpch getIdentities is complete? ", error);
				if (!error){
				//console.log("pchpch getIdentities identitiesToReturn ", identitiesToReturn);
				callback( identitiesToReturn);
				return;
				} else {
				//console.log("ERROR! (getIdentities) Identities are incomplete", identitiesToReturn);
				callback( identitiesToReturn);
				}

				});
			/*i=i+1;
			setTimeout(function(){}, 500);

			} */
		}
	};
	
	factory.getListMessages = function()
	{
		return listMessages;
	};
	
	factory.setListMessages = function(newlistMessages)
	{
		listMessages = newlistMessages;
	};

	factory.getTimeLine = function()
	{
		return timeLine;
	};
	
	/*factory.setTimeLine = function(newtimeLine)
	{
		timeLine = newtimeLine;
	};*/

	factory.addToTimeLine = function(event)
	{
		timeLine.push(event);
		//console.log("pchpch timeline ", timeLine);
	};

	factory.getMyIdentity = function()
	{
		return myIdentity;
	};
	
	factory.setMyIdentity = function(newMyIdentity)
	{
		myIdentity = newMyIdentity;
	};
	var listAllUsers = new Array();
	var listGroups = new Array();
	
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
		//console.log("pchpch App getListGroups ", listGroups);

		return listGroups;
	};

/*	factory.setListGroups = function(newListGroups)
	{
		listGroups = newListGroups;
	};*/

	factory.addGroup = function(newGroup)
	{
		listGroups.push(newGroup);
		//console.log("pchpch App groups after addGroup ", listGroups);
	};

	factory.createGroup = function(dataGroup)
	{
		that = this;
		var myGroup = new Array();
		myGroup.users = new Array();							
		myGroup.name =dataGroup.name;
		myGroup.id = dataGroup.id;
		myGroup.groupId = dataGroup.groupId;


		var createGroupWithIdentities = function createGroupWithIdentities ( groupIdentities){ 
			//console.log("pch pch callBackGrupos groupIdentities ", groupIdentities);

			myGroup.users.push.apply(myGroup.users, groupIdentities);


			that.addGroup(myGroup);
			sessionManager.connected();	


			}

		if (dataGroup.elements)
			that.getIdentities(dataGroup.elements, createGroupWithIdentities.bind(this) );
		else
			createGroupWithIdentities("[]").bind(this); 

	};


	return factory;
});

