var countslide = 0;
var my_range;
var my_range1;
var my_range2;
var my_range3;

function getBooking(fe_typo_user,action,indexSlide) {

    $('.loader2').show();

    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
            type: 'GET',
            url:url,
            dataType: "jsonp",
			jsonp: 'callback',
			jsonpCallback: 'cdispoToken',
            data: {fe_typo_user:fe_typo_user,action:'getBooking'},
            success: function(result, status, jqXHR) {

                //console.log("result is " + result);

                //console.log(JSON.stringify(jqXHR.responseJSON));
                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            window.clearInterval(i);
                         }
                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });
                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.modification-block').hide();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;

                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        else {
                            if (result.gotoSlide>=0) {
                                $('.main-slider').slick('slickGoTo', result.gotoSlide);
                            }
                        }
                    } else {
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');

                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('#btn_close').hide();
                        $('#btn_cancel').hide();
                        $('.info-block').show();
                    }
                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();

                } else {

                }
                $('.loader2').hide();

            },

            error: function(xhr, ajaxOptions, thrownError) {
                $('.loader2').hide();
                alert(ajaxOptions + " " + thrownError);
            }


    });


    /*
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("loadend", function(evt)
     {
       var result = this.response;
       if (result.result) {
            console.log('BAP');
            $('.main-slider').html(result.slide);
            console.log('BAP2');
            initSlickCarousel();
            console.log('BAP3');
        } else {

        }
        $('.loader2').hide();

     });

    xhr.open("POST", url);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    //xhr.setRequestHeader('Cookie', 'fe_typo_user='+cookievalue);
    xhr.withCredentials = true;
    xhr.send(null);
    */
    /*
    var data = cookievalue.split(";");
    var url3 = "http://cdispo_preprod.moonlikestudio.com/rest/cdispo-custom_rest-getbooking/"+data[1];
    $.ajax({
          type: 'GET',
          url:url3,
          dataType: "json",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function(result) {

                if (result.result) {
                    if (action == "refresh") {
                        //$('.main-slider').html('');
                        $('.main-slider').slick('unslick');
                    }
                    $('.main-slider').html(result.slide);

                    initSlickCarousel();
                } else {

                }
                $('.loader2').hide();
          },
          error: function(error) {
            console.log(error);
            $('.loader2').hide();
          }
    });
    */
}

function initPopin() {
    $('#btn_cancel').html('&nbsp;');
    $('#btn_cancel').attr('onclick','');
    $('#btn_close').text(trad['close']);
    $('#btn_close').attr('onclick','');
}

function getPreviewRessource(ressourceId,categoryRessource,fe_typo_user,from,indexSlide) {
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'getPreviewRessource',ressourceId:ressourceId,categoryRessource:categoryRessource,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
                    }
                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');
                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.info-block').show();

                }


                if (result.ressourcedeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');

                    if (from == "getBooking" || from == "getBookingToConfirm" || from == "getInvitations" || from == "getSharing" ) {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();$(\'.modification_block\').hide()');
                    }

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo" || from == "getBookingEvent" || from == "searchResults" || from == "search" || from == "scan") {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();$(\'.modification_block\').hide()');
                    }

                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');
                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();
                    //if (from == "getBooking")
                        //$('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.ok) {

                    initPopin();
                    $('.prewiewsharing_title').html(result.title);
                    if (result.mandatories) {
                        $('.prewiewsharing_mandatories').html(result.mandatories);
                    } else {
                        $('.prewiewsharing_mandatories').html('');
                    }
                    $('.previewsharing_content').html(result.content);
                    $('.prewiewsharing_header').show();

                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.modification-block\').hide();$(\'.message-block\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');
                    
                    if (result.plan && (from == "getBooking" || from == "getInvitations" || from == "getSharing" | from == "getBookingEvent" || from == "getBookingToConfirm" || from == "getScan")) {
                        $('#btn_cancel').text(trad['btn_geoloc']);
                        $('#btn_cancel').attr('onclick','geolocRessource('+ressourceId+',\''+categoryRessource+'\',\''+fe_typo_user+'\','+indexSlide+')');
                    } else {
                        $('#btn_cancel').text('');
                        $('#btn_cancel').attr('onclick','');
                    }

                    if (from == "getBooking" || from == "getBookingToConfirm" || from == "getInvitations" || from == "getSharing" ) {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();$(\'.modification_block\').hide()');
                    }
                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo" || from == "getBookingEvent" || from == "searchResults" || from == "search" || from == "scan") {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();$(\'.modification_block\').hide()');
                    }

                    $('.planlocalisation').html('');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();



                    console.log('getPreviewRessource success');
                } else {
                    console.log('getPreviewRessource error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('getPreviewRessource error');
                $('.loader2').hide();
          }
    });
}



function getUserInfo(fe_typo_user,owner_id,from,booking_id,ressourceId,category,indexSlide) {
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'getUserInfo',fe_typo_user:fe_typo_user,owner_id:owner_id},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');
                    $('.planlocalisation').html('');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }


                if (result.ok) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html(result.content);
                    console.log('From:'+from);

                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.modification-block\').hide();$(\'.message-block\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');
                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');
                    $('.planlocalisation').html('');

                    if (from == "getBooking" || from == "getBookingToConfirm" || from == "getInvitations" ) {
                         $('#btn_close').text(trad['sendmessageto']+' '+result.owner);
                         if (from == "getInvitations") {
							 $('.previewmessage_mandatories').html(trad['sendmessagetitle2']+'<b>'+result.owner+'</b>');
						 } else {
                             $('.previewmessage_mandatories').html(trad['sendmessagetitle']+'<b>'+result.owner+'</b>');
                         }

                         $('#message').val('');
                         $('#btn_close').attr('onclick','var myvalidate=$("#formmessage").validate();myvalidate.resetForm();$(\'.info-block\').hide();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').hide();$(\'.modification_block\').hide();$(\'.message-block\').show()');
                         $('#btn_send').attr('onclick','if ($("#formmessage").valid()) sendMessageToSharing('+booking_id+',$(\'#message\').val(),\''+fe_typo_user+'\',\''+from+'\','+ressourceId+',\''+category+'\','+indexSlide+')');
                         $('#btn_back2').attr('onclick','$(\'.info-block\').show();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').hide();$(\'.modification_block\').hide();$(\'.message-block\').hide()');
                         $('#btn_cancel').text(trad['btn_back']);
                         $('#btn_cancel').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();$(\'.modification_block\').hide()');
                    }
                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo" || from == "getBookingEvent") {
                         $('#btn_close').text(trad['sendmessageto']+' '+result.owner);
                         if (from == "getBookingEvent") {
							 $('.previewmessage_mandatories').html(trad['sendmessagetitle2']+'<b>'+result.owner+'</b>');
						 } else {
                             $('.previewmessage_mandatories').html(trad['sendmessagetitle']+'<b>'+result.owner+'</b>');
                         }
                         $('#message').val('');
                         $('#btn_close').attr('onclick','var myvalidate=$("#formmessage").validate();myvalidate.resetForm();$(\'.info-block\').hide();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').show();$(\'.modification_block\').hide();$(\'.message-block\').show()');
                         $('#btn_send').attr('onclick','if ($("#formmessage").valid()) sendMessageToSharing('+booking_id+',$(\'#message\').val(),\''+fe_typo_user+'\',\''+from+'\','+ressourceId+',\''+category+'\','+indexSlide+')');
                         $('#btn_back2').attr('onclick','$(\'.info-block\').show();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').show();$(\'.modification_block\').hide();$(\'.message-block\').hide()');
                         $('#btn_cancel').text(trad['btn_back']);
                         $('#btn_cancel').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();$(\'.modification_block\').hide()');
                    }
                    if (from == "searchResults") {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();$(\'.modification_block\').hide()');
                    }


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();


                    console.log('getUserInfo success');
                } else {
                    console.log('getUserInfo error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('getUserInfo error');
                $('.loader2').hide();
          }
    });
}



function getSiteInfo(site_id,referentiel_id,fe_typo_user,from) {

    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'getSiteInfo',site_id:site_id,referentiel_id:referentiel_id,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
                    }
                    
                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');
                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.ok) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html(result.content);
                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.modification-block\').hide();$(\'.message-block\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');
                    $('#btn_cancel').text('');

                    if (from == "getBooking" || from == "getBookingToConfirm" || from == "getInvitations" || from == "getSharing" ) {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();$(\'.modification_block\').hide()');
                    }
                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo" || from == "getBookingEvent" || from == "searchResults" || from == "search" || from == "scan") {
                         $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();$(\'.modification_block\').hide()');
                    }

                    $('.planlocalisation').html('');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();



                    console.log('geSiteInfo success');

                } else {
                    console.log('geSiteInfo error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('geSiteInfo error');
                $('.loader2').hide();
          }

    });

}


