/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app/app-routing.module.js","345ae45adb62481fcfbcd0443d5b6915"],["app/app-routing.module.js.map","0f6ffeb590a71932fa85058e1eddb152"],["app/app-routing.module.ts","279412949cdea37a239fda10dc878400"],["app/app.component.html","ad00d45db0edb9496f68e4c11e3b9cac"],["app/app.component.js","37b665ef9e76aa6e3f3fd6d690797a94"],["app/app.component.js.map","bd3583f6b971a36fab3e42dfc9f100a6"],["app/app.component.spec.js.map","008ea7750b33daf29be719cdd260ea34"],["app/app.component.spec.ts","d0848ff0ae40d968d3b3a98dc8e749f3"],["app/app.component.ts","faa21a68e64d726f3f303721d92ef670"],["app/app.module.js","9207aad15623241dcb9ee9cb3b5ae502"],["app/app.module.js.map","9e6b48273179c08276fdd7d6a52866cb"],["app/app.module.ts","4b3ede89f29410d83aeeb2a8cce0c868"],["app/components/fileshare/fileshare.module.ts","c569bd381fa960d0e5e00f8b81c291ef"],["app/components/fileshare/filesharelist.comp.js.map","086f9dc0dfc8298dbf6d7ac50df20338"],["app/components/fileshare/filesharelist.component.html","c0639b8d4243303ff5f6bb3fac90e5ba"],["app/components/fileshare/filesharelist.component.ts","cd09aeee528a3d39ed58eff5c13f72f0"],["app/components/mySelf/my-self.component.html","0c40ee587eeaca925cb2602691f6d14a"],["app/components/mySelf/my-self.component.js","ec51f3b0473e6e176f27a3c095a8175b"],["app/components/mySelf/my-self.component.js.map","94b44cf3f543a33a11d2b460fece1fd7"],["app/components/mySelf/my-self.component.ts","f2d0d0f079536e1e68b2090d59f84576"],["app/components/notification/native-notifications.module.js","72acccda14d0cce683b13c23cc1ecabf"],["app/components/notification/native-notifications.module.js.map","c9b57b3869df411c6e5cd321d54bbc55"],["app/components/notification/native-notifications.module.ts","775440d197047f4124dbd66fdbf9dfc4"],["app/components/notification/native-notifications/interfaces/native-notification.type.js","2397b918bcc36e9a1542339109e8d893"],["app/components/notification/native-notifications/interfaces/native-notification.type.js.map","721ede86a811fb8e11258c431a90e555"],["app/components/notification/native-notifications/interfaces/native-notification.type.ts","c5f8ee7801817131dd02c65470666620"],["app/components/notification/native-notifications/services/native-notifications.service.js","dd736f5304081b1feb622eea8a96c608"],["app/components/notification/native-notifications/services/native-notifications.service.js.map","e7f8936fdd923bd9eed57c4b3e32ec02"],["app/components/notification/native-notifications/services/native-notifications.service.ts","936e6038df156d01943d9c0f204db0c5"],["app/components/notification/notification.component.js.map","29fb072300c9161b700384636af29c11"],["app/components/notification/notifications.module.js","3a6df43cda9d2a3461bb331ddaabe4ce"],["app/components/notification/notifications.module.js.map","2235e96b708d7d68ca4513d118200224"],["app/components/notification/notifications.module.ts","b3dc5d3db76e5d1b14ab98bd8c81f9d8"],["app/components/notification/notifications/components/notification.component.css","47e0095585c4996ff39e23c190bc5068"],["app/components/notification/notifications/components/notification.component.html","a32e035c3044625430a2de2e57e6fb80"],["app/components/notification/notifications/components/notification.component.js","0d91233181fcfcacedb37131672fe33e"],["app/components/notification/notifications/components/notification.component.js.map","47a7f4a422066c21b84b6dc26fb64d80"],["app/components/notification/notifications/components/notification.component.ts","deb84a4a1825698707763859f491fddd"],["app/components/notification/notifications/components/notifications.component.js","400983341adea072802ea6e868fa0278"],["app/components/notification/notifications/components/notifications.component.js.map","54a41134133d428bafb97c652f87b4ab"],["app/components/notification/notifications/components/notifications.component.ts","071cccfa246f4afbe28e1a704c1bcefb"],["app/components/notification/notifications/interfaces/icons.js","d516bb1c47629c167d2e2444d875b646"],["app/components/notification/notifications/interfaces/icons.js.map","3830364eef9ad6df87a609d9e74ac278"],["app/components/notification/notifications/interfaces/icons.ts","b798bab9ee720c7fd5d211341e6d82bf"],["app/components/notification/notifications/interfaces/notification-event.type.js","f324b586f5258e574fb9875350f61e0b"],["app/components/notification/notifications/interfaces/notification-event.type.js.map","0e3a399f325932274d499b9e0e6efa88"],["app/components/notification/notifications/interfaces/notification-event.type.ts","7de4fedb9b6fc6d8e2fd731fdd7b71fb"],["app/components/notification/notifications/interfaces/notification.action-event.js","2f093547820e1dae95e8b8183135f79d"],["app/components/notification/notifications/interfaces/notification.action-event.js.map","a93b660f3ca9cd6b478cd4753d13c8b3"],["app/components/notification/notifications/interfaces/notification.action-event.ts","6c187810ad1b62c94d9a96d81906878e"],["app/components/notification/notifications/interfaces/notification.type.js","db81fb056b61c7b666abf39dedd4a2da"],["app/components/notification/notifications/interfaces/notification.type.js.map","feb5ab1c319859408d7f9de56ec3b4e7"],["app/components/notification/notifications/interfaces/notification.type.ts","23ceba1ec5d13901a41ba7395ee4ac85"],["app/components/notification/notifications/interfaces/options.type.js","2b70c12b8b7fdfafc3f826efe187619a"],["app/components/notification/notifications/interfaces/options.type.js.map","0ffc6a84fd2cc4248a499ec1115bb3aa"],["app/components/notification/notifications/interfaces/options.type.ts","1967ef59422349d35148d4f6f6534c09"],["app/components/notification/notifications/pipes/max.pipe.js","dabc92e34e45bd5c26e1210c701e56e7"],["app/components/notification/notifications/pipes/max.pipe.js.map","2e7cd20cab6e4abfa5e024675ca2bb27"],["app/components/notification/notifications/pipes/max.pipe.ts","b4cf6b002719c0708b85e7afed461c87"],["app/components/notification/notifications/services/notifications.service.js","a16367f6fa11d0737af8412645c05cae"],["app/components/notification/notifications/services/notifications.service.js.map","2d834c6bdec02870966e1af00f17787c"],["app/components/notification/notifications/services/notifications.service.ts","de74909f26bd30b8c1c4a7e712dabbf7"],["app/components/rethink/communication/audioCommunication.component.js.map","0da6359af076b876bf9d680eb7151096"],["app/components/rethink/communication/chatCommunication.component.html","1fbac38b5661ce096e4cfcc516b6c2f3"],["app/components/rethink/communication/chatCommunication.component.js","5b2a0e1b97d3c70f06df4e2de03db1a0"],["app/components/rethink/communication/chatCommunication.component.js.map","16dd072061b46c9520c2f220fa09448a"],["app/components/rethink/communication/chatCommunication.component.ts","02717748e68cd7252128e5cf9b816b46"],["app/components/rethink/communication/mediaCommunication.component.html","6fccbadd1950e6880a5c78d6439ef8cc"],["app/components/rethink/communication/mediaCommunication.component.js","072e233fb891f6b261174e405041a492"],["app/components/rethink/communication/mediaCommunication.component.js.map","ca165af1581599dfce355f9b7d42b535"],["app/components/rethink/communication/mediaCommunication.component.scss","6f5b6dbf32c98126596c13162a08a90b"],["app/components/rethink/communication/mediaCommunication.component.ts","bc4913da3281d0431321b471a89d1721"],["app/components/rethink/communication/videoCommunication.component.js.map","da7f45d6428ff5814c836b0990cf9618"],["app/components/rethink/context/Context.js","03f42261a5f41153619b1ceec133593d"],["app/components/rethink/context/Context.js.map","3b8ce2d379327809da7917d5fab94b1c"],["app/components/rethink/context/Context.ts","d41d8cd98f00b204e9800998ecf8427e"],["app/components/rethink/hypertyResource/audio/audio.component.js","b7d5515b7f07619a9dd2acb9669ac44a"],["app/components/rethink/hypertyResource/audio/audio.component.js.map","6953ca1db345de7ba8f2cb23686fd926"],["app/components/rethink/hypertyResource/audio/audio.component.ts","d41d8cd98f00b204e9800998ecf8427e"],["app/components/rethink/hypertyResource/chat/chatEvent.component.html","01399e468f046d166ee405289d7a8533"],["app/components/rethink/hypertyResource/chat/chatEvent.component.js","e3d9fd5f3157066708ce83ed0ffe436a"],["app/components/rethink/hypertyResource/chat/chatEvent.component.js.map","4b0a1dea50c0d18be656df87e3da33d0"],["app/components/rethink/hypertyResource/chat/chatEvent.component.ts","9242f805b4e8a99fdacb7a58aa9bc812"],["app/components/rethink/hypertyResource/file/file.component.js.map","5f94b21ce94714ea93c687aa6115b668"],["app/components/rethink/hypertyResource/file/fileEvent.component.html","e7be0ddad488a83844f7de5030e92033"],["app/components/rethink/hypertyResource/file/fileEvent.component.js","daa5de54d10dcd5ef3fff8f029530e89"],["app/components/rethink/hypertyResource/file/fileEvent.component.js.map","4c27b3db02e91cd4563e511841502093"],["app/components/rethink/hypertyResource/file/fileEvent.component.ts","aaec9fccaeb7bd43ea1783d7af1fb925"],["app/components/rethink/hypertyResource/video/video.component.js","8f41b0172ccd2446937f0b7ebe212ece"],["app/components/rethink/hypertyResource/video/video.component.js.map","12fb07778df355b21b89f6d89b171a96"],["app/components/rethink/hypertyResource/video/video.component.ts","d41d8cd98f00b204e9800998ecf8427e"],["app/components/rethink/userIdentity/userIdentity.component.html","20fb64a3156cd0a53ae056e52d16cce4"],["app/components/rethink/userIdentity/userIdentity.component.js","8b3f9d8c87b7beda357be36a7327d130"],["app/components/rethink/userIdentity/userIdentity.component.js.map","e10c293b6321ff3040b2222fe0ec2444"],["app/components/rethink/userIdentity/userIdentity.component.ts","8dcb088b7e3770b8313e9b598145cde5"],["app/config.js","16200ad8fcb695f66ce7dc6ae63caec9"],["app/config.js.map","e06989699323f36545144fd19dc890dd"],["app/config.ts","273d439faa0dad3ee0152805bb36c66f"],["app/models/app.models.js","cfb23af5172839f525e90dcd58b58370"],["app/models/app.models.js.map","5d702ec2a3af0f390743351daaa13d21"],["app/models/app.models.ts","cb5fe989531730825b309773e6577519"],["app/models/application/Context.js","48ae4cedc00d61b28d05b4dd013588fa"],["app/models/application/Context.js.map","3b8ce2d379327809da7917d5fab94b1c"],["app/models/application/Context.ts","60fd9ec58f2151520507d0c3630c1d06"],["app/models/application/ContextualComm.js","774416d78e366155c113e491371c8f36"],["app/models/application/ContextualComm.js.map","214e0c84b51f32bb0d5beda10fd51516"],["app/models/application/ContextualComm.ts","d0c862817fc10558bbf5cecc50641264"],["app/models/application/ContextualCommTrigger.js","225ce6b7c9dc9fe7af9b798fa53b2c9c"],["app/models/application/ContextualCommTrigger.js.map","59b0dfda67a2f7cc6567e985adc578b2"],["app/models/application/ContextualCommTrigger.ts","056f622ad2aea1433e313aba8667b976"],["app/models/models.js","859414fbd0ef9572f9eac7fa0e56bd67"],["app/models/models.js.map","7e685bad0420e7a2e385f377834f7687"],["app/models/models.ts","f3ea61e8346f444bd0174d453df284f2"],["app/models/rethink/Communication.js","1cbc3b6f1f01d93993b297d8957590f9"],["app/models/rethink/Communication.js.map","94b4a5e410ff8292cfd9fe2adaa9878b"],["app/models/rethink/Communication.ts","8929270be82b870a1da91f1cf1dd25c2"],["app/models/rethink/Connection.js","9f7794b9b44ee2a3f1a93ab71f291598"],["app/models/rethink/Connection.js.map","66c15643bbaf63409ef79216443f0389"],["app/models/rethink/Connection.ts","ab64a1e51148e86fb9dda4481d59d122"],["app/models/rethink/Context.js","d86c225a8df05bb5daf2e89436e8c9c8"],["app/models/rethink/Context.js.map","8a2cb82fbe60f6e936eeb10067c17373"],["app/models/rethink/Context.ts","e0205bc6aa58e7b678375ca04fbb4e11"],["app/models/rethink/HypertyResource.js","fc8cf3a60662a71f2a809e164a25a089"],["app/models/rethink/HypertyResource.js.map","f3468ded0bcd1919742479717ae35af9"],["app/models/rethink/HypertyResource.ts","e3cdcc64f80d5da5dbaebda677c76328"],["app/models/rethink/UserIdentity.js","40e963755a17521c91cd87c6e0182995"],["app/models/rethink/UserIdentity.js.map","5733e7458e9ccd98896db1723a9888cd"],["app/models/rethink/UserIdentity.ts","d56eebe7eba9005affdccc27f81e0eb0"],["app/pipes/pipes.js","5b8b74f5b7f8eeca993a31bd27a35208"],["app/pipes/pipes.js.map","73c54219e64d1460569467e65a7c9721"],["app/pipes/pipes.ts","67c8061206976441e7735a8e5842d7b1"],["app/pipes/timeElapsedPipe.js","3bb727b5c28caf6eefa3967675a7d4c4"],["app/pipes/timeElapsedPipe.js.map","7d6241fb550eb5298f1aba4f7cca000f"],["app/pipes/timeElapsedPipe.ts","a93802142e7537e4f3d81770875cb688"],["app/rethink.routing.js.map","9177ee005e98c930c8b1c04dd79cefd2"],["app/services/activateTask.service.js","4efe5178e2ecbf123a3d79198fca95dc"],["app/services/activateTask.service.js.map","5a2259a4c2a2d127d002756b06aab409"],["app/services/activateTask.service.ts","38eb93078e4b70ae6beac5348de08585"],["app/services/activateUser.service.js","36a30c2bbd172e5fef03cdc143720679"],["app/services/activateUser.service.js.map","181f08f7323a9a0f86ae073547274efa"],["app/services/activateUser.service.ts","7534ade4ff464a4aaaa3d621cb9376a9"],["app/services/authGuard.service.js","4d33dfae39c5f37f4b25015888adea1f"],["app/services/authGuard.service.js.map","87debaad77fdaa4c3b21dc80a3cecb93"],["app/services/authGuard.service.ts","9cfa36217790dfd27bc14d15ac292f1c"],["app/services/breadcrumb.service.ts","fae260d05608638ad8d75a5abb135a7f"],["app/services/contact.service.js","ad2503902d03dba1ce616c0ddd60cde2"],["app/services/contact.service.js.map","a88efa2eedd84f95ba6f9cef389511c2"],["app/services/contact.service.ts","4c4e89d0bb2d3579408f0fea6a83ed3d"],["app/services/contextualComm.resolver.js.map","7d5aa6c7482608039e56e880d518fba8"],["app/services/contextualComm.service.js","d50f95624379e7f364604b674768f377"],["app/services/contextualComm.service.js.map","bf31521d65f43d85794ddc9e269db8a8"],["app/services/contextualComm.service.ts","5ab74a8910ae622f1546b12922a86242"],["app/services/contextualCommActivate.service.js.map","ca9873ab15f8732065221ce479c392fd"],["app/services/contextualCommData.resolver.js","f9e46e9daac361ae833ce25fee1b71c9"],["app/services/contextualCommData.resolver.js.map","d119b2fd08f5ca5475556b6fc3ad81e7"],["app/services/contextualCommData.resolver.ts","c8b3007cc86e752d127fe4dbfe5e8b0b"],["app/services/contextualCommData.service.js","c7e471bce71c084dfaa9fe339a04ae75"],["app/services/contextualCommData.service.js.map","3765cb1ee33cf9deeb49390359db1a5a"],["app/services/contextualCommData.service.ts","d6250d32e7a40bcf01df9db8d6effc94"],["app/services/contextualCommTrigger.service.js","26f7062a6a91da1e62668d1996233c77"],["app/services/contextualCommTrigger.service.js.map","56b3a1222493168f82cd17ef8c17889c"],["app/services/contextualCommTrigger.service.ts","7e45664cea9cdd1edd00c00d38ac0b60"],["app/services/modules.d.ts","c608689f36af712471eefd395233c3d4"],["app/services/notification.service.js","3eac7b13ff75f94f1c36baa157a2cfd5"],["app/services/notification.service.js.map","9f44872d6ae6fb5d45044ed5e575c528"],["app/services/notification.service.ts","fd4bfc4e4d8f86e224155635452377a4"],["app/services/rethink/chat.service.js","4522b69c4439e648aebc6849379d4092"],["app/services/rethink/chat.service.js.map","ad0fd21c980ac1f15be33f4c6236966a"],["app/services/rethink/chat.service.ts","3015d2c1aece0e26024ed28a02b87e32"],["app/services/rethink/connector.service.js","1a6138d40a94550dc4675b81ed74b0e9"],["app/services/rethink/connector.service.js.map","f3318f12ae72d06ddfb0e23bf0fce788"],["app/services/rethink/connector.service.ts","02d12f5cfc34793c82225835b7e133f2"],["app/services/rethink/context.service.js.map","9b4724773620d61004be93e53fc5a536"],["app/services/rethink/rethink.service.js","3767689eede97cc5b884e01f72d7c6eb"],["app/services/rethink/rethink.service.js.map","5188b17082e1980cd1f6c360823e22b8"],["app/services/rethink/rethink.service.ts","2ff24a16675e4abb403f9adf687b2d02"],["app/services/rethink/userAvailability.service.js","af159cef0b83ff91a90ea96f5f90147e"],["app/services/rethink/userAvailability.service.js.map","8439072398a1132b608767dcf2adce11"],["app/services/rethink/userAvailability.service.ts","dc3337bd32a2be540808a777f8b092a4"],["app/services/router.service.js.map","461f87cfe4e4c1d08a28fd36f4d40c9f"],["app/services/routing.service.ts","53b894747d3a04effc9bbc04bef63709"],["app/services/services.js","274335d8c7890449d61e09dbeb367936"],["app/services/services.js.map","5306ecff03c29c82160716aa4de2c2d3"],["app/services/services.ts","80bf0aeed058e16ae1060e66cb0e2b99"],["app/services/storage.service.js","35eacc12cf08bd9f032dbf4e3abb3cf6"],["app/services/storage.service.js.map","f7354c37ba8f0d104de443a7486de5fd"],["app/services/storage.service.ts","f4b60915ceba3ff9b07e97f0852fb54b"],["app/services/task.activate.js.map","b93c69be726f45b44ca765a00aa9d495"],["app/services/triggerAction.service.js","1866e8c16731ee79e18a8f71cce63e8b"],["app/services/triggerAction.service.js.map","da5b081963a4809ee2732aaf810c3297"],["app/services/triggerAction.service.ts","3cd4423670005a15219a04734eaec332"],["app/services/user.activate.js.map","e232b6b7b85fe70402957992b8fb405a"],["app/services/user.resolver.js","de6f0b3085d7006c2f7ab793c53a6207"],["app/services/user.resolver.js.map","b06f55b7be2b6c2670189cd6859dd241"],["app/services/user.resolver.ts","3b1d9534dd97b7f544e34987bef1f36d"],["app/shared/context.directive.js.map","b5d859ad57f4d5d899a2c890df35dc7c"],["app/shared/context.validator.js.map","900eea4a816ea61c0200f5af1bd19046"],["app/shared/contextName.directive.js.map","a17e02580dfa4af4230cf6f6519750f9"],["app/shared/contextName.validator.js.map","41d39eba94928c5d764e0c2f623f8bab"],["app/shared/directive.module.ts","4308e4025f37da93aa0fd3682b77b829"],["app/shared/fullscreen.directive.ts","fbb69870ae51ed180f886113c6fd2c66"],["app/shared/rethink.directive.js","ca4f2040610315d1fa436da74287d056"],["app/shared/rethink.directive.js.map","8eff606af364677726b104e9dbe48736"],["app/shared/rethink.directive.ts","275111f0e7de9c7263032254eeb4e101"],["app/shared/rethink.validator.js","b09e44dcbe1968fca7258f0ccdebc2f5"],["app/shared/rethink.validator.js.map","7cd6c3fcd3a35b5e10f8852d114ff1d4"],["app/shared/rethink.validator.ts","cb893ea08eb3e8bdef573398c462294d"],["app/shared/screen.directive.ts","2abad0b51a29f9e280265476ec404ab8"],["app/shared/sidebar.directive.ts","f19b474ea6fc78ba95fd5981a5364c92"],["app/utils/CustomURLSerializer.js","284599843cde68b4a6edfd371f34896f"],["app/utils/CustomURLSerializer.js.map","7c32a3eab2a61a958bc65f0fd682df86"],["app/utils/CustomURLSerializer.ts","95573d23f2720d1fb501630184d0df6c"],["app/utils/CustomUtils.js","4ffb17e2f0707cfd09144ee2b0d55935"],["app/utils/CustomUtils.js.map","9ebd7a0018e57c58ffaf0aa311306bb1"],["app/utils/CustomUtils.ts","4e9e539d14c56ccf5d77098db29c533d"],["app/utils/utils.js","b2fb460aab2f62a1547b45428548d993"],["app/utils/utils.js.map","5ffc0a0a442b9334e65eab165ffb5ee2"],["app/utils/utils.ts","d9d38f59845b9cb64ab0606869a082d0"],["app/views/activityView/activity-view.component.html","ae2505f1a31afac5af884e270f2e907d"],["app/views/activityView/activity-view.component.js","5faaae32e48cc4e72393353f8a02de6a"],["app/views/activityView/activity-view.component.js.map","0dfe22a80a3c08e936e5e659658b72ad"],["app/views/activityView/activity-view.component.ts","24d62662a348498bc77c5c6844bb08b2"],["app/views/activityView/activity.component.js.map","af298eeeb8614a77161075408f11a83a"],["app/views/breadcrumb/breadcrumb.component.html","8b89cf5713400b3f78e6c719f300ad81"],["app/views/breadcrumb/breadcrumb.component.js","d3cf8ee294d4c0da5a526343e517cc6d"],["app/views/breadcrumb/breadcrumb.component.js.map","15f0c2bf74e4af35e12d4606ab1cb3d5"],["app/views/breadcrumb/breadcrumb.component.ts","48d86f8e0953f1ae8bd0ef1f5721f22f"],["app/views/compositeContextualComm/CompositeContextualComm.js","74643584978b2573a1a5cb92dab5a0f3"],["app/views/compositeContextualComm/CompositeContextualComm.js.map","7c77e350cce2d7defc81cc58cf6a1f9c"],["app/views/compositeContextualComm/CompositeContextualComm.ts","d41d8cd98f00b204e9800998ecf8427e"],["app/views/contextualComm/add-contextualComm.component.js.map","ae8ad3d71ededa6409f035e07a702f26"],["app/views/contextualComm/contextualComm.component.html","734642af8a5469b6464c543c3bcdbffb"],["app/views/contextualComm/contextualComm.component.js","40128c435b934f084663332a019671ff"],["app/views/contextualComm/contextualComm.component.js.map","6e4d609052b8b0654501923862dd5723"],["app/views/contextualComm/contextualComm.component.ts","180ee8405f930d80ff672abaa0479c52"],["app/views/contextualComm/contextualComm.module.js","8063773c5c0f9c6f171a833592548f50"],["app/views/contextualComm/contextualComm.module.js.map","1bad20c61f5dc9206292ccf257b36129"],["app/views/contextualComm/contextualComm.module.ts","d8d12962a4e5300edf3152af5928a5ec"],["app/views/contextualComm/contextualComm.routing.js","8ca2f3dbadb0c3bab5ba49c309bb9087"],["app/views/contextualComm/contextualComm.routing.js.map","a165db24d8081ca0655049bb9c6996e4"],["app/views/contextualComm/contextualComm.routing.ts","f9fd9d8975f74dee3409027e02d77974"],["app/views/contextualCommActivity/contextualCommActivity.component.html","50f3e3777e8c624ef37455350dfe9eb4"],["app/views/contextualCommActivity/contextualCommActivity.component.js","c31d1bde7ff2ea560f7ab79bc88b976e"],["app/views/contextualCommActivity/contextualCommActivity.component.js.map","15b2693c05a10a31c9b38ab959c2da3f"],["app/views/contextualCommActivity/contextualCommActivity.component.ts","74f12a24fdd5914eb1fece15570e9174"],["app/views/contextualCommMenu/add-contextualComm.component.css","d41d8cd98f00b204e9800998ecf8427e"],["app/views/contextualCommMenu/add-contextualComm.component.html","eee996611be7c9af287eb2fd24476a58"],["app/views/contextualCommMenu/add-contextualComm.component.js","b17c5bd6d811acd1ab3f1183c9f637b9"],["app/views/contextualCommMenu/add-contextualComm.component.js.map","4e091547c66b02efc71257372fd400b1"],["app/views/contextualCommMenu/add-contextualComm.component.ts","eb1888fed0020c72d27c6ae9b7a67138"],["app/views/contextualCommMenu/contextMenu.component.html","bc3a27b3661fe18d8454d8c54b439bd4"],["app/views/contextualCommMenu/contextMenu.component.js","e49e46ff8e2ab681392cbb2ef87f2c7b"],["app/views/contextualCommMenu/contextMenu.component.js.map","a2e9d5ac3d050e27b1b982b520497bf9"],["app/views/contextualCommMenu/contextMenu.component.ts","9776f7f2d2954b84cb539a185e526607"],["app/views/contextualCommUsers/add-user.component.html","679a62e07bca6e8c0fe4e09676dfb380"],["app/views/contextualCommUsers/add-user.component.js","913ecd82e5fe555ab1f666ff5244005c"],["app/views/contextualCommUsers/add-user.component.js.map","c6bea6dab1ae982cdef0d8a9a2b4be46"],["app/views/contextualCommUsers/add-user.component.ts","3676634e6dc6d0e7f8b4ce206e3ec4ea"],["app/views/contextualCommUsers/contextualCommUsers.component.html","7aefd9eb962b4c16e769a787d79c0fbb"],["app/views/contextualCommUsers/contextualCommUsers.component.js","98ee2556fa0f24c5d449c5402bebc372"],["app/views/contextualCommUsers/contextualCommUsers.component.js.map","3114f8e42ce3d42cf231bbe03eb84b69"],["app/views/contextualCommUsers/contextualCommUsers.component.ts","ef05c4989f8676d8ca32d2df3d07853a"],["app/views/home/home.component.html","9560f43748248fd3bef4b449216528be"],["app/views/home/home.component.js","82d890831708b09da44c46c03b2866fa"],["app/views/home/home.component.js.map","642665db743b1289ba4df0884a49f025"],["app/views/home/home.component.ts","23623224430de0daf1118fb679930ac7"],["app/views/home/loader.component.js.map","28517ce6b67c953bb6ea31d7f588853c"],["app/views/loading/loading.component.html","de9dd7fae442c2f01cbd04ca049d3cee"],["app/views/loading/loading.component.scss","76724d876a811344c3028064f38df8a5"],["app/views/loading/loading.component.ts","3838cc2a2eec1be9bae354cb63cdc0cc"],["app/views/userView/add-user.component.js.map","2df31e7b5fdbfebef841d91761f3990a"],["app/views/userView/add.user.component.js.map","acc8c1e30e91a3fbd1c21d82b595809a"],["app/views/userView/contact-box.component.html","9b0d5c905268128c5fd1f2f6543407a5"],["app/views/userView/contact-box.component.js","c85779d9ed0f83f684421ce6ec4cf1b3"],["app/views/userView/contact-box.component.ts","13340550a07d6452ffb690a396a1bb82"],["app/views/userView/user-view.component.html","e12e19d3d601b2e1475d657088fa54ee"],["app/views/userView/user-view.component.js","d8188dfa98d3fce76b30ee5b059c382f"],["app/views/userView/user-view.component.js.map","0c8a4460493eb6c6155a7b0fe64c1def"],["app/views/userView/user-view.component.ts","0f51fab5151f324c77d533c59a405c56"],["app/views/userView/user.component.js.map","3349e22ab7eb30f62574bc785ec48a54"],["app/views/userView/user.routing.js.map","ad5120039554ec0910f9037e3bcd1e9a"],["assets/fonts/Roboto/roboto-black-webfont.eot","77b68e38cb825dc8b7323bd6d60688f6"],["assets/fonts/Roboto/roboto-black-webfont.ttf","a23dc188410d8a27a451148ce1d3a9c7"],["assets/fonts/Roboto/roboto-black-webfont.woff","342e064876ef75f96224d8b373dc005f"],["assets/fonts/Roboto/roboto-black-webfont.woff2","5e8f6d49d9703dc99dcd50a4c5be7079"],["assets/fonts/Roboto/roboto-blackitalic-webfont.eot","8b708430228367dce2052351b6f8dc19"],["assets/fonts/Roboto/roboto-blackitalic-webfont.ttf","626feb4829b955b3b749068092043c1e"],["assets/fonts/Roboto/roboto-blackitalic-webfont.woff","1bab7ebe3eaf5d00ffcb5511733a7740"],["assets/fonts/Roboto/roboto-blackitalic-webfont.woff2","b3d033a81807c205a3281c519f0e35ab"],["assets/fonts/Roboto/roboto-bold-webfont.eot","b71235358cfd791e6ca558e23a6c2d16"],["assets/fonts/Roboto/roboto-bold-webfont.ttf","0388f93692a077603da1f5a6583c9ff9"],["assets/fonts/Roboto/roboto-bold-webfont.woff","643a3a78a98ac36e76ebaed1caa4315c"],["assets/fonts/Roboto/roboto-bold-webfont.woff2","33b2eddbba28a8756521bbf00e676081"],["assets/fonts/Roboto/roboto-bolditalic-webfont.eot","7a22a495f89254f7e63832215602ad8e"],["assets/fonts/Roboto/roboto-bolditalic-webfont.ttf","2ee6127f0bf6fe5f9b8b167cb3266c4b"],["assets/fonts/Roboto/roboto-bolditalic-webfont.woff","baf2245b211ae4311fc12da52cc45aa1"],["assets/fonts/Roboto/roboto-bolditalic-webfont.woff2","fb9d1306e54413980366d078d85570c6"],["assets/fonts/Roboto/roboto-italic-webfont.eot","7196747226877ac8795b4c6dd38ffc6d"],["assets/fonts/Roboto/roboto-italic-webfont.ttf","87873f61be22a0cf03cedbddb129b613"],["assets/fonts/Roboto/roboto-italic-webfont.woff","dc8f054da6b63bdaf770cef530344ec5"],["assets/fonts/Roboto/roboto-italic-webfont.woff2","066fc2429e77a28ddf6b2418cc14233b"],["assets/fonts/Roboto/roboto-light-webfont.eot","d638934c360fb6ea67ee8de5b4b1dc1d"],["assets/fonts/Roboto/roboto-light-webfont.ttf","0b2bbb31d226cd30550e94fe35103620"],["assets/fonts/Roboto/roboto-light-webfont.woff","dce46a7b1c21b0aafbf7db1df522c255"],["assets/fonts/Roboto/roboto-light-webfont.woff2","8449424c925533f54e63c8b9bac20548"],["assets/fonts/Roboto/roboto-lightitalic-webfont.eot","7031650a83975e6b148c801f5aea866c"],["assets/fonts/Roboto/roboto-lightitalic-webfont.ttf","c74a9671c25375c3185d36f49bb64496"],["assets/fonts/Roboto/roboto-lightitalic-webfont.woff","6c4024c156777acc28e9d11546fecdfd"],["assets/fonts/Roboto/roboto-lightitalic-webfont.woff2","cf7dc6f21c286ca148d89e9851c6311b"],["assets/fonts/Roboto/roboto-medium-webfont.eot","1f701e2d8c2eaab17833838a1e089683"],["assets/fonts/Roboto/roboto-medium-webfont.ttf","8fe095957ea54551d2a75db2986dc659"],["assets/fonts/Roboto/roboto-medium-webfont.woff","c862a5f6c509b79c7936ea9c3335ba0a"],["assets/fonts/Roboto/roboto-medium-webfont.woff2","874990a183b534096e49882769856578"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.eot","8af744bf56f5c48e538e4c5eaae35141"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.ttf","3a7bcabb4d7b73253a9bf78c532e9ac4"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.woff","82f146c14bc68df43a22188b692e99af"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.woff2","6d30b42d8837e31eed0ce89ac399c71e"],["assets/fonts/Roboto/roboto-regular-webfont.eot","32bd25c73c6510815ba5e9781e5e9901"],["assets/fonts/Roboto/roboto-regular-webfont.ttf","709aa584b2068885bac8a254b279ad6d"],["assets/fonts/Roboto/roboto-regular-webfont.woff","c9e9624be7d22f468e58a5ef6f1fdb87"],["assets/fonts/Roboto/roboto-regular-webfont.woff2","6a465df40ae557eb958e1b76833af420"],["assets/fonts/Roboto/roboto-thin-webfont.eot","75e10f49808eecaba00aad926568f62e"],["assets/fonts/Roboto/roboto-thin-webfont.ttf","4a23a9f6f38748c3eb3024bc14803c62"],["assets/fonts/Roboto/roboto-thin-webfont.woff","66017e9704e6419e2a84eff67715a7d1"],["assets/fonts/Roboto/roboto-thin-webfont.woff2","dca8233a4c1fd6eada0d37d4069e0831"],["assets/fonts/Roboto/roboto-thinitalic-webfont.eot","68b4a7e47eeb3e9aa2a386644318cd2a"],["assets/fonts/Roboto/roboto-thinitalic-webfont.ttf","d9fae6e12b9bcee72697d06724690fe1"],["assets/fonts/Roboto/roboto-thinitalic-webfont.woff","9f9deecbdf37b6c34687cb7e766878b5"],["assets/fonts/Roboto/roboto-thinitalic-webfont.woff2","466bfc723c5518aa52ab8f92d6227bb8"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.eot","71e01261e63f1ee61d0cbfa5798d683f"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.ttf","70c81adebbb86ebad4b9c91700327eb1"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.woff","c43c0c7bf0f807c1e075eb1d64c381d0"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.eot","9c831d8d1346e938a300a418e47850f4"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.ttf","a8ee5d3c2e161aa567e7b55e0f183431"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.woff","1bf0d8ec3761237aa52cc9d44dbd6841"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.eot","f7288ae3011a9114d50c58c97aeabf1e"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.ttf","cc2b8ee77b5799dc1156833e9bde6f20"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.woff","e659db108d6ff1897a1c94d8425d1cb6"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.eot","ed2b3aafc1fef9827fc1b6dd9a33972c"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.ttf","bb680481a95129ad5f1b03a0ae64c693"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.woff","90a2054fd4e90419ebd85adbae02cacf"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.eot","b2009451694ad3d725efb16138942cf8"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.ttf","69bcb61c5a40e6f0db99558fb4992d78"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.woff","4b7b2710d7d9cebac3d956714e784c84"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.eot","99a4347d13789131e16e8bb86275a652"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.ttf","e570ecf2ac11264cbdebf2e367f2a74b"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.woff","ae2eabb2987017d2af57e62d5d8cd940"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.eot","a34d0665264772c512ca4248555f4b7b"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.ttf","60c929240884028a342553d5a9091801"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.woff","295a3a5702da27585ef94102376ef58c"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.eot","ace3c69651fc4fb71f0f70283161c14b"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.ttf","000b2c88694421e91964aef304ca155a"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.woff","9291599e075251bc0bd0601cdf09bcc5"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.eot","9c9acb2af03c4f5adfa15e0371298de5"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.ttf","1d07d47d3b879dfa46c57b04441b502a"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.woff","017d2e126c9a1a611a6b4d5124fc2652"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.eot","8773b361f967fd5f71ee835a56189f01"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.ttf","7c17c5558a74bd1ff0571da291800243"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.woff","0c76664e982a82018a5dfe8261385ea8"],["assets/fonts/font-awesome/HELP-US-OUT.txt","a1e5be58e81e919ba2e579cd1c65283e"],["assets/fonts/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["assets/fonts/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["assets/fonts/font-awesome/fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["assets/fonts/font-awesome/less/animated.less","08baef05e05301cabc91599a54921081"],["assets/fonts/font-awesome/less/bordered-pulled.less","898f90e40876883214bbd121b0c20e9f"],["assets/fonts/font-awesome/less/core.less","fb4efe4ae63737706875bbbfc7b7e9af"],["assets/fonts/font-awesome/less/fixed-width.less","5e07ec001f8d21bd279c12ee542813f7"],["assets/fonts/font-awesome/less/font-awesome.less","15cb7faa02437c2f9719351c157fe7e7"],["assets/fonts/font-awesome/less/icons.less","bf95b901c36b646ff457379bdcda94b7"],["assets/fonts/font-awesome/less/larger.less","8cb65280c0f889daf72626c21a7c8628"],["assets/fonts/font-awesome/less/list.less","975571323cf880a4a30601998236b027"],["assets/fonts/font-awesome/less/mixins.less","fbb1f2f1ab96ba020c7f14208aac72b8"],["assets/fonts/font-awesome/less/path.less","a8c41460c42a4fe9e98550f00c8b3f19"],["assets/fonts/font-awesome/less/rotated-flipped.less","a8476cdc50c264abd11ff59d6a9dd025"],["assets/fonts/font-awesome/less/screen-reader.less","0f881617264587bef0df6ce92253ecea"],["assets/fonts/font-awesome/less/stacked.less","518e2b2d263982d2caa1e6514b4b4eac"],["assets/fonts/font-awesome/less/variables.less","be3f6eed38aa909483e1bd9ee0876e80"],["assets/fonts/font-awesome/scss/_animated.scss","39ff4f359a7b81d6585075715f41e5dc"],["assets/fonts/font-awesome/scss/_bordered-pulled.scss","4cad0df17bf40327feae33fa9a6c6ba2"],["assets/fonts/font-awesome/scss/_core.scss","ef059a98cf9de6ca5b77ee6850771cf0"],["assets/fonts/font-awesome/scss/_fixed-width.scss","9277ab6964a434d499873687b00be906"],["assets/fonts/font-awesome/scss/_icons.scss","de9fa842ad0b619a95ac4f42ac6ba930"],["assets/fonts/font-awesome/scss/_larger.scss","e95931566f6fc6ad5685c4fa9802e206"],["assets/fonts/font-awesome/scss/_list.scss","7107e80b053928271d5fcf422dc29490"],["assets/fonts/font-awesome/scss/_mixins.scss","aa2b8f32b403733713d8885f14ab86cc"],["assets/fonts/font-awesome/scss/_path.scss","ab5a9e8388563e097b5ce835601f01d2"],["assets/fonts/font-awesome/scss/_rotated-flipped.scss","9f5d4bc6fadea89328d2aac26574a9d8"],["assets/fonts/font-awesome/scss/_screen-reader.scss","8907bd7dbf4799e8120bda5568d76fea"],["assets/fonts/font-awesome/scss/_stacked.scss","5594237226aedfbca2fa1c7f4604c214"],["assets/fonts/font-awesome/scss/_variables.scss","dc5261f37a8a01feeb52a746d16c0459"],["assets/fonts/font-awesome/scss/font-awesome.scss","8c015559216d1654630a839b61c6b83d"],["assets/img/asc-logo-small.png","07e253bfa23217ef7d5fd51c0eed010f"],["assets/img/asc-logo.png","e2686a27408c1ffd0489e14c7ffe0e3c"],["assets/img/audio-bk.png","617a3b4d92068fe16dc5c7ec11072b01"],["assets/img/avatar-1.jpg","d8861194de77f111f8dc476083233eca"],["assets/img/avatar-2.jpg","f1a58a03f56bee5f67baf73ca6888da5"],["assets/img/avatar-3.jpg","2a11ea677496f31bc00fdcb9fbe598e2"],["assets/img/avatar-4.jpg","02ff3ba5561ee0e3eccc381693123e4f"],["assets/img/avatar.jpg","5e3218eb8aafb0b58249d9959a92e5f9"],["assets/img/fileteste.jpg","787ca3db891e777226f7d5ac93d2d515"],["assets/img/kpi-example.jpg","435308334b802553d7dd1208954a4489"],["assets/img/launcher-icon-1x.png","085ab2da2c3adf7abbe865a6d93ef90f"],["assets/img/launcher-icon-2x.png","34370af922853be39f25030aa0116a3d"],["assets/img/launcher-icon-3x.png","a5aae03941f4e7f879901057c8587125"],["assets/img/launcher-icon-4x.png","0bcc447440f1145785c791f37705cc0e"],["assets/img/rethinklogo2.png","45370e26d0c4f461c933ba6e160dece5"],["assets/img/ripple.css","078219b011af8fb7266b215a127195d6"],["assets/img/ripple.svg","0a8875c79350a0a31947424b84c2eafc"],["assets/img/video-bk.jpg","70d345bdf2b82404e63c6b67c364d2d3"],["assets/sounds/classic-ringer.mp3","8a757ee0bd127ec60685c887a7683b00"],["assets/sounds/hurry.mp3","ab899e23f587bb1f869ce8744bdf5255"],["assets/sounds/shy.mp3","ffb1eb322f5edbafe869265f1b0dba96"],["assets/sounds/solemn.mp3","faeb61d7cbc2f635e5c73b0794d07ebe"],["assets/sounds/successful.mp3","b1043fc69b1d5f40004ccf15d6cc2f87"],["assets/style/_activity-list.scss","6b214e9fe21a326613be1287ccf6c15c"],["assets/style/_breadcrumb.scss","4ba9ee92bab002a6a55aab02d79c4ca1"],["assets/style/_chat-view.scss","ad01639e084122abeb6b8a799c3ee19f"],["assets/style/_common.scss","64c591e27114fe3b02d9da7a7510888a"],["assets/style/_context-menu.scss","ea05a62fe2046ea53cdca3600b8781c5"],["assets/style/_custom.scss","f692e328f448082fa8882d1801b15960"],["assets/style/_forms.scss","93db1e185fc95bb1e2db655d11fe2a9f"],["assets/style/_header.scss","eeeb7536c65d0c695d681359b23df0db"],["assets/style/_modals.scss","4b9b0282c47ede05a9c8abf88cc28176"],["assets/style/_nested-list.scss","0e93d612f428ab4770d3bd85b5506f6d"],["assets/style/_new-rethink.scss","a670e91a6e666daa045b63fefa458c0a"],["assets/style/_rethink.scss","382dd38c4d51e7247ec8cdc56cb2f620"],["assets/style/_search.scss","27f66c70b9df75335a384a26fee907d2"],["assets/style/_sidebar.scss","49cf73c14bb2c5d5c809f4bd6a58e223"],["assets/style/_user-identity.scss","4d571c2b8a5e9a725b321d2cdc7407f6"],["assets/style/_user-view.scss","3ee6773c074718d2a4c2f5f6ce481f48"],["assets/style/ink.min.css","4662c795276a29b6821d7472fd6a75a8"],["assets/style/mixins/_transform.scss","c278adddb019cb38bcf92db0c9678c17"],["assets/style/responsive.css","c3b9f52b88df7be7a4986a17b77c01d7"],["audio-bk.617a3b4d92068fe16dc5.png","617a3b4d92068fe16dc5c7ec11072b01"],["favicon.ico","b176cfeb835b00d41f32b9fc75d046cc"],["fontawesome-webfont.674f50d287a8c48dc19b.eot","674f50d287a8c48dc19ba404d20fe713"],["fontawesome-webfont.912ec66d7572ff821749.svg","912ec66d7572ff821749319396470bde"],["fontawesome-webfont.af7ae505a9eed503f8b8.woff2","af7ae505a9eed503f8b8e6982036873e"],["fontawesome-webfont.b06871f281fee6b241d6.ttf","b06871f281fee6b241d60582ae9369b9"],["fontawesome-webfont.fee66e712a8a08eef580.woff","fee66e712a8a08eef5805a46892932ad"],["index.html","67c27da2262901133dfdab818acff52e"],["inline.bundle.js","9ed7a5f89f7497fbafdbf0ff550d408d"],["inline.bundle.js.map","595607e6dd1c668882517fac4c1d7d40"],["main.bundle.js","037e9f6e6f4f91de957efefbe3b2adff"],["main.bundle.js.map","6d12037ca3e3059e3a80b401240a6cab"],["main.js","511b6dcddddea8f4084412cc3069e470"],["manifest.json","0e15d4a18e81c1ca74a3e84b05d99d62"],["polyfills.bundle.js","28d71108825db84ca8ce790a4c4fcb22"],["polyfills.bundle.js.map","6acecc98eee6dc892008d6dc9ca73d67"],["scripts.bundle.js","21c305063f2e885e77eed60f2face5fd"],["scripts.bundle.js.map","e6c029d35c283a33cd7b32c53c0dca10"],["styles.bundle.js","58cee4c29101fb38064b672d950fd3ee"],["styles.bundle.js.map","7f419982d0626833ed9855cc415b6241"],["vendor.bundle.js","b49355565c3815edf15c4390bc3abb60"],["vendor.bundle.js.map","83c5e688cd2dd18936c591f46f4922ef"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

function firstWindowClient() {
  return clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(function(windowClients) {
    return windowClients.length ? windowClients[0] : Promise.reject("No clients");
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = './index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] - On notification click: ', event, clients);

  var notification = event.notification;
  var promise = Promise.resolve();

  event.notification.close();

  if (event.action === 'action.accept' || event.action === 'action.reject') {
    console.log('[Service Worker] - On action click: ', event.action);

    var data = notification.data;

    firstWindowClient().then(function(client) {

      if (data.hasOwnProperty('actions')) {

        var result = data.actions.filter(function(action) {
          return action.action === event.action;
        })[0];

        var message = {
          notification: {
            actions: notification.actions,
            title: notification.title,
            body: notification.body,
            data: notification.data,
            tag: notification.tag,
          },
          event: event.action,
          action: result
        }

        client.postMessage(message);
      }

    });

  } else {

    promise = promise.then(function() { return firstWindowClient(); })
                     .then(function(client) { return client.focus(); });
  }

  event.waitUntil(promise);

});


self.addEventListener('notificationclose', function(event) {
  var notification = event.notification;
  var options = notification.data.options;

  firstWindowClient().then(function(client) {

    var message = {
      notification: {
        actions: notification.actions,
        title: notification.title,
        body: notification.body,
        data: notification.data,
        tag: notification.tag,
      },
      event: 'close',
      action: 'close'
    }

    client.postMessage(message);
  });
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\//, toolbox.fastest, {});




