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

	$('[data-target="#removeUserModal"]').on('click', function(){
		var remTrigger = $(this),
			remModal = $('#removeUserModal'),
			remParent = remTrigger.parents().eq(2),
			remContactName = remParent.find('.avatar+span').text();

		remModal.find('label > span').text(remContactName);

		$('.removeUserBtn').on('click', function(){
			remParent.remove();
		});

	});

	// END

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

	  //  		if(cancelName2.html() == cancelName){
			// 	cancelName2.next().removeAttr('onclick').addClass('canceledInvite').text('Convite Cancelado');
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

		$(".sidebarBodyInner").find('.panel:not(:last-child)').not().each(function(){
			var panelName = $(this).find('.panel-title').text();

			$("#removeGroupModal").find('.removeGroups').append('<li class="clearfix"><div class="pull-left font18">'+panelName+'</div><div class="pull-right"> <button class="removeGroupBtn wonderBtn pull-right font18"><i class="fa fa-folder-open composed"><span>-</span></i> Remover</button></div></li>');
		});

		$(".removeGroupBtn").on('click', function(){
			var rmBtn = $(this),
			rmBtnIndex = rmBtn.closest('li').index()+1,
			paneSelector = $('#collapse'+rmBtnIndex),
			paneContent = paneSelector.find('.sidebarContacts').html();

			$(".sidebarBodyInner .panel:last-child").find('.sidebarContacts').append(paneContent).find('.noContactsInList').remove();
			rmBtn.closest('li').remove();
			paneSelector.closest('.panel').remove();
		});

	});

	// END

});


$(window).on('resize', function() {
	mainSidebarCalcs();
});