function getVisibilityInfo(fe_typo_user,event_id,indexSlide) {
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'getVisibility',fe_typo_user:fe_typo_user,event_id:event_id},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');

                    $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.ok) {

                    initPopin();
                    $('.prewiewsharing_header').show();
                    $('.prewiewsharing_title').html(result.titleguest);
                    $('.previewsharing_content').html(result.content);

                    if (result.statut != 0) {

                        $('#btn_close').text(trad['btn_close']);
                        $('#btn_close').attr('onclick','$(\'.modification-block2\').hide();$(\'.modification-block\').hide();$(\'.message-block\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');
                        $('#btn_cancel').text('');

                    } else {
                        $('#btn_close').text(trad['sendmessagesharing']);
                        $('.previewmessage_mandatories').html(trad['sendmessagesharingmessage']+result.sharingId+'.<br/>'+trad['sendmessagesharingmessage2']);
                        $('#message').val('');
                        $('#btn_close').attr('onclick','var myvalidate=$("#formmessage").validate();myvalidate.resetForm();$(\'.info-block\').hide();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').hide();$(\'.modification_block\').hide();$(\'.message-block\').show()');
                        $('#btn_send').attr('onclick','if ($("#formmessage").valid()) sendMessageSharing('+result.sharingId+',$(\'#message\').val(),\''+fe_typo_user+'\','+indexSlide+')');
                        $('#btn_back2').attr('onclick','$(\'.info-block\').show();$(\'.main-slider\').hide();$(\'.nav-holder\').hide();$(\'#backtoshare\').hide();$(\'.modification_block\').hide();$(\'.message-block\').hide()');
                        $('#btn_cancel').text(trad['btn_back']);
                        $('#btn_cancel').attr('onclick','$(\'.modification-block2\').hide();$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();$(\'.modification_block\').hide()');
                    }


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();


                    console.log('getUserInfo success');
                } else {
                    console.log('getUserInfo error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('getUserInfo error');
                $('.loader2').hide();
          }
    });
}


function checkDeleteMyBooking(booking_id,category,ressourceid,fe_typo_user,index,action,eventressourceId,category2) {

    initPopin();
    $('.prewiewsharing_header').hide();
    $('.previewsharing_content').html(trad['confirmdeletebooking']);
    $('#btn_close').text(trad['validate']);
    $('#btn_close').attr('onclick','deleteMyBooking('+booking_id+',\''+category+'\','+ressourceid+',\''+fe_typo_user+'\','+index+',\''+action+'\','+eventressourceId+',\''+category2+'\')');
    $('#btn_cancel').text(trad['cancel']);
    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show()');

    $('.main-slider').hide();$('.nav-holder').hide();
    $('.info-block').show();
    $('#backtoshare').hide();

}

function deleteMyBooking(booking_id,category,ressourceid,fe_typo_user,index,action,eventressourceId,category2) {

    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'deleteMyBooking',booking_id:booking_id,category:category,ressourceid:ressourceid,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookingdeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                 if (result.sharinglocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharinglocked+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+index+')');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+index+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();

                    //clearInterval('x'+index);

                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                    console.log('deleteMyBooking success');

                } else {
                    console.log('deleteMyBooking error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('deleteMyBooking error');
                $('.loader2').hide();
          }

    });

}

