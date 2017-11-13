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

var precacheConfig = [["app/app-routing.module.js","345ae45adb62481fcfbcd0443d5b6915"],["app/app.component.html","0998b2c1e3ced988a26b787f105be05d"],["app/app.component.js","37b665ef9e76aa6e3f3fd6d690797a94"],["app/app.module.js","9207aad15623241dcb9ee9cb3b5ae502"],["app/components/fileshare/filesharelist.component.html","c0639b8d4243303ff5f6bb3fac90e5ba"],["app/components/modal/components/mediaModal.component.html","340a0bf6a4859bf6b5a75ff4cd9b6e04"],["app/components/mySelf/my-self.component.html","fc82129a18bd0e230238817e700fd2aa"],["app/components/mySelf/my-self.component.js","ec51f3b0473e6e176f27a3c095a8175b"],["app/components/notification/native-notifications.module.js","72acccda14d0cce683b13c23cc1ecabf"],["app/components/notification/native-notifications/interfaces/native-notification.type.js","2397b918bcc36e9a1542339109e8d893"],["app/components/notification/native-notifications/services/native-notifications.service.js","dd736f5304081b1feb622eea8a96c608"],["app/components/notification/notifications.module.js","3a6df43cda9d2a3461bb331ddaabe4ce"],["app/components/notification/notifications/components/notification.component.css","47e0095585c4996ff39e23c190bc5068"],["app/components/notification/notifications/components/notification.component.html","a32e035c3044625430a2de2e57e6fb80"],["app/components/notification/notifications/components/notification.component.js","0d91233181fcfcacedb37131672fe33e"],["app/components/notification/notifications/components/notifications.component.js","400983341adea072802ea6e868fa0278"],["app/components/notification/notifications/interfaces/icons.js","d516bb1c47629c167d2e2444d875b646"],["app/components/notification/notifications/interfaces/notification-event.type.js","f324b586f5258e574fb9875350f61e0b"],["app/components/notification/notifications/interfaces/notification.action-event.js","2f093547820e1dae95e8b8183135f79d"],["app/components/notification/notifications/interfaces/notification.type.js","db81fb056b61c7b666abf39dedd4a2da"],["app/components/notification/notifications/interfaces/options.type.js","2b70c12b8b7fdfafc3f826efe187619a"],["app/components/notification/notifications/pipes/max.pipe.js","dabc92e34e45bd5c26e1210c701e56e7"],["app/components/notification/notifications/services/notifications.service.js","a16367f6fa11d0737af8412645c05cae"],["app/components/rethink/communication/chatCommunication.component.html","05e62ba74164ba543a8d982de3e7ec4a"],["app/components/rethink/communication/chatCommunication.component.js","5b2a0e1b97d3c70f06df4e2de03db1a0"],["app/components/rethink/communication/mediaCommunication.component.html","9e0f1645dbb81b31e1087055da5eed2c"],["app/components/rethink/communication/mediaCommunication.component.js","072e233fb891f6b261174e405041a492"],["app/components/rethink/context/Context.js","03f42261a5f41153619b1ceec133593d"],["app/components/rethink/hypertyResource/audio/audio.component.js","b7d5515b7f07619a9dd2acb9669ac44a"],["app/components/rethink/hypertyResource/chat/chatEvent.component.html","dcf4d19e7a7ac088f03b50904864539f"],["app/components/rethink/hypertyResource/chat/chatEvent.component.js","e3d9fd5f3157066708ce83ed0ffe436a"],["app/components/rethink/hypertyResource/file/fileEvent.component.html","0e7fb2d62cc6c85e19235dafc764dca6"],["app/components/rethink/hypertyResource/file/fileEvent.component.js","daa5de54d10dcd5ef3fff8f029530e89"],["app/components/rethink/hypertyResource/resource/resourceEvent.component.html","2857a3a4bd805624d45e34b923ce8718"],["app/components/rethink/hypertyResource/video/video.component.js","8f41b0172ccd2446937f0b7ebe212ece"],["app/components/rethink/userIdentity/userIdentity.component.html","20fb64a3156cd0a53ae056e52d16cce4"],["app/components/rethink/userIdentity/userIdentity.component.js","8b3f9d8c87b7beda357be36a7327d130"],["app/config.js","16200ad8fcb695f66ce7dc6ae63caec9"],["app/models/app.models.js","cfb23af5172839f525e90dcd58b58370"],["app/models/application/Context.js","48ae4cedc00d61b28d05b4dd013588fa"],["app/models/application/ContextualComm.js","774416d78e366155c113e491371c8f36"],["app/models/application/ContextualCommTrigger.js","225ce6b7c9dc9fe7af9b798fa53b2c9c"],["app/models/models.js","859414fbd0ef9572f9eac7fa0e56bd67"],["app/models/rethink/Communication.js","1cbc3b6f1f01d93993b297d8957590f9"],["app/models/rethink/Connection.js","9f7794b9b44ee2a3f1a93ab71f291598"],["app/models/rethink/Context.js","d86c225a8df05bb5daf2e89436e8c9c8"],["app/models/rethink/HypertyResource.js","fc8cf3a60662a71f2a809e164a25a089"],["app/models/rethink/UserIdentity.js","40e963755a17521c91cd87c6e0182995"],["app/pipes/pipes.js","5b8b74f5b7f8eeca993a31bd27a35208"],["app/pipes/timeElapsedPipe.js","3bb727b5c28caf6eefa3967675a7d4c4"],["app/services/activateTask.service.js","4efe5178e2ecbf123a3d79198fca95dc"],["app/services/activateUser.service.js","36a30c2bbd172e5fef03cdc143720679"],["app/services/authGuard.service.js","4d33dfae39c5f37f4b25015888adea1f"],["app/services/contact.service.js","ad2503902d03dba1ce616c0ddd60cde2"],["app/services/contextualComm.service.js","d50f95624379e7f364604b674768f377"],["app/services/contextualCommData.resolver.js","f9e46e9daac361ae833ce25fee1b71c9"],["app/services/contextualCommData.service.js","c7e471bce71c084dfaa9fe339a04ae75"],["app/services/contextualCommTrigger.service.js","26f7062a6a91da1e62668d1996233c77"],["app/services/notification.service.js","3eac7b13ff75f94f1c36baa157a2cfd5"],["app/services/rethink/chat.service.js","4522b69c4439e648aebc6849379d4092"],["app/services/rethink/connector.service.js","1a6138d40a94550dc4675b81ed74b0e9"],["app/services/rethink/rethink.service.js","3767689eede97cc5b884e01f72d7c6eb"],["app/services/rethink/userAvailability.service.js","af159cef0b83ff91a90ea96f5f90147e"],["app/services/services.js","274335d8c7890449d61e09dbeb367936"],["app/services/storage.service.js","35eacc12cf08bd9f032dbf4e3abb3cf6"],["app/services/triggerAction.service.js","1866e8c16731ee79e18a8f71cce63e8b"],["app/services/user.resolver.js","de6f0b3085d7006c2f7ab793c53a6207"],["app/shared/rethink.directive.js","ca4f2040610315d1fa436da74287d056"],["app/shared/rethink.validator.js","b09e44dcbe1968fca7258f0ccdebc2f5"],["app/utils/CustomURLSerializer.js","284599843cde68b4a6edfd371f34896f"],["app/utils/CustomUtils.js","4ffb17e2f0707cfd09144ee2b0d55935"],["app/utils/utils.js","b2fb460aab2f62a1547b45428548d993"],["app/views/activityView/activity-view.component.html","402c4dab8ca7cd0cb63f15db5c36ba0c"],["app/views/activityView/activity-view.component.js","5faaae32e48cc4e72393353f8a02de6a"],["app/views/breadcrumb/breadcrumb.component.html","24690d307418c3ec26f5809c7b58274a"],["app/views/breadcrumb/breadcrumb.component.js","d3cf8ee294d4c0da5a526343e517cc6d"],["app/views/compositeContextualComm/CompositeContextualComm.js","74643584978b2573a1a5cb92dab5a0f3"],["app/views/contextualComm/contextualComm.component.html","7b6555be0cc9f35937afa9d4243a5a3b"],["app/views/contextualComm/contextualComm.component.js","40128c435b934f084663332a019671ff"],["app/views/contextualComm/contextualComm.module.js","8063773c5c0f9c6f171a833592548f50"],["app/views/contextualComm/contextualComm.routing.js","8ca2f3dbadb0c3bab5ba49c309bb9087"],["app/views/contextualCommActivity/contextualCommActivity.component.html","62992e7acbe06fdee799058dc00c8d38"],["app/views/contextualCommActivity/contextualCommActivity.component.js","c31d1bde7ff2ea560f7ab79bc88b976e"],["app/views/contextualCommMenu/add-contextualComm.component.html","50c73eccd984bc9b6b4713ab5fee824b"],["app/views/contextualCommMenu/add-contextualComm.component.js","b17c5bd6d811acd1ab3f1183c9f637b9"],["app/views/contextualCommMenu/contextMenu.component.html","2c31ca9f533dcb9fe3f482e6b0f82ad1"],["app/views/contextualCommMenu/contextMenu.component.js","e49e46ff8e2ab681392cbb2ef87f2c7b"],["app/views/contextualCommMenu/remove-contextualComm.component.html","41ad4b6950800df2db42e0aad68e884d"],["app/views/contextualCommUsers/add-user.component.html","dcc27d091155ee45d398a9fbe7bcf36c"],["app/views/contextualCommUsers/add-user.component.js","913ecd82e5fe555ab1f666ff5244005c"],["app/views/contextualCommUsers/contextualCommUsers.component.html","37950c2a14c2cc974f834025bab5f059"],["app/views/contextualCommUsers/contextualCommUsers.component.js","98ee2556fa0f24c5d449c5402bebc372"],["app/views/home/home.component.html","ba3502482ffbbb6804681c127d612db0"],["app/views/home/home.component.js","82d890831708b09da44c46c03b2866fa"],["app/views/loading/loading.component.html","de9dd7fae442c2f01cbd04ca049d3cee"],["app/views/sharedResources/sharedResources.component.html","d2acc50ff7a90b2c55390536ab58af19"],["app/views/userView/contact-box.component.html","9b0d5c905268128c5fd1f2f6543407a5"],["app/views/userView/contact-box.component.js","c85779d9ed0f83f684421ce6ec4cf1b3"],["app/views/userView/user-view.component.html","e6d1c55216b7872e3e14432526d7b9cc"],["app/views/userView/user-view.component.js","d8188dfa98d3fce76b30ee5b059c382f"],["assets/fonts/Roboto/roboto-black-webfont.eot","77b68e38cb825dc8b7323bd6d60688f6"],["assets/fonts/Roboto/roboto-black-webfont.ttf","a23dc188410d8a27a451148ce1d3a9c7"],["assets/fonts/Roboto/roboto-black-webfont.woff","342e064876ef75f96224d8b373dc005f"],["assets/fonts/Roboto/roboto-blackitalic-webfont.eot","8b708430228367dce2052351b6f8dc19"],["assets/fonts/Roboto/roboto-blackitalic-webfont.ttf","626feb4829b955b3b749068092043c1e"],["assets/fonts/Roboto/roboto-blackitalic-webfont.woff","1bab7ebe3eaf5d00ffcb5511733a7740"],["assets/fonts/Roboto/roboto-bold-webfont.eot","b71235358cfd791e6ca558e23a6c2d16"],["assets/fonts/Roboto/roboto-bold-webfont.ttf","0388f93692a077603da1f5a6583c9ff9"],["assets/fonts/Roboto/roboto-bold-webfont.woff","643a3a78a98ac36e76ebaed1caa4315c"],["assets/fonts/Roboto/roboto-bolditalic-webfont.eot","7a22a495f89254f7e63832215602ad8e"],["assets/fonts/Roboto/roboto-bolditalic-webfont.ttf","2ee6127f0bf6fe5f9b8b167cb3266c4b"],["assets/fonts/Roboto/roboto-bolditalic-webfont.woff","baf2245b211ae4311fc12da52cc45aa1"],["assets/fonts/Roboto/roboto-italic-webfont.eot","7196747226877ac8795b4c6dd38ffc6d"],["assets/fonts/Roboto/roboto-italic-webfont.ttf","87873f61be22a0cf03cedbddb129b613"],["assets/fonts/Roboto/roboto-italic-webfont.woff","dc8f054da6b63bdaf770cef530344ec5"],["assets/fonts/Roboto/roboto-light-webfont.eot","d638934c360fb6ea67ee8de5b4b1dc1d"],["assets/fonts/Roboto/roboto-light-webfont.ttf","0b2bbb31d226cd30550e94fe35103620"],["assets/fonts/Roboto/roboto-light-webfont.woff","dce46a7b1c21b0aafbf7db1df522c255"],["assets/fonts/Roboto/roboto-lightitalic-webfont.eot","7031650a83975e6b148c801f5aea866c"],["assets/fonts/Roboto/roboto-lightitalic-webfont.ttf","c74a9671c25375c3185d36f49bb64496"],["assets/fonts/Roboto/roboto-lightitalic-webfont.woff","6c4024c156777acc28e9d11546fecdfd"],["assets/fonts/Roboto/roboto-medium-webfont.eot","1f701e2d8c2eaab17833838a1e089683"],["assets/fonts/Roboto/roboto-medium-webfont.ttf","8fe095957ea54551d2a75db2986dc659"],["assets/fonts/Roboto/roboto-medium-webfont.woff","c862a5f6c509b79c7936ea9c3335ba0a"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.eot","8af744bf56f5c48e538e4c5eaae35141"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.ttf","3a7bcabb4d7b73253a9bf78c532e9ac4"],["assets/fonts/Roboto/roboto-mediumitalic-webfont.woff","82f146c14bc68df43a22188b692e99af"],["assets/fonts/Roboto/roboto-regular-webfont.eot","32bd25c73c6510815ba5e9781e5e9901"],["assets/fonts/Roboto/roboto-regular-webfont.ttf","709aa584b2068885bac8a254b279ad6d"],["assets/fonts/Roboto/roboto-regular-webfont.woff","c9e9624be7d22f468e58a5ef6f1fdb87"],["assets/fonts/Roboto/roboto-thin-webfont.eot","75e10f49808eecaba00aad926568f62e"],["assets/fonts/Roboto/roboto-thin-webfont.ttf","4a23a9f6f38748c3eb3024bc14803c62"],["assets/fonts/Roboto/roboto-thin-webfont.woff","66017e9704e6419e2a84eff67715a7d1"],["assets/fonts/Roboto/roboto-thinitalic-webfont.eot","68b4a7e47eeb3e9aa2a386644318cd2a"],["assets/fonts/Roboto/roboto-thinitalic-webfont.ttf","d9fae6e12b9bcee72697d06724690fe1"],["assets/fonts/Roboto/roboto-thinitalic-webfont.woff","9f9deecbdf37b6c34687cb7e766878b5"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.eot","71e01261e63f1ee61d0cbfa5798d683f"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.ttf","70c81adebbb86ebad4b9c91700327eb1"],["assets/fonts/Roboto_condensed/robotocondensed-bold-webfont.woff","c43c0c7bf0f807c1e075eb1d64c381d0"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.eot","9c831d8d1346e938a300a418e47850f4"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.ttf","a8ee5d3c2e161aa567e7b55e0f183431"],["assets/fonts/Roboto_condensed/robotocondensed-bolditalic-webfont.woff","1bf0d8ec3761237aa52cc9d44dbd6841"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.eot","f7288ae3011a9114d50c58c97aeabf1e"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.ttf","cc2b8ee77b5799dc1156833e9bde6f20"],["assets/fonts/Roboto_condensed/robotocondensed-italic-webfont.woff","e659db108d6ff1897a1c94d8425d1cb6"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.eot","ed2b3aafc1fef9827fc1b6dd9a33972c"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.ttf","bb680481a95129ad5f1b03a0ae64c693"],["assets/fonts/Roboto_condensed/robotocondensed-light-webfont.woff","90a2054fd4e90419ebd85adbae02cacf"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.eot","b2009451694ad3d725efb16138942cf8"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.ttf","69bcb61c5a40e6f0db99558fb4992d78"],["assets/fonts/Roboto_condensed/robotocondensed-lightitalic-webfont.woff","4b7b2710d7d9cebac3d956714e784c84"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.eot","99a4347d13789131e16e8bb86275a652"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.ttf","e570ecf2ac11264cbdebf2e367f2a74b"],["assets/fonts/Roboto_condensed/robotocondensed-regular-webfont.woff","ae2eabb2987017d2af57e62d5d8cd940"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.eot","a34d0665264772c512ca4248555f4b7b"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.ttf","60c929240884028a342553d5a9091801"],["assets/fonts/Roboto_slab/robotoslab-bold-webfont.woff","295a3a5702da27585ef94102376ef58c"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.eot","ace3c69651fc4fb71f0f70283161c14b"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.ttf","000b2c88694421e91964aef304ca155a"],["assets/fonts/Roboto_slab/robotoslab-light-webfont.woff","9291599e075251bc0bd0601cdf09bcc5"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.eot","9c9acb2af03c4f5adfa15e0371298de5"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.ttf","1d07d47d3b879dfa46c57b04441b502a"],["assets/fonts/Roboto_slab/robotoslab-regular-webfont.woff","017d2e126c9a1a611a6b4d5124fc2652"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.eot","8773b361f967fd5f71ee835a56189f01"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.ttf","7c17c5558a74bd1ff0571da291800243"],["assets/fonts/Roboto_slab/robotoslab-thin-webfont.woff","0c76664e982a82018a5dfe8261385ea8"],["assets/fonts/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["assets/fonts/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["assets/fonts/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["assets/img/asc-logo-small.png","07e253bfa23217ef7d5fd51c0eed010f"],["assets/img/asc-logo.png","e2686a27408c1ffd0489e14c7ffe0e3c"],["assets/img/audio-bk.png","617a3b4d92068fe16dc5c7ec11072b01"],["assets/img/avatar-1.jpg","d8861194de77f111f8dc476083233eca"],["assets/img/avatar-2.jpg","f1a58a03f56bee5f67baf73ca6888da5"],["assets/img/avatar-3.jpg","2a11ea677496f31bc00fdcb9fbe598e2"],["assets/img/avatar-4.jpg","02ff3ba5561ee0e3eccc381693123e4f"],["assets/img/avatar.jpg","5e3218eb8aafb0b58249d9959a92e5f9"],["assets/img/fileteste.jpg","787ca3db891e777226f7d5ac93d2d515"],["assets/img/icons/android-icon-144x144.png","2348e2ba40c54867f3d1f463f1fb1c50"],["assets/img/icons/android-icon-192x192.png","3e7656b1fe73e42b170bb061df7d9677"],["assets/img/icons/android-icon-36x36.png","64d148c2e109d0121fdb18578f5824fd"],["assets/img/icons/android-icon-48x48.png","bc5f30ea39c1583d5b0039d74db06635"],["assets/img/icons/android-icon-72x72.png","4a2befc069cf7a162a122cb836c59b1e"],["assets/img/icons/android-icon-96x96.png","0a8f1355897ed066e560e0fadbe0f459"],["assets/img/icons/apple-icon-114x114.png","e200c679f8f035ee2a64b4f4e1026b1a"],["assets/img/icons/apple-icon-120x120.png","b5713d8b2579e83f9889f5082806d47a"],["assets/img/icons/apple-icon-144x144.png","2348e2ba40c54867f3d1f463f1fb1c50"],["assets/img/icons/apple-icon-152x152.png","113cd13e20392382001a7202dadd5349"],["assets/img/icons/apple-icon-180x180.png","5439cfe2e8f0b00831bcebf999a0a98f"],["assets/img/icons/apple-icon-57x57.png","5e2dc268de50c001043480e05b5ecd52"],["assets/img/icons/apple-icon-60x60.png","364ba4379d2be1db83a8ff71df5998af"],["assets/img/icons/apple-icon-72x72.png","4a2befc069cf7a162a122cb836c59b1e"],["assets/img/icons/apple-icon-76x76.png","663835a078669cd0644680a2d31b59c4"],["assets/img/icons/apple-icon-precomposed.png","6f48bafbc4b93dbb45d858f84077fcd2"],["assets/img/icons/apple-icon.png","6f48bafbc4b93dbb45d858f84077fcd2"],["assets/img/icons/favicon-16x16.png","3c111fc9740bdebfa0fdf7e399aabdde"],["assets/img/icons/favicon-32x32.png","db58f90b65565f6d703d2f0b3831c628"],["assets/img/icons/favicon-96x96.png","0a8f1355897ed066e560e0fadbe0f459"],["assets/img/icons/icon-128x128.png","9e72b0a7c514a8bd6948b716cf386b17"],["assets/img/icons/icon-144x144.png","53056319126b25f7efcdba75ae42e949"],["assets/img/icons/icon-152x152.png","3ba4e277413c6911d1ca75c1d9d5de3b"],["assets/img/icons/icon-192x192.png","2238041e9610410dd203d155ca970731"],["assets/img/icons/icon-384x384.png","404690ce2ce6f5fb73361d6665aa528c"],["assets/img/icons/icon-512x512.png","c99c540032f481f32bb1bc734f2f1d66"],["assets/img/icons/icon-72x72.png","d42e41cebdf20c08e2c50271b4920df9"],["assets/img/icons/icon-96x96.png","eee2fe33da2ce71afc74b2e604e70deb"],["assets/img/icons/ms-icon-144x144.png","2348e2ba40c54867f3d1f463f1fb1c50"],["assets/img/icons/ms-icon-150x150.png","fbfa8f255b9ceba197b80e02428ff8a6"],["assets/img/icons/ms-icon-310x310.png","eea12d51352c831b973c3bb6a93d3465"],["assets/img/icons/ms-icon-70x70.png","3b992ebc0ae515e8d89453bc87f0ad5d"],["assets/img/kpi-example.jpg","435308334b802553d7dd1208954a4489"],["assets/img/launcher-icon-1x.png","085ab2da2c3adf7abbe865a6d93ef90f"],["assets/img/launcher-icon-2x.png","34370af922853be39f25030aa0116a3d"],["assets/img/launcher-icon-3x.png","a5aae03941f4e7f879901057c8587125"],["assets/img/launcher-icon-4x.png","0bcc447440f1145785c791f37705cc0e"],["assets/img/rethink-logo.png","5cec88325af451f720ee1eab476c424e"],["assets/img/rethinklogo2.png","45370e26d0c4f461c933ba6e160dece5"],["assets/img/ripple.css","078219b011af8fb7266b215a127195d6"],["assets/img/ripple.svg","0a8875c79350a0a31947424b84c2eafc"],["assets/img/video-bk.jpg","70d345bdf2b82404e63c6b67c364d2d3"],["assets/sounds/classic-ringer.mp3","8a757ee0bd127ec60685c887a7683b00"],["assets/sounds/hurry.mp3","ab899e23f587bb1f869ce8744bdf5255"],["assets/sounds/shy.mp3","ffb1eb322f5edbafe869265f1b0dba96"],["assets/sounds/solemn.mp3","faeb61d7cbc2f635e5c73b0794d07ebe"],["assets/sounds/successful.mp3","b1043fc69b1d5f40004ccf15d6cc2f87"],["assets/style/ink.min.css","4662c795276a29b6821d7472fd6a75a8"],["assets/style/responsive.css","c3b9f52b88df7be7a4986a17b77c01d7"],["index.html","214d7917e9e620aa5c53a44c5fc44d2e"],["main.js","511b6dcddddea8f4084412cc3069e470"]];
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

toolbox.router.get(/https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/materialize\/0.97.5\/css\/materialize.min.css/, toolbox.cacheFirst, {});
toolbox.router.get(/https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/materialize\/0.97.5\/js\/materialize.min.js/, toolbox.cacheFirst, {});
toolbox.router.get(/https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jquery\/2.1.4\/jquery.js/, toolbox.cacheFirst, {});
toolbox.router.get(/https:\/\/fonts.googleapis.com\/icon\?family=Material\+Icons/, toolbox.cacheFirst, {});
toolbox.router.get(/https:\/\/localhost\/.well-known\/runtime\/index.html\/core.js/, toolbox.cacheFirst, {});
toolbox.router.get("./(.*)", toolbox.cacheFirst, {});




