// 1. define the module and the other module dependencies (if any)
onCreateSessionDescriptionError = function(){};
onSetSessionDescriptionError = function(){};
onSetSessionDescriptionSuccess = function(){}
constraints = [{
                    constraints: "",
                    type: ResourceType.AUDIO_VIDEO,
                    direction: "in_out"
                },
                {
                    constraints: "",
                    type: ResourceType.CHAT,
                    direction: "in_out"
                }];

var contactManager =  angular.module('contactManager', ['sessionManager'/*, 'sensingController', 'googlechart'*/]);
var  iterator;
contactManager.controller('contactController', function($scope, $location, contactManagerFactory, wonderFactory, sessionManagerFactory, $window){
        
        $scope.actividade = false;
        
        $scope.call = true;
        $scope.AllUsers = wonderFactory.getListAllUsers();
        $scope.timeLine = wonderFactory.getTimeLine();
        $scope.chatMessages = wonderFactory.getListMessages();
        $scope.$on('$viewContentLoaded', function(){
        
        
        $scope.change = function(id){
            document.getElementById("aux").src = document.getElementById("video").src
            document.getElementById("video").src =  document.getElementById(id).src;
            document.getElementById(id).src =  document.getElementById("aux").src;
            document.getElementById("aux").src = "";  
        }
       
            function mainSidebarCalcs() {
                var sdConv = $('.sidebarConversation').outerHeight(true),
                    sdBodyHeight = $(window).height() - $('.sidebarHeader').outerHeight(true) - $('.sidebarConversation').outerHeight(true) - $('.sidebarFooter').outerHeight(true) - $('.mainHeader').outerHeight(true) - $('.mainFooter').outerHeight(true);

                !$('.sidebarConversation').is(':visible') ? sdBodyHeight += sdConv : 0;

                $('.sidebarBodyInner').css('height', sdBodyHeight - 45);

            }

            function editGroupName(){
                    $('.sidebarBodyInner .panel-title > a:first-child').dblclick(function () {
                    var editPanel = $(this);
                    editPanel.prop('contentEditable', true);
                    editPanel.blur();
                    editPanel.focus();

                    $(window).on('click', function() {
                        editPanel.prop('contentEditable', false);
                    });
                });
            }

            function timerCall(val) { return val > 9 ? val : "0" + val; }

            function timer(){
                var sec=0,
                timer = setInterval( function(){
                    $('.timerS').html(timerCall(++sec%60));
                    $('.timerM').html(timerCall(parseInt(sec/60,10)%60));
                    $('.timerH').html(timerCall(parseInt(sec/3600,10)));

                    if(sec == 3600) {

                        var selSidebarConv = $('.sidebarConversation'),
                            selAudioNote = $('.audioScreen');

                        selSidebarConv.find('.callDuration').empty().append('(<span class="timerH"></span>:<span class="timerM"></span>)');
                        selAudioNote.find('.callNote.timer').empty().append('<span class="timerH"></span>:<span class="timerM"></span>');
                    }


                }, 1000);

            }


            $(function(){

                mainSidebarCalcs();
                editGroupName();
                timer();
                // BEGIN - PHONE DIALER

                $('.dialPad button').on('click',function(){

                    if($(this).parent().attr('id') === "dialPad-call"){
                        $('#numPadModal').find('.modal-header').css('background-color','#32d167');
                        $('#numPadModal').find('.dialMsg').empty().append('Aguardando resposta <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>');
                    }

                    if($(this).parent().attr('id') === "dialPad-end"){
                        $('#numPadModal').find('.modal-header').css('background-color','#414d63');
                        $('#numPadModal').find('.dialScreen, .dialMsg').empty();
                    }

                    var val = $(this).text();

                    $('.dialScreen').append(val);

                    var dialScreenLength = $('.dialScreen').text().length;

                    if (dialScreenLength > 10) {
                        $('.dialScreen').css({'width':'300px','font-size':'24px', 'overflow-x':'auto'});
                    } else {
                        $('.dialScreen').css({'width':'295px','font-size':'44px'});
                    }

                });

                // END

                // BEGIN - REMOVE CONTACT
                $scope.removeUser = function(user, groupname){
                    var message = new MessageFactory.createCRUDMessage( "delete", "Identities.<" + groupname + ">."+ user,"");
                    wonderFactory.getMyIdentity().messagingStub.sendMessage(message, contactManagerFactory.callBackRemoveUser); 
                  }

                // END
                // BEGIN - INIT RESIZABLE

                $(".textAreaWrapper").resizable({
                    handles: 'n',
                    maxHeight: 150,
                    minHeight: 50
                });

                $(".textAreaWrapperBottom").resizable({
                    handles: 'n',
                    maxHeight: 100,
                    minHeight: 38
                });

                $('.ui-resizable-handle').prop('title','Arraste para expandir/colapsar');

                // END

                $('.textArea textarea').blur(function(){
                    $(this).attr('placeholder', 'Escrever mensagem...')
                });

                $('.textArea textarea').keydown(function(e){
                    if (e.keyCode == 13 && !e.shiftKey){
                        e.preventDefault();
                        $scope.submitChatMsg();
                    }
                });
                function chatCalcsBottom(e){
                    $('.audioVideoChatWrapper').css('padding-bottom', e-37);
                }


                function withHeaderHeight(){
                        var withHeaderHeight = $(window).height()-$('.mainHeader').outerHeight()-$('.mainFooter').outerHeight()-$('.chatHeader').outerHeight()-40;

                        $('.chatLayout').css('height', withHeaderHeight).prev().css('display','block');
                }

                function chatScrollToBottom(e){
                  $('.chatScreen').scrollTop($('.chatScreen')[e].scrollHeight);
                }
                $('.chatSubject input').keydown(function(e){
                    if (e.keyCode == 13){
                        e.preventDefault();
                        $scope.submitChatMsg();
                    }
                });
                function chatCalcsMain(e){
                    $('.chat').css('padding-bottom', e+10);
                }

                $(".sfBar").on('click',function(){
                    if(!$(".sfSidebar").hasClass('sfSidebar-collapsed')){ // SE SIDEBAR ABERTA
                        $(".sfSidebar").animate({'right': '-250px' },300).addClass('sfSidebar-collapsed');
                        $('.sfSidebar > .sfBar').attr('title','Clique para abrir');
                        $(".audioVideoInner").animate({'padding-right':'0'},300);
                    } else { // SE SIDEBAR FECHADA
                        $(".sfSidebar").animate({'right': '0' },300).removeClass('sfSidebar-collapsed');
                        $('.sfSidebar > .sfBar').attr('title','Clique para fechar');
                        $(".audioVideoInner").animate({'padding-right':'250px'},300);     
                    }
                });

                $('.submitMsg').on('click',function(){
                    $(".textArea textarea").focus();
                    submitChatMsg();
                });

                $(window).on('resize', function() {
                    withHeaderHeight();
                });

                $(".textAreaWrapper").on('resize',function(){
                    var textAreaWrapperHeight = $(this).height();
                    chatCalcsMain(textAreaWrapperHeight);
                    chatScrollToBottom(0);
                });

                $(".textAreaWrapperBottom").on('resize',function(){
                    var textAreaWrapperBottomHeight = $(this).height();
                    chatCalcsBottom(textAreaWrapperBottomHeight);
                    chatScrollToBottom(1);
                });




                // BEGIN - REMOVE SF FILE

                $('[data-target="#removeFileModal"]').on('click', function(){
                    var remFileTrigger = $(this),
                        remFileModal = $('#removeFileModal'),
                        remFileParent = remFileTrigger.parent(),
                        remFileName = remFileParent.find('.sFFileName').text();

                    remFileModal.find('label > span').text(remFileName);

                    $('.removeFileBtn').on('click', function(){
                        remFileParent.remove();
                    });

                });

                // END

                // BEGIN - FILE UPLOAD

                $('.sFAddFileBtn').on('click', function(){
                    $('.sFUpload').toggle();
                });

                $('.sFUpload button').on('click', function(){
                    $('.sFUpload').hide();
                });

                // END

                // BEGIN - ADD CONTACT

                $("#addUserModal .modalSearchResults .wonderBtn").on('click', function(){
                    var newContact = $(this),
                        newContactName = $(this).parent().prev().find('span').text(),
                        newContactAvatar = $(this).parent().prev().find('img').attr('src');

                    newContact.closest('li').remove();
                    $(".sidebarBodyInner .panel:last-child").find('.sidebarContacts').append('<li><div class="avatar avatar-sm pull-left"><img src="'+newContactAvatar+'" alt="Img"></div><span class="font18">'+newContactName+'</span><p><i class="fa fa-circle green font8 clearfix"></i> on-line</p> <ul class="list-inline userListOptions pull-right"><li><button class="button-sm"><i class="fa fa-phone font18"></i></button></li><li><button class="button-sm"><i class="fa fa-video-camera font18"></i></button></li><li><button class="button-sm"><i class="fa fa-user font18"><span>-</span></i></button></li></ul></li>');
                });

                // END



                // BEGIN - SEND INVITE 

                $("#sendInviteModal .modalSearchResults .wonderBtn").on('click', function(){
                    var newInvite = $(this),
                        newInviteName = $(this).parent().prev().find('span').text(),
                        newInviteAvatar = $(this).parent().prev().find('img').attr('src');

                    newInvite.closest('li').remove();
                    $(".videoScreen").find('.videoPIP ul').append('<li><div class="inviteConfirm"><div class="avatarWrapper"><div class="avatar avatar-sm"><a href="#"><img src="'+newInviteAvatar+'" alt="Img"></a></div><div class="avatarTag" style="color: rgb(65, 77, 99);"><i class="fa fa-circle green font12"></i>'+newInviteName+'</div><button class="cancelInvite wonderBtn font14"><i class="fa fa-phone endCall font14"></i> Cancelar convite</button></div></div></li>');
                    $(".audioVideoGroup ul").append('<li class="avatar avatar-sm"><img src="'+newInviteAvatar+'"/></li>');
                    $('.chatMessages').append('<li class="info"><img class="avatar avatar-sm" src="css/images/info.png" alt="Img"/><span>Convidou <i class="fa fa-circle green font8"></i> <span class="cancelInviteID">'+newInviteName+'</span> para a vídeo-chamada. <a class="cancelInviteLink"><i class="fa fa-phone endCall font14"></i> Cancelar convite?</a><p>'+ chatDate +'</p></span></li>');
                
                });

                // END

                // BEGIN - CANCEL INVITE 

                $('#sendInviteModal').on('hidden.bs.modal', function(){

                    $('.cancelInvite').on('click', function() {
                            var cancelBtn = $(this),
                            cancelName = cancelBtn.prev().text(),
                            cancelAvatar = cancelBtn.parent().find('.avatar img').attr('src');


                        $('.cancelInviteID:contains('+cancelName+')').next().removeAttr('onclick').addClass('canceledInvite').text('Convite Cancelado');

                  //        if(cancelName2.html() == cancelName){
                        //  cancelName2.next().removeAttr('onclick').addClass('canceledInvite').text('Convite Cancelado');
                        // }

                        $('.audioVideoGroup [src="'+cancelAvatar+'"]').parent().remove();
                    
                        cancelBtn.closest('li').remove();
                        $('.chatMessages').append('<li class="info"><img class="avatar avatar-sm" src="css/images/info.png" alt="Img"/><span>O convite feito a <i class="fa fa-circle green font8"></i> '+cancelName+' foi cancelado por Afonso Neves.<p>'+ chatDate +'</p></span></li>');
                    });

                    $('.cancelInviteLink').on('click', function() {
                            var cancelLink = $(this),
                            cancelLinkName = cancelLink.prev().text();

                        $('.inviteConfirm .avatarTag:contains('+cancelLinkName+')').next().trigger('click');
                            
                    });

                });

                // END

                // BEGIN - SIDEBAR HEADER - USER STATUS DROPDOWN

                $(".userTag").on('show.bs.dropdown hide.bs.dropdown',function(){
                    $(".statusTag").find('i:last-child').toggleClass('fa-angle-down fa-angle-up');
                });


                $(".statusTag").next().find('a').on('click',function(){

                    var la = $(this),
                        currentStatus = $('.statusTag').clone(true).find('i:last-child').remove().end().html();  

                    $(".statusTag").empty().append(la.html()+'<i class="fa fa-angle-up font14 pull-right"></i>');

                    la.empty().append(currentStatus);

                });

                // END


                // BEGIN - ADD SIDEBAR GROUP FOLDER


                $(".addGroupBtn").on('click',function(){

                    var newGroupName = $(this).prev().val(),
                        sidebarGroupsCount = $('.sidebarBodyInner').find('.panel').length;

                    /*$('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-target="#collapse'+sidebarGroupsCount+'" href="#">
                                    '+newGroupName+'</a><i class="fa"></i></h4></div><div id="collapse'+sidebarGroupsCount+'" class="panel-collapse collapse"><div class="panel-body"><ul class="list-unstyled sidebarContacts"><span class="noContactsInList">
                                      Não existe nenhum contacto neste grupo</span></ul></div></div></div>').insertBefore('.sidebarBodyInner > .panel:last-child');

                    $('.sidebarBodyInner .panel:last-child').find('.panel-title a').attr('data-target','#collapse'+(sidebarGroupsCount+1));
                    $('.sidebarBodyInner .panel:last-child').find('.panel-collapse').attr('id','collapse'+(sidebarGroupsCount+1));
                    */
                    editGroupName();
                });


                // END


                // BEGIN - REMOVE SIDEBAR GROUP FOLDER


                
                $('[data-target="#removeGroupModal"]').on('click', function(){

                    $("#removeGroupModal").find('.removeGroups').empty();

                    $(".sidebarBodyInner").find('.panel').not().each(function(){
                        var panelName = $(this).find('.panel-title').text();

                        $("#removeGroupModal").find('.removeGroups').append('<li class="clearfix"><div class="pull-left font18">'+panelName+'</div><div class="pull-right"> <button class="removeGroupBtn wonderBtn pull-right font18"><i class="fa fa-folder-open composed"><span>-</span></i> Remover</button></div></li>');
                    });

                    $(".removeGroupBtn").on('click', function(){
                        var rmBtn = $(this),
                        rmBtnIndex = rmBtn.closest('li').index()+1,
                        paneSelector = $('#collapse'+rmBtnIndex),
                        paneContent = paneSelector.find('.sidebarContacts').html();
                        console.log("LISTA GRUPOS", paneSelector)
                        var groups = wonderFactory.getListGroups();
                        console.log("Remover grupo",groups);
                        console.log("Lista grupos",groups);
                        $(".sidebarBodyInner .panel:last-child").find('.sidebarContacts').append(paneContent).find('.noContactsInList').remove();
                        rmBtn.closest('li').remove();
                        paneSelector.closest('.panel').remove();
                        var groupIdRemove = groups[rmBtnIndex-1].groupId
                        var groupNameRemove = groups[rmBtnIndex-1].name
                        console.log("ID Groups remove",groupIdRemove);
                       
                        var message = new MessageFactory.createCRUDMessage( "delete", "Groups.<" + groupNameRemove + ">."+groupIdRemove,"");
                        wonderFactory.getMyIdentity().messagingStub.sendMessage(message, contactManagerFactory.callBackRemove); 
                        groups.splice(rmBtnIndex-1,1)
                        console.log("Lista grupos apos remover",groups);
                    });

                });


                // END

            });


$(window).on('resize', function() {
    mainSidebarCalcs();
});
    })
   
    var codecsAddHoc = [];
    $scope.message = null;
    var listCodecChatAddHoc = [];
   
    var localStream;
    
    var div = null;
    $scope.actividade = true;
    $scope.statePresence = "on-line";
    $scope.call = false;
    
    var codecChat = "";
    var codecFile="";
    var codecIDFile;
    var codecIDChat;
    $scope.numbMessages = 0;

    $scope.myIdentity = wonderFactory.getMyIdentity();
    
    var messageP;
    $scope.listGroups = wonderFactory.getListGroups();
    $scope.listAllUsers = wonderFactory.getListAllUsers();
 
    
    $scope.online = function(){
         var c = document.getElementById("online");
         c.innerHTML = "<a ng-click='online()'><i class='fa fa-circle green font14' ></i>  on-line</a>";
         var identity = wonderFactory.getMyIdentity();
        identity.setStatus("online", false);
    };
 

    $scope.ausente = function(){
        var c = document.getElementById("ausente");
        c.innerHTML = "<a ng-click='ausente()''><i class='fa fa-circle red font14' ></i> ausente</a>";
        var identity = wonderFactory.getMyIdentity();
        identity.setStatus("ausente", false);
    };

    $scope.ocupado = function(){
        var c = document.getElementById("ocupado");
        c.innerHTML = "<a ng-click='ocupado()''><i  class='fa fa-circle yellow font14'></i> ocupado</a>";
        var identity = wonderFactory.getMyIdentity();
        identity.setStatus("ocupado", false);
    };
    $scope.off_line = function(){
        var c = document.getElementById("offline");
        c.innerHTML = "<a ng-click='off_line()''><i class='fa fa-circle-o font14'></i> off-line</a>";
        var identity = wonderFactory.getMyIdentity();
        identity.setStatus("off-line", false);
    };
    $scope.webChat = function(user, type){
        $scope.pageLayout('chat');
        //$scope.pageLayout('chat');
        //$scope.actividade = false;
        //$scope.call = true;
        $scope.friend = user ;
        var invitation = new Object();
        var array = [];
        array.push(user.rtcIdentity);
        invitation.peers = array;
        var list = sessionManagerFactory.getListConversations();


        if(list.length == 0){
             resourceConstraints = [{
                    constraints: "",
                    type: ResourceType.ADHOC_CHAT,
                    direction: "in_out"
                }];
                
            conversation = new Conversation(wonderFactory.getMyIdentity(),$scope.onRTCEvt , contactManager.onMessage, iceServers);
            conversation.open(array, wonderFactory.getMyIdentity().rtcIdentity, resourceConstraints, invitation, "conversas formais", function(){}, function(){});
            for(var i=0; i<conversation.participants.length;i++){
                conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
            }
            var messages = [];
            var conversationObj = new Object();
            conversationObj.users = $scope.friend.rtcIdentity;
            conversationObj.messages = messages;
            conversationObj.conversation = conversation;
            list.push(conversationObj);
            $scope.conversation = conversationObj;
            sessionManagerFactory.addConversation(conversationObj);

            console.log("new webchat", conversationObj);

            //sessionManagerFactory.setListConversations(list);
        }else{
            var exist = false;
            for(var i = 0; i< list.length;i++){
                if(list[i].conversation){
                    for(var j=0; j<list[i].conversation.participants.length;j++){
                        if(list[i].conversation.participants[j].identity.rtcIdentity == $scope.friend.rtcIdentity){
                            exist = true;
                            $scope.conversation = list[i];

                        }
                    }
                }
            }
            if(!exist){
                 resourceConstraints = [{
                        constraints: "",
                        type: ResourceType.ADHOC_CHAT,
                        direction: "in_out"
                    }];
                    
                conversation = new Conversation(wonderFactory.getMyIdentity(),$scope.onRTCEvt , contactManager.onMessage, iceServers);
                conversation.open(array, wonderFactory.getMyIdentity().rtcIdentity, resourceConstraints, invitation, "conversas formais", function(){}, function(){});
                for(var i=0; i<conversation.participants.length;i++){
                    conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                    conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                    conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
                }
                var messages = [];
                var conversationObj = new Object();
                conversationObj.users = $scope.friend.rtcIdentity;
                conversationObj.messages = messages;
                conversationObj.conversation = conversation;
                list.push(conversationObj);
                //sessionManagerFactory.setListConversations(list);
                sessionManagerFactory.addConversation(conversationObj);
                $scope.conversation = conversationObj;

            }
        }
         //$scope.callTo(user +"@vertx.wonder", type);
   
    };
    $scope.controlMedia = function(e){
        var video = document.getElementById('video'),
        //videoSelf = document.getElementById('videoSelf');
        audio = document.getElementById('audio');

        switch(e) {
            case 'play':
                if($('.videoScreen').is(':visible')){
                    video.play();
                } else { video.pause(); }

                if($('.videoScreen').is(':visible') && $('#videoSelf').is(':visible')){
                        $('#videoSelf').hide();
                        //videoSelf.pause();
                    } else { 
                        $('#videoSelf').show();
                        //videoSelf.play();
                    }

                if($('.audioScreen').is(':visible')){
                    audio.play();
                } else { audio.pause(); }

            break;
            case 'pause':
                $('.videoScreen').is(':visible') ? video.pause() : 0;
                $('.audioScreen').is(':visible') ? audio.pause() : 0;

            break;
            case 'restart':
                video.play();
                video.currentTime = 0;
            break;
            case 'un/mute':

            if($('.videoScreen').is(':visible')){
                video.muted ? video.muted= false : video.muted= true;
            }

            if($('.audioScreen').is(':visible')){
                audio.muted ? audio.muted= false : audio.muted= true;
            }

            $('#actionMute i').toggleClass('fa-microfone-slash fa-microfone');

            break;
            default:
                return 0;
        }
}

 $scope.addParticipant = function(){
    console.log("addParticipant");
    var user = document.getElementById('addtext').value.split(';');
    var invitation = new Object();
    if(peers.length > 1)
        invitation.hosting = myRtcIdentity;
    console.log(conversation);
    conversation.addParticipant(user, invitation, constraints, function(){}, function(){});
}

$scope.chatScrollToBottom = function(e){
  $('.chatScreen').scrollTop($('.chatScreen')[e].scrollHeight);
}


$scope.withHeaderHeight = function(){
        var withHeaderHeight = $(window).height()-$('.mainHeader').outerHeight()-$('.mainFooter').outerHeight()-$('.chatHeader').outerHeight()-40;

        $('.chatLayout').css('height', withHeaderHeight).prev().css('display','block');
}

$scope.pageLayout = function(e){
   

    var audio = $('.audioScreen'),
        audioHeader = audio.find('.audioHeader');


 
    switch(e) {
        case 'audioCall':
            console.log("audio call audioHeader ", audioHeader);
            $('.audioVideo').removeClass('chatLayout').addClass('multiLayout');
            $('.multiLayout').attr('style','height:65%');
            $('.multiLayout + .audioVideoChatWrapper').attr('style','height:35%');
        audio.css('background-color','transparent');
        audioHeader.css('background-color','#32d167').find('.callStatus').empty().html('<i class="fa fa-video-camera"></i><span class="blink"> A ligar...</span>');
        audio.find('.avatarTag').css('color','#414d63').find('i').removeClass('fa-phone').addClass('fa-circle');
        audio.find('.callNote').addClass('timer').empty().html('Aguardando resposta <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>').css('color','#414d63');
            $('.videoScreen').hide();
            $('#videoSelf').hide();
            $('.audioVideoGroup').hide();
            $scope.controlMedia('pause');                   // PAUSE VIDEO - FOR DEMO PURPOSES ONLY
            $('.chatHeader').hide();
            $('.audioVideoScreen').show();
            $('.audioScreen').show();
            $('.callActions > .cancelCall').show();
            $('.callActions > .btnGroup').hide();
            $('.callSignalStrenght').hide();
            $('.sidebarConversation').show();
            $('.sidebarConversation').find('.fa-video-camera').toggleClass('fa-video-camera fa-phone');
            $scope.mainSidebarCalcs();
            $scope.chatScrollToBottom(1);
            break;
        case 'audio':
            $('.audioVideoScreen').show();
            $('.audioVideoGroup').hide();
            audio.css('background-color','#293140');
            audioHeader.css('background-color','transparent').find('.callStatus').empty().html('<i class="fa fa-phone"></i> Conversa áudio');
            audio.find('.avatarTag').css('color','#fff').find('i').removeClass('fa-circle').addClass('fa-phone');
            audio.find('.callNote').addClass('timer').empty().html('<span class="timerM"></span>:<span class="timerS"></span>').css('color','#fff');
            $('.callActions > .cancelCall').hide();
            $('.callActions > .btnGroup').show();
            $('.callSignalStrenght').show();
            $('.sidebarConversation').show();
            $('.sidebarConversation').find('.fa-video-camera').toggleClass('fa-video-camera fa-phone');
            $scope.mainSidebarCalcs();
            $scope.chatScrollToBottom(1);
            $scope.controlMedia('play');                   // PAUSE VIDEO - FOR DEMO PURPOSES ONLY
            break;
        case 'videoCall':
            $('#actionSelf').find('i').empty().append('<span>/</span><span>/</span>').addClass('slashedIcon');
            $('.audioVideo').removeClass('chatLayout').addClass('multiLayout');
            $('.multiLayout').attr('style','height:65%');
            $('.multiLayout + .audioVideoChatWrapper').attr('style','height:35%');
            $('.audioVideoScreen').show();
            $('.audioVideoGroup').show();
            $('.audioScreen').hide();
            $('.videoScreen').show();
            $('.chatHeader').hide();
            $('.cancelCall').hide();
            $('.callActions > .btnGroup').show();
            $('.callSignalStrenght').show();
            $('.sidebarConversation').show();
            $('.sidebarConversation').find('.fa-phone').toggleClass('fa-phone fa-video-camera');
             //document.getElementById("lateral").style.visibility="hidden";
            //document.getElementById("centro").style.visibility="hidden";
            $('.contentInner').show();
            
            document.getElementById("chat").className = document.getElementById("chat").className.split("ng-hide")[0];
            document.getElementById("chat").style.visibility="visible";
            //$scope.mainSidebarCalcs();
            //$scope.chatScrollToBottom(1);
            //$scope.controlMedia('play');                   // PLAY VIDEO - FOR DEMO PURPOSES ONLY
            $('#videoSelf').show();
            break;
        case 'home':
            $('.chatHeader').hide();
            $('.chat').hide();
            $('.audioVideoInner').hide();
            $('.sFHeader').hide();
            $('.sfSidebarInner').hide();
            $('.sfBar pull-left').hide();
            $('.sFHeader').hide();
            $('.sfSidebar').hide();
            $('.fa fa-ellipsis-v font14').hide();
            $('.audioVideo chatLayout').hide();
            $('.audioVideoWrapper').hide();
            $('.sidebarConversation').hide();
            // $('.contentInner').hide();
              document.getElementById("chat").className = document.getElementById("chat").className.split("ng-hide")[0];
            document.getElementById("chat").style.visibility="hidden";
            document.getElementById("centro").className = "contentInner withSidebarRight";//document.getElementById("centro").className.split("ng-hide")[0];
            document.getElementById("lateral").className = "sidebarRight";//document.getElementById("lateral").className.split("ng-hide")[0];
            document.getElementById("centro").style.visibility="visible";
            document.getElementById("lateral").style.visibility="visible";
        
            /* $('.contentInner withSidebarRight').show();
             $('.list-unstyled timelineBar ng-scope').show();*/
             break;
        case 'chat':
            document.getElementById('chatMessages').innerHTML = '';;
            
           // $('#chatMessages list-unstyled').empty();
            document.getElementById("chat").className = document.getElementById("chat").className.split("ng-hide")[0];
            document.getElementById("chat").style.visibility="visible";
            $('.audioVideo').removeClass('multiLayout').addClass('chatLayout');
            $('.chatLayout').attr('style','height:auto'); // reset height when coming from other
            $scope.withHeaderHeight();
            $scope.controlMedia('pause');                  // PAUSE VIDEO - FOR DEMO PURPOSES ONLY
            $('.audioVideoGroup').hide();
            $('.audioVideoScreen').hide();
            $('.videoScreen').hide();
            $('#videoSelf').hide();
            $('.audioScreen').hide();
            $('.chatHeader').show();
            $('.cancelCall').hide();
            $('.callActions > .btnGroup').hide();
            $('.callSignalStrenght').hide();
            $('.sidebarConversation').hide();

            //
            $('.chatHeader').show();
            $('.chat').show();
            $('.audioVideoInner').show();
            $('.sFHeader').show();
            $('.sfSidebarInner').show();
            $('.sfBar pull-left').show();
            $('.sFHeader').show();
            $('.sfSidebar').show();
            $('.fa fa-ellipsis-v font14').show();
             $('.audioVideo chatLayout').show();
             $('.audioVideoWrapper').show();
            $scope.mainSidebarCalcs();
            $scope.chatScrollToBottom(0);
            var list = sessionManagerFactory.getListConversations();
            /*      receiveMessage(list[i].messages[j], "true");
                    if(list[i].messages[j].from == wonderFactory.getMyIdentity().rtcIdentity && list[i].users == $scope.friend)
                        receiveMessage(list[i].messages[j], "true");
                }
            }*/
            break;
        case 'self':
            $scope.controlMedia('play');                  // Play VIDEO - FOR DEMO PURPOSES ONLY

            $('#videoSelf').is(':visible') ? $('#actionSelf').find('i').empty().append('<span>/</span><span>/</span>').addClass('slashedIcon') : $('#actionSelf').find('i').empty().removeClass('slashedIcon');
            

            $('.audioScreen').is(':visible') ? pageLayout('videoCall') : 0;
            break;
        case 'expand':
            var expandBtn = $('#actionExpand'),
                expandTimeout;

            expandBtn.toggleClass('collapsed');

            if(expandBtn.hasClass('collapsed')) {
                //alert();
                expandBtn.removeClass('collapsed').hide();
                expandBtn.nextAll().css('display','inline').fadeIn();
                $('.callActions').animate({'margin-left': '-170px'});
                $('.callActions > .cancelCall').css('margin-left','54px');
            }

            $('.callActions').on('mouseleave',function(){
                if(!$('#actionExpand').is(':visible')){
                    expandTimeout = setTimeout(function(){
                        expandBtn.nextAll().hide();
                        $('.callActions').animate({'margin-left': '-116px'});
                        $('.callActions > .cancelCall').css('margin-left','0px');
                        expandBtn.fadeIn();

                    }, 3000);
                }
            });

            $('.callActions').on('mouseenter',function(){
                clearTimeout(expandTimeout);
            });

            break;
        case 'widescreen':
            var wideBtn = $('#actionExpand_wideScreen'),
                wideBtnIco = wideBtn.find('i'),
                wideSection = $('.multiLayout');
                
                    wideBtnIco.toggleClass('fa-expand fa-compress');

                    if(wideBtnIco.hasClass('fa-expand')){
                        $('.sfSidebar').hasClass('sfSidebar-collapsed') ? $('.sfSidebar').find('.sfBar').trigger('click') : 0;
                        wideSection.attr('style','height:65% !important');
                        wideSection.next().css('height','35%');
                    } else {
                        $('.sfSidebar').hasClass('sfSidebar-collapsed') ? 0 : $('.sfSidebar').find('.sfBar').trigger('click');
                        wideSection.attr('style','height:80% !important');
                        wideSection.next().css('height','20%');
                    }

               
            break;
        default:
            return 0;
    
    }

}


$scope.chatScrollToBottom = function(e){
  $('.chatScreen').scrollTop($('.chatScreen')[e].scrollHeight);
}
$scope.mainSidebarCalcs = function(){var a=$(".sidebarConversation").outerHeight(!0),b=$(window).height()-$(".sidebarHeader").outerHeight(!0)-$(".sidebarConversation").outerHeight(!0)-$(".sidebarFooter").outerHeight(!0)-$(".mainHeader").outerHeight(!0)-$(".mainFooter").outerHeight(!0);$(".sidebarConversation").is(":visible")?0:b+=a,$(".sidebarBodyInner").css("height",b-45)}
    $scope.callTo = function(user, type){
        
        var userRtcIdentity = user.rtcIdentity;
        $scope.pageLayout('audioCall');
        var list = sessionManagerFactory.getListConversations();
        $scope.actividade = false;
        var localVideo;
        $scope.call = true;
        $scope.friend = user;
        conversation = new Conversation(wonderFactory.getMyIdentity(),$scope.onRTCEvt , contactManager.onMessage, iceServers);
        var invitation = new Object();
        var array = [];
        array.push(user.rtcIdentity );
        invitation.peers = array;

        console.log("new conversation with ", user);
        console.log("callTo existing conversations ", list);

        
       //     invitation.hosting = myRtcIdentity;
       var arrayAux = [];
       arrayAux.push(user.rtcIdentity );
       var resourceConstraints;
        if(type == 'audio'){
            resourceConstraints = [{
                    constraints: "",
                    type: ResourceType.AUDIO_MIC,
                    direction: "in_out"
                },
                {
                    constraints: "",
                    type: ResourceType.CHAT,
                    direction: "in_out"
                }];
        }else{
            if(type == 'audio-video'){
                resourceConstraints = [{
                    constraints: "",
                    type: ResourceType.AUDIO_VIDEO,
                    direction: "in_out"
                },
                {
                    constraints: "",
                    type: ResourceType.CHAT,
                    direction: "in_out"
                }];
            }else{
                resourceConstraints = [{
                    constraints: "",
                    type: ResourceType.SCREEN,
                    direction: "in_out"
                },
                {
                    constraints: "",
                    type: ResourceType.CHAT,
                    direction: "in_out"
                }];
            }
        }
        //meter user.rtcIdentity
        conversation.open(arrayAux, wonderFactory.getMyIdentity().rtcIdentity, resourceConstraints, invitation, "conversas formais", function(){}, function(){});
        for(var i=0; i<conversation.participants.length;i++){
            conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
            conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
            conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
        }
        var messages = [];
        var conversationObj = new Object();
        conversationObj.users = $scope.friend;
        conversationObj.messages = messages;
        conversationObj.conversation = conversation;
        list.push(conversationObj);
        $scope.conversation = conversationObj;
//        sessionManagerFactory.setListConversations(list);
        sessionManagerFactory.addConversation(conversationObj);
    };

    $scope.hoverIn = function(){
        
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };

    
    $scope.update = function(state){
        $scope.pageLayout('video');
    }

$scope.chatScrollToBottom = function(e){
  $('.chatScreen').scrollTop($('.chatScreen')[e].scrollHeight);
}

$scope.onRTCEvt = function(event, evt, conversation) {

    console.log("Contact Manager: New Evt: ", evt);
    console.log("Contact Manager: New Evt from conversation ", conversation);
        // TODO To implement and pass the events up
    switch (event) {

    case 'onnegotiationneeded':
        //onnegotiationNeeded(this);
        //this.rtcEvtHandler(event,evt);
        break;
    case 'onicecandidate':
        break;
    case 'onsignalingstatechange':
        break;
    case 'onaddstream':
            localVideo = document.getElementById('video');
            remoteVideo = document.getElementById('videoSelf'); // isto n está trocado?
            //attachMediaStream(remoteVideo, evt.stream);
            var list = sessionManagerFactory.getListConversations();


            console.log("existing conversations ", list);



            var conversationObj = sessionManagerFactory.getConversation(conversation);

            /*for(var i = 0; i<list.length; i++){
                if(list[i].conversation)
                    if(sessionManagerFactory.getListConversations()[i].conversation){
                        if(sessionManagerFactory.getListConversations()[i].conversation.myParticipant.hosting.rtcIdentity == wonderFactory.getMyIdentity().rtcIdentity){
                            conversation = list[i].conversation;
                        }
                    }
            }*/   

            console.log("onaddstream found conversation ", conversationObj);

            localStream.participant = conversationObj.conversation.myParticipant;

            $scope.conversation = conversationObj;

            // no caso do stream remoto q estamos a receber ser do hosting, vamos colocá-lo na tag de video principal, e o nosso video local na 1a div secundária

            if(conversationObj.conversation.hosting.rtcIdentity == evt.participant.identity.rtcIdentity){
                console.log("adding stream from remote host in main video tag ", evt);
                $scope.addVideoTag(localStream);
                attachMediaStream(localVideo, evt.stream);
                //$scope.addVideoTag(evt);
            }else{
                if(div == null){// 1º video remoto que chega, q não é do hosting vamos colocar na tag video principal, e o nosso video local na 1a div secundária
                    console.log("adding stream from remote peer in main video tag ", evt);
                    $scope.addVideoTag(localStream);
                    attachMediaStream(localVideo, evt.stream);
                }else{ // Mais um novo video remoto vamos adicionar aos q já existem
                    $scope.addVideoTag(evt);
                    //$scope.addVideoTag(localStream);
                    //attachMediaStream(localVideo, evt.stream);
                    //div = evt;
                    //attachMediaStream(localVideo, localStream.stream);
                    //localStream.participant = wonderFactory.getMyIdentity();
                    //$scope.addVideoTag(localStream);
                }

                   
                
            }
            //$scope.addVideoTag(evt);
            //attachMediaStream(remoteVideo, evt.stream);
            // TODO: change state of the conversation and forward to app-layerevt
        break;
    case 'onremovestream':
        console.log("onremovestream: ", evt);
        break;
    case 'oniceconnectionstatechange':

        break;
    case 'ondatachannel':
        console.log("ondatachannel");
        break;
    case 'onResourceParticipantAddedEvt':
        console.log("onResourcePorticipantAddedEvt", evt);
        var list = sessionManagerFactory.getListConversations();
        console.log("Existing Conversations ",list )
      
        if(evt.codec.type=="chat"){
            codecIDChat = evt.codec.id;
            codecChat=evt.codec;
            if(sessionManagerFactory.getListConversations()[0]){
                if(sessionManagerFactory.getListConversations()[0].conversation.dataBroker)
                    sessionManagerFactory.getListConversations()[0].conversation.dataBroker.addCodec(codecChat);
            }
                
           // sessionManagerFactory.getListConversations()[0].conversation.dataBroker.addCodec(codecChat);
            codecChat.addListener(onData);
            ////document.getElementById('chat').style.visibility = 'visible';
        }
        if(evt.codec.type=="file"){
            codecIDFile = evt.codec.id;
            codecFile=evt.codec;
            //conversation.dataBroker.addCodec(codecFile);
            //codecFile.addListener(onData);
            //document.getElementById('fileSharing').style.visibility = 'visible';
        }
        break;
    case 'onaddlocalstream':

        console.log("local stream added");
        localVideo = document.getElementById('video');
        localStream = evt;
        //attachMediaStream(localVideo, evt.stream);
        
        //document.getElementById('updateConversation').style.visibility = 'visible';
        //document.getElementById('hangup').style.visibility = 'visible';
        
        break;
    default:
        break;
    }
};

$scope.submitChatMsg = function(conversationObj){
    var messages = wonderFactory.getListMessages();
    var newMessage = new Object();

     var d = new Date(),
     chatDate = ('0' + d.getDate()).slice(-2) + '/' + ('0'+(d.getMonth()+1)).slice(-2) + '/' + d.getFullYear() + ', ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
     newMessage.date = chatDate;
     console.log("submitChatMsg $scope.conversation....", $scope.conversation);
    $(".textArea textarea").focus();
    var isIdent;
    var chatMsg = $('.textAreaWrapper textarea'),
        chatMsgBottom = $('.textAreaWrapperBottom textarea'),
        subjectMsg = $('.chatSubject input');

    var conversation = $scope.conversation.conversation;
    var participant = conversation.getParticipant($scope.friend);
    
    var list = sessionManagerFactory.getListConversations();

    if(participant.RTCPeerConnection.iceConnectionState){
            var newMessage = new DataMessage(codecIDChat,"", wonderFactory.getMyIdentity().rtcIdentity, chatMsgBottom.val());                           
            $scope.conversation.messages.push(newMessage);
            console.log("CODEC_----___", codecChat)
            codecChat.send(JSON.stringify(newMessage));
            //sessionManagerFactory.setListConversations(list);
            sessionManagerFactory.addConversation($scope.conversation);
            $('.chatMessages').append('<li><img class="avatar avatar-sm" src="' + wonderFactory.getMyIdentity().avatar + '" alt="Img"/><span>'+ chatMsgBottom.val() +'<p>'+ wonderFactory.getMyIdentity().username+' <i class="fa fa-circle font8"></i> '+ chatDate +'</p></span></li>');
            $scope.chatScrollToBottom(1);
            $('.textArea textarea').val('').attr('placeholder', '');
       }else{
            var newMessage = MessageFactory.createDataMessage(wonderFactory.getMyIdentity(), $scope.friend.rtcIdentity, chatMsg.val(), conversation.id)
            newMessage.text =chatMsg.val();
            $scope.conversation.messages.push(newMessage);
            participant.resources[0].codec.send(newMessage);
            sessionManagerFactory.addConversation($scope.conversation);
                            //sessionManagerFactory.setListConversations(list);
            }



    /*for(var i =0 ; i< list.length; i++){
        if(list[i].conversation){
            console.log("conversas....",list[i].conversation.participants[0].identity.rtcIdentity )
            console.log("conversas....",$scope.friend.rtcIdentity )
                for(var j=0;j<list[i].conversation.participants.length;j++){
                    if(list[i].conversation.participants[j].identity.rtcIdentity == $scope.friend.rtcIdentity){
                        if(list[i].conversation.participants[j].RTCPeerConnection.iceConnectionState){
                            var newMessage = new DataMessage(codecIDChat,"", wonderFactory.getMyIdentity().rtcIdentity, chatMsgBottom.val());                           
                            list[i].messages.push(newMessage);
                            console.log("CODEC_----___", codecChat)
                            codecChat.send(JSON.stringify(newMessage));
                            //sessionManagerFactory.setListConversations(list);
                            sessionManagerFactory.addConversation(list[i]);
                        }else{
                            var newMessage = MessageFactory.createDataMessage(wonderFactory.getMyIdentity(), $scope.friend.rtcIdentity, chatMsg.val(), list[i].conversation.id)
                            newMessage.text =chatMsg.val();
                            list[i].messages.push(newMessage)
                            list[i].conversation.participants[j].resources[0].codec.send(newMessage);
                            sessionManagerFactory.addConversation(list[i]);
                            //sessionManagerFactory.setListConversations(list);
                        }
                    }
                }
        }
    }*/

    // Em chat adhoc as mensagens estão a ser publicadas e recebidas por quem envia

    /*if(chatMsg.val() && chatMsg.is(':focus')){// como está a receber isto deixa de 
        console.log("submitMsg chatMsg", chatMsg.val());
        $('.chatMessages').append('<li><img class="avatar avatar-sm" src="' + wonderFactory.getMyIdentity().avatar + '" alt="Img"/><span>'+ chatMsg.val() +'<p>'+ wonderFactory.getMyIdentity().username+' <i class="fa fa-circle font8"></i> '+ chatDate +'</p></span></li>');
        $scope.chatScrollToBottom(0);
        $('.textArea textarea').val('').attr('placeholder', '');
        return;
    }

    if(chatMsgBottom.val() && chatMsgBottom.is(':focus')){
        console.log("submitMsg chatMsgBottom", chatMsgBottom.val());
        $('.chatMessages').append('<li><img class="avatar avatar-sm"  src="' + wonderFactory.getMyIdentity().avatar + '" alt="Img"/><span>'+ chatMsgBottom.val() +'<p>' +wonderFactory.getMyIdentity().rtcIdentity.split("@")[0] +' <i class="fa fa-circle font8"></i> '+ chatDate +'</p></span></li>');
            $scope.chatScrollToBottom(1);

            $('.textArea textarea').val('').attr('placeholder', '');
            return;
    }

    if(subjectMsg.val() && subjectMsg.is(':focus')){
        console.log("submitMsg subjectMsg", subjectMsg.val());
        $('.chatMessages').append('<li class="info"><img class="avatar avatar-sm" src="css/images/info.png" alt="Img"/><span><i class="fa fa-circle green font8"></i> <a href="#">Afonso Neves</a> alterou o assunto para "'+ subjectMsg.val() +'"<p>'+ chatDate +'</p></span></li>');
            $scope.chatScrollToBottom(0);
            $('.chatSubject input').val('').attr('placeholder', '');
            return;
    }*/

}

$scope.AddUserToGroup= function(userToGroup){
    console.log("user", userToGroup);

}
 $scope.hangupBtn = function(conversation){
   localVideo.src='';
   $scope.pageLayout('home');
   console.log("hangupppp conversation", conversation)

   sessionManagerFactory.removeConversation(conversation);

   if(conversation.conversation != null){

    if(conversation.conversation.owner.identity.rtcIdentity == wonderFactory.getMyIdentity().rtcIdentity){
               conversation.conversation.close();
               conversation.conversation = null;
        }else {
                conversation.conversation.bye();
                conversation.conversation = null;
            }
        }
                        //list.splice(i,1);



   /*var list = sessionManagerFactory.getListConversations();
   for(var i =0 ; i< list.length; i++){
       if(list[i].conversation){
            for(var j =0 ; j< list[i].conversation.participants.length; j++){
            
                if(list[i].conversation.participants[j].identity.rtcIdentity == $scope.friend.rtcIdentity){
                    if(list[i].conversation != null && list[i].conversation.owner.identity.rtcIdentity){
                        list[i].conversation.close();
                        list[i].conversation = null;
                        //list.splice(i,1);
                        sessionManagerFactory.setListConversations(list);
                    }else if(list[i].conversation != null){
                        list[i].conversation.bye();
                        list[i].conversation = null;
                        //list.splice(i,1);
                        sessionManagerFactory.setListConversations(list);
                    }
                }
            }
        }
    }*/
}
 

    $scope.Acceptbtn = function(){

        $scope.actividade = false;
        $scope.call = true;
        $scope.pageLayout('videoCall');
        var list = sessionManagerFactory.getListConversations();
         if(messageP.from.rtcIdentity == messageP.requester){
                
                if(sessionManagerFactory.getListConversations()[0]){
                    var invitation = new Object();
                    invitation.hosting = messageP.body.hosting;
                    for(var i = 0; i < messageP.body.peers.length ; i++){
                        sessionManagerFactory.getListConversations()[0].conversation.addParticipant(messageP.body.peers[i], invitation, constraints, function(){}, function(){});
                    }
                }else{
                    $('#incomingCallModal').modal('show');
                    $("#caller").text(messageP.from.rtcIdentity);
                    $("#incomingCallModal").draggable({
                        handle: ".modal-header"
                    });
                    conversation = new Conversation(wonderFactory.getMyIdentity(),$scope.onRTCEvt, contactManager.onMessage,  iceServers, '', messageP.contextId);

                    conversation.acceptRequest(messageP, function(){}, function(){} , messageP.contextId);
                    for(var i=0; i<conversation.participants.length;i++){
                        conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                        conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                        conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
                    }
                    var messages = [];
                    var conversationObj = new Object();
                    conversationObj.users = $scope.friend.rtcIdentity;
                    conversationObj.messages = messages;
                    conversationObj.conversation = conversation;
                    conversation.dataBroker.addCodec(codecChat);
                    
                    list.push(conversationObj);

                    //sessionManagerFactory.setListConversations(list); 
                    sessionManagerFactory.addConversation(conversationObj);
                    $scope.conversation = conversationObj;

                }
                 $('#incomingCallModal').modal({backdrop: 'static'}).modal('hide');
                
                var Cancelbtn = document.getElementById('CancelButton');
                if(Cancelbtn)
                    Cancelbtn.onclick = function(){
                        if($('#modalInviting').hasClass('in'))
                            $('#modalInviting').modal('hide');
                        
                        closeConversation();
                    }
            }else{
            if($('#incomingCallModal').hasClass('in'))
            conversation = new Conversation(wonderFactory.getMyIdentity(), $scope.onRTCEvt, contactManager.onMessage,  iceServers, messageP.body.constraints, messageP.contextId);
            conversation.acceptInvitation(messageP, "", function(){}, function(){});
            for(var i=0; i<conversation.participants.length;i++){
                conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                
            }
           
            var messages = [];
            var conversationObj = new Object();
            conversationObj.users = $scope.friend.rtcIdentity;
            conversationObj.messages = messages;
            conversationObj.conversation = conversation;
            conversation.dataBroker.addCodec(codecChat);
            list.push(conversationObj);
            $scope.conversation = conversationObj;
            console.log("BOMMM", conversation)
            //sessionManagerFactory.setListConversations(list);
            sessionManagerFactory.addConversation(conversationObj);

            //sessionManagerFactory.getListConversations()[0].conversation.dataBroker.addCodec(codecChat);
            $('#incomingCallModal').modal({backdrop: 'static'}).modal('hide');
        }
    }
    
    $scope.updateConversation = function(){
        $scope.pageLayout('audioCall');

        console.log("updating conversation ", $scope.conversation);

        conversation = $scope.conversation.conversation;

        conversation.addResource([{type : ResourceType.AUDIO_VIDEO, direction : "in_out"}, {type : ResourceType.CHAT, direction : "in_out"}],"",function(){}, function(){});   
    
        /*for(var i =0;i<sessionManagerFactory.getListConversations().length;i++){
            if(sessionManagerFactory.getListConversations()[i].conversation){
                for(var j =0;j<sessionManagerFactory.getListConversations()[i].conversation.participants.length;j++){
                    if(sessionManagerFactory.getListConversations()[i].conversation.participants[j].identity.rtcIdentity == $scope.friend.rtcIdentity)
                        sessionManagerFactory.getListConversations()[i].conversation.addResource([{type : ResourceType.AUDIO_VIDEO, direction : "in_out"}, {type : ResourceType.CHAT, direction : "in_out"}],"",function(){}, function(){});            
                }       
            }
        }*/
        
    }

    $scope.addGroup = function(nameGroup){
        var groups = wonderFactory.getListGroups();
        var exist=false
            //Verificar se o grupo existe
            for(var i=0;i<groups.length;i++){

                if (nameGroup==groups[i].name){
                    exist=true; 
                   $('#addGroupModal').modal({backdrop: 'static'}).modal('hide');//Fechar a janela de addgroup
                   $('#closeaddGroupModal').modal({backdrop: 'static'}).modal('show');//abrir janela de erro

                  
                }
            }
            if(exist==false){            
                var g = [];              
                g.users = []                           
                g.name =nameGroup;
                groups.push(g);
                var msg1 = new MessageFactory.createCRUDMessage( "creat", "Groups" ,"", "", nameGroup);
                wonderFactory.getMyIdentity().messagingStub.sendMessage(msg1, contactManagerFactory.creatGroupSuccess);
                $('#addGroupModal').modal({backdrop: 'static'}).modal('hide');//Fechar a janela de addgroup

                }      
            
        
        
    }
     $scope.reCall = function(peers){
        console.log("ppeeeeersss--", peers)
     }
    $scope.Rejectbtn = function(){
        $('#incomingCallModal').modal({backdrop: 'static'}).modal('hide');
        Conversation.reject($scope.message);
    }
    $scope.home = function(){
        $scope.actividade = true;
        $scope.call = false;

       $scope.pageLayout('home');
    
    }
    var receiveMessage = function(message, flag){
        var id = null;        
        var isconversation = false; 
        console.log("----RECEIVE", message)
        if(!flag){
           var list = sessionManagerFactory.getListConversations();
           for(var i =0 ; i< list.length; i++){
                if(list[i].conversation){
                   // if(list[i].conversation.id == message.contextId){
                        wonderFactory.getIdentity(message.from, function (identi){id = identi;} );
                        list[i].messages.push(message);
                        sessionManagerFactory.setListConversations(list);
                        sessionManagerFactory.addConversation(list[i]);
                    //}
                }
            }
        }
        $scope.actividade = false;
        $scope.call = true;
        var d = new Date(),
        chatDate = ('0' + d.getDate()).slice(-2) + '/' + ('0'+(d.getMonth()+1)).slice(-2) + '/' + d.getFullYear() + ', ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
        console.log("------", id)
        //$scope.friend = identity;
        $(".textArea textarea").focus();

        // distinguir se mensagem vem pelo nsg stub ou pelo data channel pq estamos a usar formatos diferentes

        if(!message.body.text){
            $('.chatMessages').append('<li><img class="avatar avatar-sm" src="' +id.avatar +' " alt="Img"/><span>'+ message.body +'<p>'+ id.username+' <i class="fa fa-circle font8"></i> '+ chatDate +'</p></span></li>');
                $scope.chatScrollToBottom(1);
            $('.textArea textarea').val('').attr('placeholder', '');
        }else{
            $('.chatMessages').append('<li><img class="avatar avatar-sm" src="' +id.avatar +' " alt="Img"/><span>'+ message.body.text +'<p>'+ id.username+' <i class="fa fa-circle font8"></i> '+ chatDate +'</p></span></li>');
                $scope.chatScrollToBottom(0);
            $('.textArea textarea').val('').attr('placeholder', '');
        }
}
var  closeConversation = function(){ 
    
    conversation.close();
    conversation=null;
  
    $scope.pageLayout('chat');
}

$scope.Cancelar = function(){
    closeConversation();
}
 $scope.onDropComplete=function(data,evt){
      console.log("URSO")
}
$scope.onDragComplete=function(data,evt, user){
     console.log("URSa", user)
}


var removeVideoTag = function(participant, conversationObj){

    var div = document.getElementById(participant); // deve ser mm objecto do tipo Participante

    if(div != null && div.parentNode!=null)
        div.parentNode.removeChild(div)
    var divRemote = document.getElementById('remotes');
    if(divRemote.childElementCount == 0){
        $scope.hangupBtn(conversationObj);
        //$('.videoScreen').hide();
        $scope.pageLayout('chat');
    }
        
}

    contactManager.onMessage = function (message) {
        
        console.log("ContactManager onMessage---", message)
        switch (message.type) {

            case MessageType.CRUD_OPERATION:
                
                break;

            case MessageType.ACCEPTED:
                if(message.body.connectionDescription){
                    $scope.pageLayout('videoCall'); 
                    sessionManagerFactory.getListConversations()[0].conversation.dataBroker.addCodec(codecChat);
                }
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
                var list = sessionManagerFactory.getListConversations();
                var conversationObj = sessionManagerFactory.getConversationById(message.contextId);
                var conversation;
                var idx ;

                console.log("BYE received for conversation ", conversationObj);

                sessionManagerFactory.removeConversation(conversationObj);

                if (conversationObj)
                    conversation = conversationObj.conversation;
                /*for(var i = 0; i<list.length; i++){
                    if(list[i].conversation)
                        if(message.contextId == list[i].conversation.id){
                            conversation = list[i].conversation;
                            idx = i;
                        }
                }*/
                // BYE from Third Party
                    if(message.from.rtcIdentity == message.requester){
                        if(message.body != null){
                            if(message.body.peers.length > 1)
                                closeConversation();
                            else{
                                conversation.removeParticipant(message.body.peers[0], function(){}, function(){});
                            }
                        }else{
                            closeConversation();
                        }
                        list[idx].conversation = null;
                        //sessionManagerFactory.setListConversations(list);
                        
                    }
                    else{

                        // BYE from Owner. Let's close and clean
                        if(conversation != null && message.from.rtcIdentity == conversation.owner.identity.rtcIdentity){
                            console.log("Bye received from owner closing ..");

                                peersString = "";
                                localVideo.src = '';
                                conversation.close();
                                conversation = null;
                                var div = null;
                                codecChat.id = null;
                                codecFile.id=null;
                                
                                var div = document.getElementById('remotes');

                                while(div.firstChild){
                                    console.log("div.firstChild: ", div.firstChild);
                                    div.removeChild(div.firstChild);
                                }
                                //list[idx].conversation = null;
                                // sessionManagerFactory.setListConversations(list);   
                                //sessionManagerFactory.removeConversation(conversationObj);

                        }

                        if (conversation != null && conversation.getStatus() === ConversationStatus.CLOSED) {
                            localVideo.src = '';
                            conversation = null;
                            div = null;
                            codecChat.id = null;
                            codecFile.id=null;
                            //list[idx].conversation = null;
//                            sessionManagerFactory.setListConversations(list);
                            //sessionManagerFactory.removeConversation(conversationObj);
                            
                        }
                        // Conversa desligada pelo peer que não é o owner. Vamos apenas remover a janela de video do peer
                        if(conversation != null && message.from.rtcIdentity != conversation.owner.identity.rtcIdentity){
                             var divRemote = document.getElementById('remotes');
                             if(divRemote.childElementCount == 1){
                                removeVideoTag(conversation.owner.identity.rtcIdentity, conversationObj);
                                div = null;
                                //$scope.hangupBtn(conversationObj); // Deve bastar fazer conversation.close();
                                //$('.videoScreen').hide();
                                //$scope.pageLayout('chat');
                             }
                        }
                    removeVideoTag(message.from.rtcIdentity, conversationObj);
                    
                    $scope.pageLayout('home');
                    if($('#modalInvite').hasClass('in'))
                        $('#modalInvite').modal({backdrop: 'static'}).modal('hide');
                }
                
                break;
            case MessageType.OFFER_ROLE: // set new moderator of the conversatoin
                
                break;
            case MessageType.INVITATION:
                var it;
                console.log("---", message.from)
                wonderFactory.getIdentity(message.from.rtcIdentity, function (identi){
                it = identi;
                } );
                if(it.avatar){
                    $scope.friend= it
                    $scope.pageLayout('chat');
                }
               
                messageP = message;
                var identity = wonderFactory.getMyIdentity();
                var list = sessionManagerFactory.getListConversations();
                if(message.from.rtcIdentity == message.requester){
                  
                   
                     if(sessionManagerFactory.getListConversations()[0]){
                        var invitation = new Object();
                        invitation.hosting = messageP.body.hosting;
                        for(var i = 0; i < message.body.peers.length ; i++){
                            sessionManagerFactory.getListConversations()[0].conversation.addParticipant(message.body.peers[i], invitation, message.body.resourceConstraints, function(){}, function(){});
                        }
                    }else{

                        if(sessionManagerFactory.getListConversations()[0]){
                            var invitation = new Object();
                            invitation.hosting = messageP.body.hosting;
                            for(var i = 0; i < messageP.body.peers.length ; i++){
                                sessionManagerFactory.getListConversations()[0].conversation.addParticipant(messageP.body.peers[i], invitation, constraints, function(){}, function(){});
                            }
                        }else{
                            
                            conversation = new Conversation(wonderFactory.getMyIdentity(),$scope.onRTCEvt, contactManager.onMessage,  iceServers, '', messageP.contextId);

                            conversation.acceptRequest(messageP, function(){}, function(){} , messageP.contextId);
                            for(var i=0; i<conversation.participants.length;i++){
                                conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                                conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                                conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
                            }
                            var messages = [];
                            var conversationObj = new Object();
                            conversationObj.users = $scope.friend.rtcIdentity;
                            conversationObj.messages = messages;
                            conversationObj.conversation = conversation;
                            conversation.dataBroker.addCodec(codecChat);
                            list.push(conversationObj);

                            //sessionManagerFactory.setListConversations(list); 
                            sessionManagerFactory.addConversation(conversationObj);
                            $scope.conversation = conversationObj;
                        }
                    }
                 
            }else{
                             
                    if(message.from.rtcIdentity == message.requester){
                    
                        $('#incomingCallModal').modal('show');
                        $("#caller").text(message.from.rtcIdentity);
                       
                       
                }else{
                    
                    messageP = message;
                    

                    if(message.body.constraints.length == 1){
                        if(message.body.constraints[0].type == ResourceType.ADHOC_CHAT){
                            var list = sessionManagerFactory.getListConversations();
                            conversation = new Conversation(wonderFactory.getMyIdentity(), $scope.onRTCEvt, contactManager.onMessage, iceServers, messageP.body.constraints, messageP.contextId);
                            conversation.acceptInvitation(messageP, "", function(){}, function(){});
                            for(var i=0; i<conversation.participants.length;i++){
                               // $scope.pageLayout('chat');
                                conversation.participants[i].identity.messagingStub.addListener(conversation.participants[i].identity.onMessage.bind(conversation.participants[i].identity));
                                conversation.participants[i].identity.addListener(conversation.participants[i].resources[0].codec.onData.bind(conversation.participants[i].resources[0].codec), conversation.participants[0].identity.rtcIdentity);
                                conversation.participants[i].resources[0].codec.addListener(onData.bind(conversation.participants[i].resources[0].codec));
                            }
                            var messages = [];
                            var conversationObj = new Object();
                            conversationObj.users = $scope.friend.rtcIdentity;
                            conversationObj.messages = messages;
                            conversationObj.conversation = conversation;
                            list.push(conversationObj);

                            //sessionManagerFactory.setListConversations(list);
                            sessionManagerFactory.addConversation(conversationObj);
                            $scope.conversation = conversationObj;

                        }else{
                            $('#incomingCallModal').modal('show');
                            $("#caller").text(message.from.rtcIdentity);
                        }
                    }else{
                        $('#incomingCallModal').modal('show');
                        $("#caller").text(message.from.rtcIdentity);
                        $scope.pageLayout('videoCall');
                    }
                    $("#incomingCallModal").draggable({
                        handle: ".modal-header"
                    });
                    $scope.message = message;
                }
            }
                
                break;
            case MessageType.RESOURCE_REMOVED:
                conversation.removeResource(message.constraints,message);
                break;
            case MessageType.REMOVE_PARTICIPANT:
                localVideo.src = '';
                conversation = null;
                var div = document.getElementById('remotes');

                while(div.firstChild){
                    console.log("div.firstChild: ", div.firstChild);
                    div.removeChild(div.firstChild);
                }
                break;
            case MessageType.SHARE_RESOURCE:
                
                break;
            case MessageType.UPDATE:
                console.log("UPDATE RECEIVED", message);
                $scope.friend = message.from;
                $scope.pageLayout('videoCall');
                $scope.actividade = false;
                $scope.call = true;
                var list = sessionManagerFactory.getListConversations();
                for(var i = 0; i< list.length;i++){
                    if(list[i].conversation){
                        for(var j=0; j<list[i].conversation.participants.length;j++){
                            if(list[i].conversation.participants[j].identity.rtcIdentity == message.from.rtcIdentity){
                                sessionManagerFactory.getListConversations()[i].conversation.addResource(message.body.newConstraints, message,function(){
                                 attachMediaStream(localVideo,localStream);
                             },function(){}); 
                            }
                        }
                    }
                    console.log("list[i].participants", list[i].participants);
                }
                // HTML5 BUG WORKAROUND
                // The HTML5 video tag element does not display new MediaTracks when added, so you have to manually reattach the media stream
                   
                break;
            case MessageType.UPDATED:
            
                $scope.pageLayout('videoCall');
                break;
            case MessageType.SUBSCRIBE:
                
                break;
            case MessageType.CONTEXT:
                var groups = wonderFactory.getListGroups();
                for(var i = 0;i<groups.length;i++){
                    for(var j=0;j< groups[i].users.length;j++){
                        if(groups[i].users[j].rtcIdentity == message.from){
                            groups[i].users[j].state = message.body.presence;
                            
                            if(message.body.presence == "online"){
                                var c = document.getElementById(message.from +"s");
                                c.innerHTML = "<i class='fa fa-circle green font14'> </i> online";
                                groups[i].users[j].statecss = "fa fa-circle green font14";
                                groups[i].users[j].presence ="online"
                            }else{
                                if(message.body.presence == "off-line"){
                                    var c = document.getElementById(message.from +"s");
                                    c.innerHTML = "<i class='fa fa-circle-o font14'> </i> off-line";
                                    groups[i].users[j].statecss = "fa fa-circle-o font14";
                                    groups[i].users[j].presence ="off-line"
                                }else{
                                    if(message.body.presence == "ocupado"){
                                        var c = document.getElementById(message.from +"s");
                                        c.innerHTML = "<i class='fa fa-circle yellow font14'> </i> ocupado";
                                        groups[i].users[j].statecss = "fa fa-circle yellow font14";
                                        groups[i].users[j].presence ="ocupado"
                                    }else{
                                        if(message.body.presence == "ausente"){
                                            var c = document.getElementById(message.from +"s");
                                            c.innerHTML = "<i class='fa fa-circle red font14'> </i> ausente";
                                            groups[i].users[j].statecss = "fa fa-circle red font14";
                                            groups[i].users[j].presence ="ausente"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
               // wonderFactory.setListGroups(groups);
                break;
            case MessageType.MESSAGE:
                receiveMessage(message);
                break;
            default:
                
               break;
       }
    }

var onData = function(code,msg) {
    console.log("onData msg", msg);
    msg = JSON.parse(msg);
    receiveMessage(msg);
}

$scope.addVideoTag = function(evt){
    console.log("addVideoTag evt", evt)
    var div = document.createElement('div');
    div.className = 'video-container';
    if(!evt.participant.identity){
       
        div.id = wonderFactory.getMyIdentity().rtcIdentity;
    }else{
         div.id = evt.participant.identity.rtcIdentity;
    }
    
    var aux = 'video' + iterator;
    var id = 'onclick="myFunction(' + "'" +aux +"'" + ')"';     // para passar para video principal

    var $video = $('<video id="video'+ iterator +'" autoplay width="50%" height="100%" ' + id+' muted="false"></video>');  // para o video remoto temos o audio unmuted

    if (evt.participant.identity.rtcIdentity == wonderFactory.getMyIdentity().rtcIdentity)
            var $video = $('<video id="video'+ iterator +'" autoplay width="50%" height="100%" ' + id+' muted="true"></video>'); // para o video local temos o audio muted

    $(div).append(angular.element($video));

    $('#remotes').append(angular.element($(div)));
    

    var videoRemote = document.getElementById("video"+iterator);
    attachMediaStream(videoRemote,evt.stream)
    iterator = iterator +1;
    
}
});
   


contactManager.factory('contactManagerFactory', function(){
    
    var factory = {};
    
    var listAllUsers = [];
    var listGroups = [];

    factory.callBackRemove = function(message)
    {
       console.log("callBackRemove", message);
    };
    
    factory.creatGroupSuccess = function(message)
    {
       console.log("Grupo Criado", message);
    };
    factory.getListAllUsers = function()
    {
        return listAllUsers;
    };
    
    factory.setListAllUsers = function(newListAllUsers)
    {
        listAllUsers = newListAllUsers;
    };

     factory.callBackRemoveUser = function(message)
    {
       console.log("callBackRemoveUser", message);
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