function editMyBooking(booking_id,category,ressourceid,datestart,dateend,udatestart,udateend,fe_typo_user,domain,url,action,ressourceId,category2,indexSlide) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
        type: 'GET',
        url:url,
        dataType: "jsonp",
		jsonp: 'callback',
        jsonpCallback: 'cdispoToken',
        data:{action:"editBooking",booking_id:booking_id,fe_typo_user:fe_typo_user},

        success: function(result) {

            if (result.deconnexion) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                var url = window.location.href;
                url = url.substring(0, url.lastIndexOf("/") + 1);
                window.localStorage.clear();
                if (device.platform == "Android") {
                    $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                } else {
        					$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
        				}

                $('.main-slider').hide();
                $('.nav-holder').hide();
                $('.info-block').show();

            }


            if (result.bookingnotexist) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                $('.main-slider').hide();
                $('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookinginprogress) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookingfinished) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookingcancelled) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookinglocked1) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookinglocked2) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.bookingdeleted) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                if (action == "getBooking")
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                if (action == "getScan")
                    $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                $('.main-slider').hide();$('.nav-holder').hide();
                $('.info-block').show();

            }

            if (result.result) {

                $('#titre').val(result.titre);
                $('#description').val(result.description);
                $('#booking_adduser').html(result.guests);
                $('#booking_adduseremail').html(result.guestsemail);


                $('#btn_modifynow').unbind().click(function() {
                    var invites=$('.users').map(function(){
                        return $(this).val()
                    }).get();
                    var invitesemail=$('.usersemail').map(function(){
                        return $(this).val()
                    }).get();
                    checkBooking(booking_id,$('#modif_datestart').val(),$('#modif_dateend').val(),''+fe_typo_user+'',''+action+'',ressourceId,''+category2+'',''+$('#titre').val()+'',''+$('#description').val()+'',''+invites+'',''+invitesemail+'',''+indexSlide+'');
                });


                if (my_range1) {
                    my_range1.reset();
                    my_range1.destroy();
                }
                if (my_range2) {
                    my_range2.reset();
                    my_range2.destroy();
                }
                if (my_range3) {
                    my_range3.reset();
                    my_range3.destroy();
                }

                if (timecode) {
                    timecode = [];
                }

                var timecode = result.timecode;



                $('#modif_booking').val(booking_id);
                $('#modification_title').html(result.title);
                $('#date_start').text(result.firstDate);
                $('#date_end').text(result.lastDate);
                $('#modification_lien1').text(domain);
                $('#modification_lien1').attr('href',url);
                $('#btn_back').attr('onclick','unlockBooking(\''+fe_typo_user+'\','+booking_id+');$(\'.modification-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').hide();');
                $('#btn_modifynow').html(result.submittitle);

                //$('.modification-info').html(result.info);

                if (result.infosup) {
                    $('#modification_texte2').html(result.infosup);
                    $('.warning-block').show();
                    if (result.displaytitle)
                        $('.title-block').show();
                    else
                    $('.title-block').hide();
                } else {
                    $('.warning-block').hide();
                    $('.title-block').show();
                }

                if (!result.firstEditable && !result.lastEditable) {

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('#slider_holder1').hide();
                    $('#slider_holder2').hide();
                    $('#slider_holder3').hide();
                    $('.modification-block').hide();
                    $('#modif_datestart').val(result.dateStartBooking);
                    $('#modif_dateend').val(result.dateEndBooking);
                    setTimeout(function(){
                      $('.modification-block').show();
                    }, 1000);


                } else {

                    var step = 5 * 60;
                    moment.locale(lang);

                    $('#modif_datestart').val(result.dateStartBooking);
                    $('#modif_dateend').val(result.dateEndBooking);

                    //Dans le cas ou la plage est sur 1 jour => 1 slider (jour/heure)
                    //if (timecode.length <= 2) {
                    if (result.counttimecode < 100) {


                        var myvalues = [];
                        $('#slider_holder1').show();
                        $('#slider_holder2').hide();
                        $('#slider_holder3').hide();


                        for(var index in timecode) {
                            for(var index2 in timecode[index]) {
                                myvalues.push(timecode[index][index2]);
                            }
                        }

                        if (parseInt(result.dateStartBooking) < timecode[0][0]) {
                            var my_from1 = 0;
                            if (result.firstEditable)
                                $('#modif_datestart').val(timecode[0][0]);
                            else
                                $('#modif_datestart').val(result.dateStartBooking);
                        } else {
                            var my_from1 = myvalues.indexOf(parseInt(result.dateStartBooking));
                        }

                        var my_stepfrom1 = my_from1;
                        var my_to1 = myvalues.indexOf(parseInt(result.dateEndBooking));
                        var my_stepto1 = my_to1;
                        //var my_to1 = myvalues.length-1;

                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block').show();
                                if (result.firstEditable)
                                    $('#modif_datestart').val(data.from_value);
                                else
                                    $('#modif_datestart').val(result.dateStartBooking);
                                $('#modif_dateend').val(data.to_value);
                            },
                            onFinish: function (data) {
                                var invites=$('.users').map(function(){
                                    return $(this).val()
                                }).get();
                                var invitesemail=$('.usersemail').map(function(){
                                    return $(this).val()
                                }).get();
                                if (result.firstEditable)
                                    $('#modif_datestart').val(data.from_value);
                                else
                                    $('#modif_datestart').val(result.dateStartBooking);
                                $('#modif_dateend').val(data.to_value);

                                my_stepfrom1 = data.from;
                                my_stepto1 = data.to;

                            }
                        });

                        my_range1 = $(".js-range-slider1").data("ionRangeSlider");

                        my_range1.update({
                            type: "double",
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[0][0],
                            max: timecode[index][index2],
                            from: my_from1,
                            to: my_to1,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify1,
                            values: myvalues
                        });

                        if (!result.firstEditable) {
                            my_range1.update({from_fixed: true});
                        }

                        if (result.firstEditable) {
                            $('#leftpaddle1-1').on("touchstart touchmove", function(e) {
                            updateRangeFrom1b(+1);
                            });

                            $('#leftpaddle2-1').click(function() {
                            updateRangeFrom1b(-1);
                            });
                        }

                        $('#rightpaddle1-2').click(function() {
                          updateRangeTo1b(+1);
                        });
                        $('#rightpaddle2-2').click(function() {
                          updateRangeTo1b(-1);
                        });

                        var updateRangeFrom1b = function (direction) {
                            my_stepfrom1 = parseInt(my_stepfrom1)+direction;
                            if (my_stepfrom1 < 0) {
                                my_stepfrom1 = 0;
                            } else if (my_stepfrom1 > index2) {
                                my_stepfrom1 = index2;
                            }
                            my_range1.update({
                                from: my_stepfrom1
                            });

                        };

                        var updateRangeTo1b = function (direction) {
                            my_stepto1 = parseInt(my_stepto1)+direction;
                            if (my_stepto1 < 0) {
                                my_stepto1 = 0;
                            } else if (my_stepto1 > index2) {
                                my_stepto1 = index2;
                            }
                            my_range1.update({
                                to: my_stepto1
                            });
                        };

                    //Dans le cas ou la plage est sur plus  d'1 jour => 3 slider (jours,heure debut, heure fin)
                    } else {

                        var myvalues1 = [];
                        var myvalues2 = [];
                        var myvalues3 = [];
                        var indexStart1 = 0;
                        var indexEnd1 = 0;
                        var indexStart2 = 0;
                        var indexEnd2 = 0;
                        var indexEnd3 = 0;
                        $('#slider_holder1').show();
                        $('#slider_holder2').show();
                        $('#slider_holder3').show();

                        for(var index in timecode) {
                            for(var index2 in timecode[index]) {
                                if (index2 == 0)
                                    myvalues1.push(timecode[index][index2]);
                                if (timecode[index][index2] ==  parseInt(result.dateStartBooking)) {
                                    indexStart1 = index;
                                    indexStart2 = index2;
                                }
                                if (timecode[index][index2] ==  parseInt(result.dateEndBooking)) {
                                    indexEnd1 = index;
                                    indexEnd2 = index2;
                                }
                            }
                        }



                        my_from1 = myvalues1.indexOf(timecode[indexStart1][0]);
                        my_stepfrom1 = my_from1;
                        //var my_from1 = myvalues1.indexOf(timecode[indexStart1][indexStart2]);

                        var my_to1 = myvalues1.indexOf(timecode[indexEnd1][0]);
                        my_stepto1 = my_to1;
                        //var my_to1 = myvalues.length-1;
                        //var my_to1 = myvalues1.indexOf(timecode[indexEnd1][indexEnd2]);


                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block').show();
                                if (result.firstEditable)
                                    $('#modif_datestart').val(data.from_value);
                                else
                                    $('#modif_datestart').val(result.dateStartBooking);
                                $('#modif_dateend').val(data.to_value);
                            },

                            onFinish: function (data) {

                                myvalues2 = [];
                                myvalues3 = [];


                                for(let index3 in timecode) {
                                    for(let index4 in timecode[index3]) {
                                        //console.log('Timecode:'+index3+'/'+index4+'/'+timecode[index3][index4]);
                                        if (timecode[index3][index4] ==  data.from_value) {
                                            console.log('from found');
                                            indexStart1 = index3;
                                            indexStart2 = index4;
                                            my_stepfrom1 = index3;
                                        }
                                        if (timecode[index3][index4] ==  data.to_value) {
                                            //console.log('to found');
                                            indexEnd1 = index3;
                                            indexEnd2 = index4;
                                            my_stepto1 = index3;
                                        }
                                    }
                                }

                                //console.log('Index:'+data.from_value+'/'+data.to_value+':'+indexStart1+'/'+indexStart2+':'+indexEnd1+'/'+indexEnd2);

                                for(var index5 in timecode[indexStart1]) {
                                    myvalues2.push(timecode[indexStart1][index5]);
                                }

                                my_from2 = myvalues2.indexOf(timecode[indexStart1][indexStart2]);
                                var end2 = timecode[indexStart1].length-1;
                                var my_stepfrom2 = my_from2;

                                my_range2.update({
                                    grid: false,
                                    grid_snap: true,
                                    grid_num: 4,
                                    min: timecode[indexStart1][0],
                                    max: timecode[indexStart1][end2],
                                    from: my_from2,
                                    step: step,
                                    skin: "big",
                                    decorate_both: true,
                                    drag_interval: true,
                                    prettify: my_prettify3,
                                    values: myvalues2
                                });

                                if (result.firstEditable)
                                  $('#modif_datestart').val(timecode[indexStart1][indexStart2]);
                                else
                                  $('#modif_datestart').val(result.dateStartBooking);

                                for(var index6 in timecode[indexEnd1]) {
                                    myvalues3.push(timecode[indexEnd1][index6]);
                                }

                                var my_from3 = myvalues3.indexOf(timecode[indexEnd1][indexEnd2]);
                                var end3 = timecode[indexEnd1].length-1;
                                var my_stepfrom3 = my_from3;

                                my_range3.update({
                                    grid: false,
                                    grid_snap: true,
                                    grid_num: 4,
                                    min: timecode[indexEnd1][0],
                                    max: timecode[indexEnd1][end3],
                                    from: my_from3,
                                    step: step,
                                    skin: "big",
                                    decorate_both: true,
                                    drag_interval: true,
                                    prettify: my_prettify3,
                                    values: myvalues3
                                });

                                $('#modif_dateend').val(timecode[indexEnd1][indexEnd2]);

                            }
                        });

                        my_range1 = $(".js-range-slider1").data("ionRangeSlider");

                        my_range1.update({
                            type: "double",
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[0][0],
                            max: timecode[index][0],
                            from: my_from1,
                            to: my_to1,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify2,
                            values: myvalues1
                        });

                        if (!result.firstEditable) {
                            my_range1.update({from_fixed: true});
                        }

                        for(var index7 in timecode[indexStart1]) {
                            myvalues2.push(timecode[indexStart1][index7]);
                        }

                        var my_from2 = myvalues2.indexOf(timecode[indexStart1][indexStart2]);
                        my_stepfrom2 = my_from2;

                        if (result.firstEditable)
                          $('#modif_datestart').val(timecode[indexStart1][indexStart2]);
                        else
                          $('#modif_datestart').val(result.dateStartBooking);

                        $(".js-range-slider2").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();$('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block').show();
                                if (result.firstEditable)
                                    $('#modif_datestart').val(data.from_value);
                                else
                                    $('#modif_datestart').val(result.dateStartBooking);
                            },
                            onFinish: function (data) {

                              if (result.firstEditable)
                                  $('#modif_datestart').val(data.from_value);
                              else
                                  $('#modif_datestart').val(result.dateStartBooking);
                                my_stepfrom2 = data.from;

                            }
                        });

                        my_range2 = $(".js-range-slider2").data("ionRangeSlider");
                        var end2 = timecode[indexStart1].length-1;

                        my_range2.update({
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[indexStart1][0],
                            max: timecode[indexStart1][end2],
                            from: my_from2,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify3,
                            values: myvalues2
                        });

                        if (!result.firstEditable) {
                            my_range2.update({from_fixed: true});
                        }

                        for(var index8 in timecode[indexEnd1]) {
                            myvalues3.push(timecode[indexEnd1][index8]);
                        }

                        var my_from3 = myvalues3.indexOf(timecode[indexEnd1][indexEnd2]);
                        my_stepfrom3 = my_from3;

                       $(".js-range-slider3").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();$('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block').show();
                                $('#modif_dateend').val(data.from_value);
                            },
                            onFinish: function (data) {
                                $('#modif_dateend').val(data.from_value);
                                my_stepfrom3 = data.from;

                            }
                        });

                        my_range3 = $(".js-range-slider3").data("ionRangeSlider");
                        var end3 = timecode[indexEnd1].length-1;


                        my_range3.update({
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[indexEnd1][0],
                            max: timecode[indexEnd1][end3],
                            from: my_from3,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify3,
                            values: myvalues3
                        });

                        if (result.firstEditable) {
                            $('#leftpaddle1-1').on("touchstart touchmove", function(e) {
                            updateRangeFrom1(+1);
                            });

                            $('#leftpaddle2-1').click(function() {
                            updateRangeFrom1(-1);
                            });
                        }

                        $('#rightpaddle1-2').click(function() {
                          updateRangeTo1(+1);
                        });
                        $('#rightpaddle2-2').click(function() {
                          updateRangeTo1(-1);
                        });

                        if (result.firstEditable) {
                            $('#leftpaddle2').click(function() {
                                updateRangeFrom2(-1);
                            });
                            $('#rightpaddle2').click(function() {
                                updateRangeFrom2(+1);
                            });
                        }

                        $('#leftpaddle3').click(function() {
                          updateRangeFrom3(-1);
                        });

                        $('#rightpaddle3').click(function() {
                          updateRangeFrom3(+1);
                        });

                        var updateRangeFrom1 = function (direction) {
                            my_stepfrom1 = parseInt(my_stepfrom1)+direction;
                            if (my_stepfrom1 < 0) {
                                my_stepfrom1 = 0;
                            } else if (my_stepfrom1 > index) {
                                my_stepfrom1 = index;
                            }
                            my_range1.update({
                                from: my_stepfrom1
                            });


                        };

                        var updateRangeTo1 = function (direction) {
                            my_stepto1 = parseInt(my_stepto1)+direction;
                            if (my_stepto1 < 0) {
                                my_stepto1 = 0;
                            } else if (my_stepto1 > index) {
                                my_stepto1 = index;
                            }
                            my_range1.update({
                                to: my_stepto1
                            });
                        };

                        var updateRangeFrom2 = function (direction) {
                            my_stepfrom2 = parseInt(my_stepfrom2)+direction;
                            if (my_stepfrom2 < 0) {
                                my_stepfrom2 = 0;
                            } else if (my_stepfrom2 > end2) {
                                my_stepfrom2 = end2;
                            }
                            my_range2.update({
                                from: my_stepfrom2
                            });
                        };

                        var updateRangeFrom3 = function (direction) {
                            my_stepfrom3 = parseInt(my_stepfrom3)+direction;
                            if (my_stepfrom3 < 0) {
                                my_stepfrom3 = 0;
                            } else if (my_stepfrom3 > end3) {
                                my_stepfrom3 = end3;
                            }
                            my_range3.update({
                                from: my_stepfrom3
                            });
                        };
                    }
                }

            }

            console.log('editBooking success');

            $('.loader2').hide();
            $('#backtoshare').hide();
        },
          error: function(error) {
                console.log('deleteMyBooking error');
                $('.loader2').hide();
          }

    });

}




