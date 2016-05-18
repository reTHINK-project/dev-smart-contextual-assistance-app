(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.activate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();exports.default=activate;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var identities={};var nIdentity=0;var microsoftInfo={clientID:'7e2f3589-4b38-4b1c-a321-c9251de00ef2',redirectURI:location.origin,tokenEndpoint:'https://login.windows.net/common/oauth2/authorize?',type:'id_token',scope:'openid',nonce:'7362CAEA-9CA5-4B43-9BA3-34D7C303EBA7', //TODO change to a random number
mode:'fragment'}; /**
* Identity Provider Proxy
*/var idp={ /**
  * Function to validate an identity Assertion received
  * TODO add details of the implementation, and improve the implementation
  *
  * @param  {assertion}    Identity Assertion to be validated
  * @param  {origin}       Origin parameter that identifies the origin of the RTCPeerConnection
  * @return {Promise}      Returns a promise with the identity assertion validation result
  */validateAssertion:function validateAssertion(assertion,origin){return new Promise(function(resolve,reject){var idToken=JSON.parse(atob(assertion));resolve({identity:idToken.email,contents:idToken});});}, /**
  * Function to generate an identity Assertion
  * TODO add details of the implementation, and improve implementation
  *
  * @param  {contents} The contents includes information about the identity received
  * @param  {origin} Origin parameter that identifies the origin of the RTCPeerConnection
  * @param  {usernameHint} optional usernameHint parameter
  * @return {Promise} returns a promise with an identity assertion
  */generateAssertion:function generateAssertion(contents,origin,hint){ //start the login phase
//TODO later should be defined a better approach
return new Promise(function(resolve,reject){if(!contents){var m=microsoftInfo; //let requestUrl = 'https://login.windows.net/common/oauth2/authorize?response_type=id_token&client_id=7e2f3589-4b38-4b1c-a321-c9251de00ef2&scope=openid&nonce=7362CAEA-9CA5-4B43-9BA3-34D7C303EBA7&response_mode=fragment&redirect_uri=' + location.origin;
var requestUrl=m.tokenEndpoint+'response_type='+m.type+'&client_id='+m.clientID+'&scope='+m.scope+'&nonce='+m.nonce+'&response_mode='+m.mode+'&redirect_uri='+m.redirectURI;reject({name:'IdPLoginError',loginUrl:requestUrl});}else { //later verify the token and use the information from the JWT
var contentSplited=contents.split('.');var idToken=JSON.parse(atob(contentSplited[1]));var idpBundle={domain:'google.com',protocol:'OIDC'};var identityBundle={assertion:contentSplited[1],idp:idpBundle,infoToken:idToken};resolve(identityBundle);}});}}; /**
* Identity Provider Proxy Protocol Stub
*/var MicrosoftProxyStub=function(){ /**
  * Constructor of the IdpProxy Stub
  * The constructor add a listener in the messageBus received and start a web worker with the idpProxy received
  *
  * @param  {URL.RuntimeURL}                            runtimeProtoStubURL runtimeProtoSubURL
  * @param  {Message.Message}                           busPostMessage     configuration
  * @param  {ProtoStubDescriptor.ConfigurationDataList} configuration      configuration
  */function MicrosoftProxyStub(runtimeProtoStubURL,bus,config){_classCallCheck(this,MicrosoftProxyStub);var _this=this;_this.runtimeProtoStubURL=runtimeProtoStubURL;_this.messageBus=bus;_this.config=config;_this.messageBus.addListener('*',function(msg){if(msg.to==='domain-idp://microsoft.com'){_this.requestToIdp(msg);}});} /**
  * Function that see the intended method in the message received and call the respective function
  *
  * @param {message}  message received in the messageBus
  */_createClass(MicrosoftProxyStub,[{key:'requestToIdp',value:function requestToIdp(msg){var _this=this;var params=msg.body.params;switch(msg.body.method){case 'generateAssertion':idp.generateAssertion(params.contents,params.origin,params.usernameHint).then(function(value){_this.replyMessage(msg,value);},function(error){_this.replyMessage(msg,error);});break;case 'validateAssertion':idp.validateAssertion(params.assertion,params.origin).then(function(value){_this.replyMessage(msg,value);},function(error){_this.replyMessage(msg,error);});break;default:break;}} /**
  * This function receives a message and a value. It replies the value to the sender of the message received
  *
  * @param  {message}   message received
  * @param  {value}     value to include in the new message to send
  */},{key:'replyMessage',value:function replyMessage(msg,value){var _this=this;var message={id:msg.id,type:'response',to:msg.from,from:msg.to,body:{code:200,value:value}};_this.messageBus.postMessage(message);}}]);return MicrosoftProxyStub;}(); // export default IdpProxyProtoStub;
/**
 * To activate this protocol stub, using the same method for all protostub.
 * @param  {URL.RuntimeURL}                            runtimeProtoStubURL runtimeProtoSubURL
 * @param  {Message.Message}                           busPostMessage     configuration
 * @param  {ProtoStubDescriptor.ConfigurationDataList} configuration      configuration
 * @return {Object} Object with name and instance of ProtoStub
 */function activate(url,bus,config){return {name:'MicrosoftProxyStub',instance:new MicrosoftProxyStub(url,bus,config)};}module.exports=exports['default'];

},{}]},{},[1])(1)
});