function checkBooking(idBooking,dateStart,dateEnd,fe_typo_user,action,ressourceId,category2,titre,description,invites,invitesemail,indexSlide) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
        type: 'GET',
        url:url,
        dataType: "jsonp",
		jsonp: 'callback',
        jsonpCallback: 'cdispoToken',
        data:{action:"checkBooking",idBooking:idBooking,dateStart:dateStart,dateEnd:dateEnd,fe_typo_user:fe_typo_user,titre:titre,description:description,invites:invites,invitesemail:invitesemail},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.ressourcenotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcenotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedesactived) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedesactived+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.notassistant) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.notassistant+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.norighttobook) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.norighttobook+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharingdeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingdeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharingclosed) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingclosed+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharinglocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharinglocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.ressourcelocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcelocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    console.log('bookinginprogress:'+result.bookinginprogress)
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }


                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.error) {
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.error+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                }



                if (result.result) {

                    console.log("modif ok");
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.message0+result.message1+result.message2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();

                    setTimeout(function(){
                        $('.info-block').show();
                    }, 500);


                }

                if (result.error) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.error+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                }

                $('.loader2').hide();

          },
          error: function(error) {
            $('.loader2').hide();
          }
    });

}



function createMyBooking(event_id,category,ressourceid,datestart,dateend,udatestart,udateend,fe_typo_user,domain,url,action,ressourceId,category2,user_id,indexSlide,args) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
        type: 'GET',
        url:url,
        dataType: "jsonp",
		jsonp: 'callback',
        jsonpCallback: 'cdispoToken',
        data:{action:"createBooking",event_id:event_id,fe_typo_user:fe_typo_user,ressourceid:ressourceid,category:category,datestart:udatestart,dateend:udateend},

        success: function(result) {

            if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

            }

            if (result.deconnexion) {

                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                var url = window.location.href;
                url = url.substring(0, url.lastIndexOf("/") + 1);
                window.localStorage.clear();

                if (device.platform == "Android") {
                    $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                } else {
					$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
				}

                $('.main-slider').hide();
                $('.nav-holder').hide();
                $('.modification-block').hide();
                $('.modification-block2').hide();
                $('.info-block').show();

            }




            if (result.result) {

                $('#titre').val('');
                $('#description').val('');
                $('#booking_adduser').html('');
                $('#booking_adduseremail').html('');


                $('.modification-block #btn_modifynow').unbind().click(function() {
                    var invites=$('.users').map(function(){
                        return $(this).val()
                    }).get();
                    var invitesemail=$('.usersemail').map(function(){
                        return $(this).val()
                    }).get();
                    checkCreateBooking(event_id,$('#modif_datestart').val(),$('#modif_dateend').val(),''+fe_typo_user+'',''+action+'',ressourceId,''+category2+'',''+$('#titre').val()+'',''+$('#description').val()+'',''+invites+'',''+invitesemail+'',indexSlide,''+args+'');
                });

                if (my_range1) {
                    my_range1.reset();
                    my_range1.destroy();
                }
                if (my_range2) {
                    my_range2.reset();
                    my_range2.destroy();
                }
                if (my_range3) {
                    my_range3.reset();
                    my_range3.destroy();
                }

                if (timecode) {
                    timecode = [];
                }

                var timecode = result.timecode;



                $('#modification_title').html(result.title);
                $('#date_start').text(result.firstDate);
                $('#date_end').text(result.lastDate);
                $('#modification_lien1').text(domain);
                $('#modification_lien1').attr('href',url);
                $('.modification-block #btn_back').attr('onclick','$(\'.modification-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();$(\'#backtoshare\').show();');
                $('.modification-block #btn_modifynow').html(result.submittitle);

                //$('.modification-info').html(result.info);

                if (result.infosup) {
                    $('#modification_texte2').html(result.infosup);
                    $('.warning-block').show();
                } else {
                    $('.warning-block').hide();
                }

                if (!result.firstEditable && !result.lastEditable) {

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('#slider_holder1').hide();
                    $('#slider_holder2').hide();
                    $('#slider_holder3').hide();
                    $('.modification-block2').hide();
                    $('.modification-block').show();


                } else {

                    var step = 5 * 60;
                    moment.locale(lang);

                    $('#modif_datestart').val(timecode[0][0]);
                    $('#modif_dateend').val(result.dateEndBooking);

                    //Dans le cas ou la plage est sur 1 jour => 1 slider (jour/heure)
                    //if (timecode.length <= 2) {
                    if (result.counttimecode < 100) {

                        var myvalues = [];
                        $('#slider_holder1').show();
                        $('#slider_holder2').hide();
                        $('#slider_holder3').hide();


                        for(var index in timecode) {
                            for(var index2 in timecode[index]) {
                                myvalues.push(timecode[index][index2]);
                            }
                        }

                        if (parseInt(result.dateStartBooking) < timecode[0][0]) {
                            var my_from1 = 0;
                        } else {
                            var my_from1 = myvalues.indexOf(parseInt(result.dateStartBooking));
                        }

                        var my_stepfrom1 = my_from1;

                        var my_to1 = myvalues.length-1;
                        var my_stepto1 = my_to1;
                        //var my_to1 = myvalues.indexOf(parseInt(result.dateEndBooking));


                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block2').hide();
                                $('.modification-block').show();
                                $('#modif_datestart').val(data.from_value);
                                $('#modif_dateend').val(data.to_value);
                            },
                            onFinish: function (data) {
                                $('#modif_datestart').val(data.from_value);
                                $('#modif_dateend').val(data.to_value);
                                //$('#btn_modifynow').attr('onclick','checkCreateBooking('+event_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category2+'\')');
                                my_stepfrom1 = data.from;
                                my_stepto1 = data.to;

                            }
                        });

                        my_range1 = $(".js-range-slider1").data("ionRangeSlider");


                        my_range1.update({
                            type: "double",
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[0][0],
                            max: timecode[index][index2],
                            from: my_from1,
                            to: my_to1,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify1,
                            values: myvalues
                        });

                        if (!result.firstEditable) {
                            my_range1.update({from_fixed: true});
                        }

                        $('#leftpaddle1-1').on("touchstart touchmove", function(e) {
                          updateRangeFrom1b(+1);
                        });

                        $('#leftpaddle2-1').click(function() {
                          updateRangeFrom1b(-1);
                        });

                        $('#rightpaddle1-2').click(function() {
                          updateRangeTo1b(+1);
                        });
                        $('#rightpaddle2-2').click(function() {
                          updateRangeTo1b(-1);
                        });

                        var updateRangeFrom1b = function (direction) {
                            my_stepfrom1 = parseInt(my_stepfrom1)+direction;
                            if (my_stepfrom1 < 0) {
                                my_stepfrom1 = 0;
                            } else if (my_stepfrom1 > index2) {
                                my_stepfrom1 = index2;
                            }
                            my_range1.update({
                                from: my_stepfrom1
                            });
                        };

                        var updateRangeTo1b = function (direction) {
                            my_stepto1 = parseInt(my_stepto1)+direction;
                            if (my_stepto1 < 0) {
                                my_stepto1 = 0;
                            } else if (my_stepto1 > index2) {
                                my_stepto1 = index2;
                            }
                            my_range1.update({
                                to: my_stepto1
                            });
                        };

                    //Dans le cas ou la plage est sur plus  d'1 jour => 3 slider (jours,heure debut, heure fin)
                    } else {

                        var myvalues1 = [];
                        var myvalues2 = [];
                        var myvalues3 = [];
                        var indexStart1 = 0;
                        for(var index in timecode) {
                            console.log(index);
                        }
                        var indexEnd1 = index;
                        var indexStart2 = 0;
                        var indexEnd2 = timecode[indexEnd1].length - 1;
                        var indexEnd3 = 0;
                        $('#slider_holder1').show();
                        $('#slider_holder2').show();
                        $('#slider_holder3').show();

                        for(var index in timecode) {
                            for(var index2 in timecode[index]) {
                                if (index2 == 0)
                                    myvalues1.push(timecode[index][index2]);
                                if (timecode[index][index2] ==  parseInt(result.dateStartBooking)) {
                                    indexStart1 = index;
                                    indexStart2 = index2;
                                }
                                if (timecode[index][index2] ==  parseInt(result.dateEndBooking)) {
                                    indexEnd1 = index;
                                    indexEnd2 = index2;
                                }
                            }
                        }



                        var my_from1 = myvalues1.indexOf(timecode[indexStart1][indexStart2]);
                        my_stepfrom1 = my_from1;
                        //var my_to1 = myvalues1.indexOf(timecode[indexEnd1][indexEnd2]);

                        var my_to1 = myvalues1.length-1;
                        my_stepto1 = my_to1;
                        //var my_to1 = myvalues.length-1;






                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();$('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block2').hide();
                                $('.modification-block').show();
                                $('#modif_datestart').val(data.from_value);
                                $('#modif_dateend').val(data.to_value);
                            },

                            onFinish: function (data) {

                                myvalues2 = [];
                                myvalues3 = [];

                                for(let index3 in timecode) {
                                    for(let index4 in timecode[index3]) {
                                        //console.log('Timecode:'+index3+'/'+index4+'/'+timecode[index3][index4]);
                                        if (timecode[index3][index4] ==  data.from_value) {
                                            console.log('from found');
                                            indexStart1 = index3;
                                            indexStart2 = index4;
                                        }
                                        if (timecode[index3][index4] ==  data.to_value) {
                                            //console.log('to found');
                                            indexEnd1 = index3;
                                            indexEnd2 = index4;
                                        }
                                    }
                                }

                                //console.log('Index:'+data.from_value+'/'+data.to_value+':'+indexStart1+'/'+indexStart2+':'+indexEnd1+'/'+indexEnd2);

                                for(var index5 in timecode[indexStart1]) {
                                    myvalues2.push(timecode[indexStart1][index5]);
                                }

                                my_from2 = myvalues2.indexOf(timecode[indexStart1][indexStart2]);
                                var my_stepfrom2 = my_from2;
                                var end2 = timecode[indexStart1].length-1;

                                my_range2.update({
                                    grid: false,
                                    grid_snap: true,
                                    grid_num: 4,
                                    min: timecode[indexStart1][0],
                                    max: timecode[indexStart1][end2],
                                    from: my_from2,
                                    step: step,
                                    skin: "big",
                                    decorate_both: true,
                                    drag_interval: true,
                                    prettify: my_prettify3,
                                    values: myvalues2
                                });

                                $('#modif_datestart').val(timecode[indexStart1][indexStart2]);
                                //$('#btn_modifynow').attr('onclick','checkCreateBooking('+event_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category2+'\')');

                                //console.log(timecode[indexStart1][indexStart2]);

                                for(var index6 in timecode[indexEnd1]) {
                                    myvalues3.push(timecode[indexEnd1][index6]);
                                }

                                var my_from3 = myvalues3.indexOf(timecode[indexEnd1][indexEnd2]);
                                var my_stepfrom3 = my_from3;
                                var end3 = timecode[indexEnd1].length-1;

                                my_range3.update({
                                    grid: false,
                                    grid_snap: true,
                                    grid_num: 4,
                                    min: timecode[indexEnd1][0],
                                    max: timecode[indexEnd1][end3],
                                    from: my_from3,
                                    step: step,
                                    skin: "big",
                                    decorate_both: true,
                                    drag_interval: true,
                                    prettify: my_prettify3,
                                    values: myvalues3
                                });

                                $('#modif_dateend').val(timecode[indexEnd1][indexEnd2]);
                                //$('#btn_modifynow').attr('onclick','checkCreateBooking('+event_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category2+'\')');

                            }
                        });

                        my_range1 = $(".js-range-slider1").data("ionRangeSlider");

                        my_range1.update({
                            type: "double",
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[0][0],
                            max: timecode[index][0],
                            from: my_from1,
                            to: my_to1,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify2,
                            values: myvalues1
                        });

                        if (!result.firstEditable) {
                            my_range1.update({from_fixed: true});
                        }

                        for(var index7 in timecode[indexStart1]) {
                            myvalues2.push(timecode[indexStart1][index7]);
                        }

                        var my_from2 = myvalues2.indexOf(timecode[indexStart1][indexStart2]);
                        my_stepfrom2 = my_from2;

                       $(".js-range-slider2").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();$('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block2').hide();
                                $('.modification-block').show();
                                $('#modif_datestart').val(data.from_value);
                            },
                            onFinish: function (data) {
                                $('#modif_datestart').val(data.from_value);
                                //$('#btn_modifynow').attr('onclick','checkCreateBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category2+'\')');
                                my_stepfrom2 = data.from;
                            }
                        });

                        my_range2 = $(".js-range-slider2").data("ionRangeSlider");
                        var end2 = timecode[indexStart1].length-1;

                        my_range2.update({
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[indexStart1][0],
                            max: timecode[indexStart1][end2],
                            from: my_from2,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify3,
                            values: myvalues2
                        });

                        if (!result.firstEditable) {
                            my_range2.update({from_fixed: true});
                        }

                        for(var index8 in timecode[indexEnd1]) {
                            myvalues3.push(timecode[indexEnd1][index8]);
                        }

                        var my_from3 = myvalues3.indexOf(timecode[indexEnd1][indexEnd2]);
                        my_stepfrom3 = my_from3;

                       $(".js-range-slider3").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();$('.nav-holder').hide();
                                $('.nav-holder').hide();
                                $('.modification-block2').hide();
                                $('.modification-block').show();
                                $('#modif_dateend').val(data.from_value);
                            },
                            onFinish: function (data) {
                                $('#modif_dateend').val(data.from_value);
                                //$('#btn_modifynow').attr('onclick','checkCreateBooking('+event_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category2+'\')');
                                my_stepfrom3 = data.from;
                            }
                        });

                        my_range3 = $(".js-range-slider3").data("ionRangeSlider");
                        var end3 = timecode[indexEnd1].length-1;


                        my_range3.update({
                            grid: false,
                            grid_snap: true,
                            grid_num: 4,
                            min: timecode[indexEnd1][0],
                            max: timecode[indexEnd1][end3],
                            from: my_from3,
                            step: step,
                            skin: "big",
                            decorate_both: true,
                            drag_interval: true,
                            prettify: my_prettify3,
                            values: myvalues3
                        });

                        $('#leftpaddle1-1').on("touchstart touchmove", function(e) {
                          updateRangeFrom1(+1);
                        });

                        $('#leftpaddle2-1').click(function() {
                          updateRangeFrom1(-1);
                        });

                        $('#rightpaddle1-2').click(function() {
                          updateRangeTo1(+1);
                        });
                        $('#rightpaddle2-2').click(function() {
                          updateRangeTo1(-1);
                        });

                        $('#leftpaddle2').click(function() {
                          updateRangeFrom2(-1);
                        });

                        $('#rightpaddle2').click(function() {
                          updateRangeFrom2(+1);
                        });

                        $('#leftpaddle3').click(function() {
                          updateRangeFrom3(-1);
                        });

                        $('#rightpaddle3').click(function() {
                          updateRangeFrom3(+1);
                        });

                        var updateRangeFrom1 = function (direction) {
                            my_stepfrom1 = parseInt(my_stepfrom1)+direction;
                            if (my_stepfrom1 < 0) {
                                my_stepfrom1 = 0;
                            } else if (my_stepfrom1 > index) {
                                my_stepfrom1 = index;
                            }
                            my_range1.update({
                                from: my_stepfrom1
                            });
                        };

                        var updateRangeTo1 = function (direction) {
                            my_stepto1 = parseInt(my_stepto1)+direction;
                            if (my_stepto1 < 0) {
                                my_stepto1 = 0;
                            } else if (my_stepto1 > index) {
                                my_stepto1 = index;
                            }
                            my_range1.update({
                                to: my_stepto1
                            });
                        };

                        var updateRangeFrom2 = function (direction) {
                            my_stepfrom2 = parseInt(my_stepfrom2)+direction;
                            if (my_stepfrom2 < 0) {
                                my_stepfrom2 = 0;
                            } else if (my_stepfrom2 > end2) {
                                my_stepfrom2 = end2;
                            }
                            my_range2.update({
                                from: my_stepfrom2
                            });
                        };

                        var updateRangeFrom3 = function (direction) {
                            my_stepfrom3 = parseInt(my_stepfrom3)+direction;
                            if (my_stepfrom3 < 0) {
                                my_stepfrom3 = 0;
                            } else if (my_stepfrom3 > end3) {
                                my_stepfrom3 = end3;
                            }
                            my_range3.update({
                                from: my_stepfrom3
                            });
                        };

                    }
                }

            }

            console.log('createBooking success');

            $('.loader2').hide();
            $('#backtoshare').hide();
        },
          error: function(error) {
                console.log('createBooking error');
                $('.loader2').hide();
          }

    });

}


function checkCreateBooking(idEvent,dateStart,dateEnd,fe_typo_user,action,ressourceId,category2,titre,description,invites,invitesemail,indexSlide,args) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
        type: 'GET',
        url:url,
        dataType: "jsonp",
		jsonp: 'callback',
        jsonpCallback: 'cdispoToken',
        data:{action:"checkCreateBooking",idEvent:idEvent,dateStart:dateStart,dateEnd:dateEnd,fe_typo_user:fe_typo_user,titre:titre,description:description,invites:invites,invitesemail:invitesemail},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block2').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.ressourcenotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcenotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedesactived) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedesactived+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.notassistant) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.notassistant+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.norighttobook) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.norighttobook+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.sharingdeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingdeleted+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.sharingclosed) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingclosed+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.sharinglocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharinglocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.ressourcelocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcelocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    console.log('bookinginprogress:'+result.bookinginprogress)
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }


                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();

                }


                if (result.error) {
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.error+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\',0)');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();$('.nav-holder').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();
                }


                if (result.result) {

                    console.log("modif ok");
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.message0+result.message1+result.message2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+')');
                    if (action == "getDispo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\')');
                    if (action == "getDispo2")
                        $('#btn_close').attr('onclick','getDispo2(\''+fe_typo_user+'\','+ressourceId+',\''+category2+'\',\'refresh\','+indexSlide+',\''+args+'\')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();

                    setTimeout(function(){
                        $('.info-block').show();
                    }, 500);


                }

                if (result.error) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.error+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();
                }

                $('.loader2').hide();

          },
          error: function(error) {
            $('.loader2').hide();
          }
    });

}

function checkStartMyBooking(bookingId,fe_typo_user,action,ressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
        type: 'GET',
        url:url,
        dataType: "jsonp",
		jsonp: 'callback',
        jsonpCallback: 'cdispoToken',
        data: {action:"checkStartMyBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

            success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingnoshow) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnoshow+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingtoolate) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.checkbookingconfirmstart+'</p>');
                    $('#btn_close').text(trad['validate']);
                    $('#btn_close').attr('onclick','startMyBooking('+bookingId+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category+'\','+indexSlide+')');
                    $('#btn_cancel').text(trad['cancel']);
                    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }



                console.log('checkStartMyBooking success');

                $('.loader2').hide();


          },
          error: function(error) {
                console.log('checkStartMyBooking error');
                $('.loader2').hide();
          }
    });
}


function startMyBooking(bookingId,fe_typo_user,action,ressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"startMyBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnoshow) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnoshow+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingtoolate) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmstart+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                console.log('startMyBooking success');

                $('.loader2').hide();


          },
          error: function(error) {
                console.log('startMyBooking error');
                $('.loader2').hide();
          }
    });
}



function checkEndMyBooking(bookingId,fe_typo_user,action,ressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"checkEndMyBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingtoolate) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                   if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');


                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.checkbookingconfirmend+'</p>');
                    $('#btn_close').text(trad['validate']);
                    $('#btn_close').attr('onclick','endMyBooking('+bookingId+',\''+fe_typo_user+'\',\''+action+'\','+ressourceId+',\''+category+'\','+indexSlide+')');
                    $('#btn_cancel').text(trad['cancel']);
                    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                console.log('checkEndMyBooking success');
                $('.loader2').hide();


          },
          error: function(error) {
                console.log('checkEndMyBooking error');
                $('.loader2').hide();
          }
    });
}


function endMyBooking(bookingId,fe_typo_user,action,ressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"endMyBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookinginprogress2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookingcancelled) {

                   initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookinglocked1) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookinglocked2) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookinglocked3) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.bookinglocked4) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }


                if (result.bookingtoolate) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();


                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmend+'</p>');
                    if (action == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                console.log('endMyBooking success');
                $('.loader2').hide();


          },
          error: function(error) {
                console.log('endMyBooking error');
                $('.loader2').hide();
          }
    });
}



function checkConfirmBooking(bookingId,fe_typo_user,action,eventressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"checkConfirmBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingconfirmed) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmed+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.content+'</p>');
                    $('#btn_close').text(trad['validate']);
                    $('#btn_close').attr('onclick','confirmBooking('+bookingId+',\''+fe_typo_user+'\',\''+action+'\','+eventressourceId+',\''+category+'\','+indexSlide+')');
                    $('#btn_cancel').text(trad['cancel']);
                    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();$(\'.nav-holder\').show();');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                console.log('checkConfirmBooking success');
                $('.loader2').hide();


          },
          error: function(error) {
                console.log('checkConfirmBooking error');
                $('.loader2').hide();
          }
    });
}


function confirmBooking(bookingId,fe_typo_user,action,eventressourceId,category,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"confirmBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\',0)');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinglocked) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingconfirmed) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmed+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookinginprogress) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmed+'</p>');
                    if (action == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (action == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventressourceId+',\'refresh\','+indexSlide+')');
                    if (action == "getScan")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+eventressourceId+',\''+category+'\',\'refresh\')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }


                console.log('checkConfirmBooking success');
                $('.loader2').hide();


          },
          error: function(error) {
                console.log('checkConfirmBooking error');
                $('.loader2').hide();
          }
    });
}


function getSharing(fe_typo_user,action,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getSharing",fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            window.clearInterval(i);
                         }
                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });

                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);

                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        console.log('indexSlide2:'+indexSlide);
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        else {
                            if (result.gotoSlide>=0) {
                                $('.main-slider').slick('slickGoTo', result.gotoSlide);
                            }
                        }
                    } else {
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\')');

                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('#btn_close').hide();
                        $('#btn_cancel').hide();
                        $('.info-block').show();
                    }

                } else {

                }
                $('.loader2').hide();
          },
          error: function(error) {
            console.log(error);
            $('.loader2').hide();
          }
    });
}




function loadBookingEvent(eventId,fe_typo_user,indexSlide) {
    var url = window.location.href;
    url = url.substring(0, url.lastIndexOf("/") + 1);
    console.log(url);
    if (device.platform == "Android") {
        $('#invisible_link').attr('href','bookingevent.html?eventId='+eventId+'&indexSlide='+indexSlide);
		$("#invisible_link")[0].click();
    } else {
		cordova.InAppBrowser.open(url+'bookingevent.html?eventId='+eventId+'&indexSlide='+indexSlide, '_self');
	}
}



function getBookingEvent(fe_typo_user,eventId,action,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getBookingEvent",fe_typo_user:fe_typo_user,eventId:eventId},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    $('#btn_cancel').text('');

                    $('#btn_close').attr('onclick','loadSharing(\''+fe_typo_user+'\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            window.clearInterval(i);
                         }
                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    console.log(result.slide);

                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        else {
                            if (result.gotoSlide>=0) {
                                $('.main-slider').slick('slickGoTo', result.gotoSlide);
                            }
                        }
                        $('#backtoshare').show();
                    } else {
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+eventId+',\'refresh\',0)');

                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('#btn_close').hide();
                        $('#btn_cancel').hide();
                        $('.info-block').show();
                        $('#backtoshare').hide();
                    }
                    $('#eventid2').text(eventId);
                    $('#eventid').text(eventId);

                } else {

                }
                $('.loader2').hide();
          },
          error: function(error) {
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function getBookingToConfirm(fe_typo_user,action,indexSlide) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getBookingToConfirm",fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    console.log('success getBookingToConfirm 1 '+action);
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         //window.clearAllIntervals();

                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            //window.clearInterval(varInterval);
                            window.clearInterval(i);
                         }

                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        else {
                            if (result.gotoSlide>=0) {
                                $('.main-slider').slick('slickGoTo', result.gotoSlide);
                            }
                        }

                    } else {

                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('#btn_close').hide();
                        $('#btn_cancel').hide();
                        $('.info-block').show();
                    }

                } else {

                }

                console.log('success getBookingToConfirm');


                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getBookingToConfirm');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function getInvitations(fe_typo_user,action,indexSlide) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getInvitations",fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            window.clearInterval(i);
                         }
                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        else {
                            if (result.gotoSlide>=0) {
                                $('.main-slider').slick('slickGoTo', result.gotoSlide);
                            }
                        }
                    } else {

                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('#btn_close').hide();
                        $('#btn_cancel').hide();
                        $('.info-block').show();
                    }

                } else {

                }

                console.log('success getInvitations');


                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getInvitations');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function guestAccept(bookingId,guestId,fe_typo_user,index) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"guestAccept",bookingId:bookingId,guestId:guestId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.guestnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.guestnotexist+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingguestaccept+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }


                console.log('success guestAccept');


                $('.loader2').hide();

          },
          error: function(error) {
                console.log('guestAccept error');
                $('.loader2').hide();
          }
    });
}

function guestRefuse(bookingId,guestId,fe_typo_user,index) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"guestRefuse",bookingId:bookingId,guestId:guestId,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.guestnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.guestnotexist+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.result) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingguestrefuse+'</p>');
                    $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+index+')');

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }



                console.log('success guestRefuse');


                $('.loader2').hide();
          },
          error: function(error) {
                console.log('guestRefuse error');
                $('.loader2').hide();
          }
    });
}


function getScan(fe_typo_user,ressourceId,category,action,indexSlide) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getScan",fe_typo_user:fe_typo_user,ressourceId:ressourceId,category:category},

          success: function(result) {

                result.ok = 1;

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    console.log('Deconnexion Scan:'+result.deconnexion);

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_cancel').text('');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.message-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();
                    result.ok = 0;

                }

                if (result.ressourcenotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcenotexist+'</p>');
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'mesreservations.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
					}

                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_cancel').text('');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.message-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();
                    result.ok = 0;

                }

                if (result.nobookingstostart) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.nobookingstostart+'</p>');
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'mesreservations.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
					}

                    $('#btn_close').text(trad['btn_close']);
                    $('#btn_cancel').text('');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.message-block').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();
                    result.ok = 0;

                }

                if (result.result) {
                    if (result.bookingtostartcancelled) {
                       initPopin();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html('<p></p><p>'+result.bookingtostartcancelled+'</p>');
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\',\''+ressourceId+'\',\''+category+'\',\'refresh\')');

                        $('#btn_close').text(trad['btn_close']);
                        $('#btn_cancel').text('');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.message-block').hide();
                        $('#backtoshare').hide();
                        $('.info-block').show();
                    }
                    if (result.bookingtostartfinished) {
                        initPopin();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html('<p></p><p>'+result.bookingtostartfinished+'</p>');
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\',\''+ressourceId+'\',\''+category+'\',\'refresh\')');

                        $('#btn_close').text(trad['btn_close']);
                        $('#btn_cancel').text('');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.message-block').hide();
                        $('#backtoshare').hide();
                        $('.info-block').show();
                    }
                    if (result.nobookingstostart) {
                       initPopin();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html('<p></p><p>'+result.nobookingstostart+'</p>');
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\',\''+ressourceId+'\',\''+category+'\',\'refresh\')');

                        $('#btn_close').text(trad['btn_close']);
                        $('#btn_cancel').text('');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.message-block').hide();
                        $('#backtoshare').hide();
                        $('.info-block').show();
                    }
                    if (result.bookingtostart) {
                        if (action == "refresh") {
                             console.log('countslide:'+countslide);
                             for (var i = 0; i < 1000; i++) {
                                var varInterval = "x"+i;
                                window.clearInterval(i);
                             }
                             $("div.slick-slide").each(function() {
                                var i = $(this).attr("data-slick-index");
                                $('.main-slider').slick('slickRemove',i);
                             });

                            $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').show();
                            $('.nav-holder').show();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').hide();
                            $('#backtoshare').hide();
                             if (countslide > 0)
                                $('.main-slider').slick('unslick');
                        }

                        countslide = result.countslide;

                        if (countslide > 0) {
                            $('.main-slider').html(result.slide);
                            initSlickCarousel();
                        } else {
                            $('.prewiewsharing_header').hide();
                            $('.previewsharing_content').html(result.content);
                            $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\',\''+ressourceId+'\',\''+category+'\',\'refresh\')');


                            $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').hide();
                            $('.nav-holder').hide();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').show();
                        }

                    }

                    if (result.nextbooking) {
                        if (action == "refresh") {
                             console.log('countslide:'+countslide);
                             for (var i = 0; i < 1000; i++) {
                                var varInterval = "x"+i;
                                window.clearInterval(i);
                             }
                             $("div.slick-slide").each(function() {
                                var i = $(this).attr("data-slick-index");
                                $('.main-slider').slick('slickRemove',i);
                             });
                             $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').show();
                            $('.nav-holder').show();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').hide();
                             if (countslide > 0)
                                $('.main-slider').slick('unslick');
                        }

                        countslide = result.countslide;

                        if (countslide > 0) {
                            $('.main-slider').html(result.slide);
                            initSlickCarousel();
                            if (indexSlide)
                                $('.main-slider').slick('slickGoTo', indexSlide);
                            else {
                                if (result.gotoSlide>=0) {
                                    $('.main-slider').slick('slickGoTo', result.gotoSlide);
                                }
                            }
                            $('#backtoshare').show();
                            $('#backtosharelink').html(result.linktitle);
                            $('#backtosharelink').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');


                        } else {
                            $('#backtoshare').hide();
                            $('.prewiewsharing_header').hide();
                            $('.previewsharing_content').html(result.content);
                            $('#btn_close').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');

                            $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').hide();
                            $('.nav-holder').hide();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').show();
                        }

                    }

                    if (result.newsharings) {

                        if (action == "refresh") {
                             console.log('countslide:'+countslide);
                             for (var i = 0; i < 1000; i++) {
                                var varInterval = "x"+i;
                                window.clearInterval(i);
                             }
                             $("div.slick-slide").each(function() {
                                var i = $(this).attr("data-slick-index");
                                $('.main-slider').slick('slickRemove',i);
                             });
                             $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').show();
                            $('.nav-holder').show();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').hide();
                             if (countslide > 0)
                                $('.main-slider').slick('unslick');
                        }

                        countslide = result.countslide;

                        if (countslide > 0) {
                            $('.main-slider').html(result.slide);
                            initSlickCarousel();
                            $('#backtoshare').show();
                            $('#backtosharelink').html(result.linktitle);
                            $('#backtosharelink').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');

                        } else {
                            $('#backtoshare').hide();
                            $('.prewiewsharing_header').hide();
                            $('.previewsharing_content').html(result.content);
                            $('#btn_close').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');

                            $('#btn_close').text(trad['btn_close']);
                            $('#btn_cancel').text('');
                            $('.main-slider').hide();
                            $('.nav-holder').hide();
                            $('.modification-block').hide();
                            $('.modification-block2').hide();
                            $('.message-block').hide();
                            $('.info-block').show();
                        }

                    }

                    console.log('success getScan:'+result.ressourceId+"/"+result.category);

                } else {

                    if (result.ok) {
                        initPopin();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html('<p></p><p>'+result.content+'</p>');
                        var url = window.location.href;
                        url = url.substring(0, url.lastIndexOf("/") + 1);
                        if (device.platform == "Android") {
                            $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'mesreservations.html\');$("#invisible_link")[0].click()');
                        } else {
                            $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                        }

                        $('#btn_close').text(trad['btn_close']);
                        $('#btn_cancel').text('');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.message-block').hide();
                        $('#backtoshare').hide();
                        $('.info-block').show();
                    }
                }

                $('#scan_title').html(result.title);
                $('.loader2').hide();

          },
          error: function(error) {
                console.log('getScan error');
                $('.loader2').hide();
          }
    });
}




function unlockBooking(fe_typo_user,bookingId) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"unlockBooking",fe_typo_user:fe_typo_user,bookingId:bookingId},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    console.log('unlockBooking success');
                } else {
                    console.log('unlockBooking error');
                }
                $('.loader2').hide();

          },
          error: function(error) {
                console.log('unlockBooking error');
                $('.loader2').hide();
          }
    });
}



function getBookingToGo(fe_typo_user,ressourceId,category,action) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getBookingToGo",fe_typo_user:fe_typo_user,ressourceId:ressourceId,category:category},

          success: function(result) {

                result.ok = 1;

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                     result.ok = 0;

                }

                if (result.result) {
                    console.log('success getBookingToConfirm 1 '+action);
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         //window.clearAllIntervals();

                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            //window.clearInterval(varInterval);
                            window.clearInterval(i);
                         }

                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();$('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');

                    } else {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.main-slider').hide();$('.nav-holder').hide();
                        $('.info-block').show();
                    }

                } else {
                    if (result.ok) {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getDispo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.main-slider').hide();$('.nav-holder').hide();
                        $('.info-block').show();
                    }
                }

                console.log('success getBookingToConfirm');

                $('#scan_title').html(result.title);
                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getBookingToConfirm');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function getDispo(fe_typo_user,ressourceId,category,action) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getDispo",fe_typo_user:fe_typo_user,ressourceId:ressourceId,category:category,from:'scan'},

          success: function(result) {

                result.ok = 1;
                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();$('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    result.ok = 0;

                }

                if (result.result) {
                    console.log('success getBookingToConfirm 1 '+action);
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         //window.clearAllIntervals();

                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            //window.clearInterval(varInterval);
                            window.clearInterval(i);
                         }

                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();$('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.nav-holder').show();
                        $('.modification-block').hide();
                        $('.info-block').hide();
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        $('.main-slider').show();
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                    } else {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.info-block').show();
                    }

                } else {
                    if (result.ok) {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','getBookingToGo(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\')');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.info-block').show();
                    }
                }

                console.log('success getBookingToConfirm');

                //if (from == "scan")
                    $('#scan_title').html(result.title);
                //if (from == "search")
                    //$('#reserver_title').html(result.title);
                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getBookingToConfirm');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function SearchForm(fe_typo_user,args) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"searchForm",fe_typo_user:fe_typo_user,parameters:args},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block2').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    $('#backtoshare').hide();
                    $('.loader2').hide();
                    $('.planlocalisation').html('');

                }

                if (result.result) {
                    $('.modification-block2').html(result.searchform);
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').show();
                    $('#backtoshare').hide();
                    $('.loader2').hide();
                    $('.planlocalisation').html('');

                }
          },
          error: function(error) {
            console.log('nok getBookingToConfirm');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function SearchResult(fe_typo_user,args,indexSlide,plan) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"searchResult",fe_typo_user:fe_typo_user,parameters:args,plan:plan},

          success: function(result) {

                result.ok = 1;
                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();
                    $('.planlocalisation').html('');
                    result.ok = 0;

                }

                if (result.result) {
                    console.log('countslide:'+countslide);
                     //window.clearAllIntervals();

                     for (var i = 0; i < 1000; i++) {
                        var varInterval = "x"+i;
                        //window.clearInterval(varInterval);
                        window.clearInterval(i);
                     }

                     $("div.slick-slide").each(function() {
                        var i = $(this).attr("data-slick-index");
                        $('.main-slider').slick('slickRemove',i);
                     });


                     $('.main-slider').show();
                     $('.nav-holder').show();
                     $('.info-block').hide();
                     if (countslide > 0)
                        $('.main-slider').slick('unslick');

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.nav-holder').show();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').hide();
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        $('.main-slider').show();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','SearchForm(\''+fe_typo_user+'\',\''+args+'\')');
                    } else {
                        $('#backtoshare').hide();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','$(\'.main-slider\').hide();$(\'.info-block\').hide();$(\'.nav-holder\').hide();$(\'.modification-block\').hide();$(\'.modification-block2\').show()');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                    }

                } else {
                    if (result.ok) {
                        $('#backtoshare').hide();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','$(\'.main-slider\').hide();$(\'.info-block\').hide();$(\'.nav-holder\').hide();$(\'.modification-block\').hide();$(\'.modification-block2\').show()');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                        $('.planlocalisation').html('');
                    }
                }

                console.log('success getBookingToConfirm');

                $('#scan_title').html(result.title);
                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getBookingToConfirm');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function getDispo2(fe_typo_user,ressourceId,category,action,index,args) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getDispo",fe_typo_user:fe_typo_user,ressourceId:ressourceId,category:category,from:'search',indexSlide:index,args:args},

          success: function(result) {

                result.ok = 1;
                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();
                    result.ok = 0;

                }

                if (result.result) {
                    console.log('success getDispo2 '+action);
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         //window.clearAllIntervals();

                         for (var i = 0; i < 1000; i++) {
                            var varInterval = "x"+i;
                            //window.clearInterval(varInterval);
                            window.clearInterval(i);
                         }

                         $("div.slick-slide").each(function() {
                            var i = $(this).attr("data-slick-index");
                            $('.main-slider').slick('slickRemove',i);
                         });


                         $('.main-slider').show();
                         $('.nav-holder').show();
                         $('.info-block').hide();
                         if (countslide > 0)
                            $('.main-slider').slick('unslick');
                    }

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.nav-holder').show();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').hide();
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        $('.main-slider').show();
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','SearchResult(\''+fe_typo_user+'\',\''+args+'\','+index+')');
                    } else {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','SearchResult(\''+fe_typo_user+'\',\''+args+'\','+index+')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','SearchResult(\''+fe_typo_user+'\',\''+args+'\','+index+')');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                    }

                } else {
                    if (result.ok) {
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','SearchResult(\''+fe_typo_user+'\',\''+args+'\','+index+')');
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','SearchResult(\''+fe_typo_user+'\',\''+args+'\','+index+')');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                    }
                }

                console.log('success getDispo2');
                $('.planlocalisation').html('');
                $('#scan_title').html(result.title);
                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getDispo2');
            console.log(error);
            $('.planlocalisation').html('');
            $('.loader2').hide();
          }
    });
}


function sendMessageToSharing(booking_id,message,fe_typo_user,from,ressourceId,category,indexSlide) {

    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'sendMessageToSharing',booking_id:booking_id,message:message,fe_typo_user:fe_typo_user,from:from},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    $('#btn_cancel').text('');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.message-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\',0)');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\','+indexSlide+')');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.bookingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\','+indexSlide+')');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\',0)');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingcancelled+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\',0)');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\',0)');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\',0)');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingfinished+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo")
                        $('#btn_close').attr('onclick','getScan(\''+fe_typo_user+'\','+ressourceId+',\''+category+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBooking")
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    if (from == "getBookingEvent")
                        $('#btn_close').attr('onclick','getBookingEvent(\''+fe_typo_user+'\','+ressourceId+',\'refresh\','+indexSlide+')');
                    if (from == "getBookingToConfirm")
                        $('#btn_close').attr('onclick','getBookingToConfirm(\''+fe_typo_user+'\',\'refresh\','+indexSlide+'');
                    if (from == "getInvitations")
                        $('#btn_close').attr('onclick','getInvitations(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }



                if (result.result) {

                    initPopin();

                    //clearInterval('x'+index);

                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.content+'</p>');
                    $('#btn_cancel').text('');

                    if (from == "getBookingToStart" || from == "getBookingToEnd" || from == "getBookingToGo" || from == "getBookingEvent")
                        $('#btn_close').attr('onclick','$(\'.main-slider\').show();$(\'.info-block\').hide();$(\'.nav-holder\').show();$(\'.modification-block\').hide();$(\'.modification-block2\').hide();$(\'.message-block\').hide();$(\'#backtoshare\').show()');
                    if (from == "getBooking" || from == "getBookingToConfirm" || from == "getInvitations")
                        $('#btn_close').attr('onclick','$(\'.main-slider\').show();$(\'.info-block\').hide();$(\'.nav-holder\').show();$(\'.modification-block\').hide();$(\'.modification-block2\').hide();$(\'.message-block\').hide();$(\'#backtoshare\').hide()');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                    console.log('sendMessageToSharing success');

                } else {
                    console.log('sendMessageToSharing error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('deleteMyBooking error');
                $('.loader2').hide();
          }

    });

}


function sendMessageSharing(sharing_id,message,fe_typo_user,indexSlide) {

    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
		  jsonp: 'callback',
		  jsonpCallback: 'cdispoToken',
          data:{action:'sendMessageSharing',sharing_id:sharing_id,message:message,fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    $('#btn_cancel').text('');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.message-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingnotexist) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    $('#btn_cancel').text('');
                    $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\',0)');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingfinished) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingfinished+'</p>');
                    $('#btn_cancel').text('');

                    $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.sharingcancelled) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingcancelled+'</p>');
                    $('#btn_cancel').text('');
                    $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }

                if (result.ressourcedeleted) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_cancel').text('');

                    $('#btn_close').attr('onclick','getSharing(\''+fe_typo_user+'\',\'refresh\',0)');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                }



                if (result.result) {

                    initPopin();

                    //clearInterval('x'+index);

                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.content+'</p>');
                    $('#btn_cancel').text('');

                    $('#btn_close').attr('onclick','$(\'.main-slider\').show();$(\'.info-block\').hide();$(\'.nav-holder\').show();$(\'.modification-block\').hide();$(\'.modification-block2\').show();$(\'.message-block\').hide();$(\'#backtoshare\').hide()');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.message-block').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('#backtoshare').hide();
                    $('.info-block').show();

                    console.log('sendMessageToSharing success');

                } else {
                    console.log('sendMessageToSharing error');
                }

                $('.loader2').hide();

          },
          error: function(error) {
                console.log('deleteMyBooking error');
                $('.loader2').hide();
          }

    });

}


function getMyAccount(fe_typo_user,action) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getMyAccount",fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    $('.prewiewsharing_header').show();
                    $('.prewiewsharing_title').html(result.title);
                    $('.previewsharing_content').html(result.content);
                    $('#btn_close').attr('onclick','getMyAccount(\''+fe_typo_user+'\',\'refresh\')');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('#btn_close').hide();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                } else {

                }

                console.log('success getMyAccount');


                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getMyAccount');
            console.log(error);
            $('.loader2').hide();
          }
    });
}

function geolocRessource(ressourceId,categoryRessource,fe_typo_user,indexSlide) {

    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data:{action:'geolocRessource',ressourceId:ressourceId,categoryRessource:categoryRessource,fe_typo_user:fe_typo_user},
          
          success: function(result) {

                result.ok = 1;

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}
                    $('#btn_cancel').text('');
                    $('#btn_cancel').attr('onclick','');

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('.modification-block2').hide();
                    $('.info-block').show();
                    $('.planlocalisation').html('');
                    $('#backtoshare').hide();
                    result.ok = 0;

                }

                if (result.result) {
                    console.log('countslide:'+countslide);
                     //window.clearAllIntervals();

                     for (var i = 0; i < 1000; i++) {
                        var varInterval = "x"+i;
                        //window.clearInterval(varInterval);
                        window.clearInterval(i);
                     }

                     $("div.slick-slide").each(function() {
                        var i = $(this).attr("data-slick-index");
                        $('.main-slider').slick('slickRemove',i);
                     });


                     $('.main-slider').show();
                     $('.nav-holder').show();
                     $('.info-block').hide();
                     if (countslide > 0)
                        $('.main-slider').slick('unslick');

                    countslide = result.countslide;
                    //console.log(countslide);
                    //console.log(result.slide);
                    if (countslide > 0) {
                        $('.nav-holder').show();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').hide();
                        $('.main-slider').html(result.slide);
                        initSlickCarousel();
                        $('.main-slider').show();
                        if (indexSlide)
                            $('.main-slider').slick('slickGoTo', indexSlide);
                        $('#backtoshare').show();
                        $('#backtosharelink').html(result.linktitle);
                        $('#backtosharelink').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\','+indexSlide+')');
                    } else {
                        $('#backtoshare').hide();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','$(\'.main-slider\').hide();$(\'.info-block\').hide();$(\'.nav-holder\').hide();$(\'.modification-block\').hide();$(\'.modification-block2\').show()');
                        $('#btn_cancel').text('');
                        $('#btn_cancel').attr('onclick','');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                    }

                } else {
                    if (result.ok) {
                        $('#backtoshare').hide();
                        $('.prewiewsharing_header').hide();
                        $('.previewsharing_content').html(result.content);
                        $('#btn_close').attr('onclick','$(\'.main-slider\').hide();$(\'.info-block\').hide();$(\'.nav-holder\').hide();$(\'.modification-block\').hide();$(\'.modification-block2\').show()');
                        $('#btn_cancel').text('');
                        $('#btn_cancel').attr('onclick','');
                        $('.main-slider').hide();
                        $('.nav-holder').hide();
                        $('.modification-block').hide();
                        $('.modification-block2').hide();
                        $('.info-block').show();
                        $('.planlocalisation').html('');
                    }
                }

                console.log('success geolocRessource');

                $('#scan_title').html(result.title);
                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok geolocRessource');
            console.log(error);
            $('.loader2').hide();
          }
    });
}


function getCgu(fe_typo_user,action) {
    var L = window.localStorage.getItem("language");
    var lang = window.localStorage.getItem("lang");
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'cdispoToken',
          data: {action:"getCgu",fe_typo_user:fe_typo_user},

          success: function(result) {

                if (result.deconnexion) {

                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');

                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    if (device.platform == "Android") {
                        $('#btn_close').attr('onclick','$(\'#invisible_link\').attr(\'href\',\'index.html\');$("#invisible_link")[0].click()');
                    } else {
						$('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'index.html\', \'_self\')');
					}

                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('.modification-block').hide();
                    $('#btn_close').show();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                }

                if (result.result) {
                    $('.prewiewsharing_header').show();
                    $('.prewiewsharing_title').html(result.title);
                    $('.previewsharing_content').html(result.content);
                    $('#btn_close').attr('onclick','getCgu(\''+fe_typo_user+'\',\'refresh\')');
                    $('.main-slider').hide();
                    $('.nav-holder').hide();
                    $('#btn_close').hide();
                    $('#btn_cancel').hide();
                    $('.info-block').show();

                } else {

                }

                console.log('success getCgu');


                $('.loader2').hide();
          },
          error: function(error) {
            console.log('nok getCgu');
            console.log(error);
            $('.loader2').hide();
          }
    });
}



function loadSharing(fe_typo_user,indexSlide) {
    var url = window.location.href;
    url = url.substring(0, url.lastIndexOf("/") + 1);
    console.log(url);
    if (device.platform == "Android") {
        $('#invisible_link').attr('href','mespartages.html?indexSlide='+indexSlide);
        $("#invisible_link")[0].click();
    } else {
        cordova.InAppBrowser.open(url+'mespartages.html?indexSlide='+indexSlide, '_self');
    }


}

function my_prettify1 (n) {

        var num =  moment(parseInt(n),'X');
        var formattedDate = num.format("ddd, DD MMMM, LT");
        return formattedDate;
}


function my_prettify2 (n) {

        var num =  moment(parseInt(n),'X');
        var formattedDate = num.format("ddd, DD MMMM");
        return formattedDate;
}

function my_prettify3 (n) {

        var num =  moment(parseInt(n),'X');
        var formattedDate = num.format("LT");
        return formattedDate;
}
