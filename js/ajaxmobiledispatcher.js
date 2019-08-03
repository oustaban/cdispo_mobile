var countslide = 0;
var my_range;
var my_range1;
var my_range2;
var my_range3;

function getBooking(fe_typo_user,action) {
        
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                
                }
                
                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < countslide; i++) {
                            var varInterval = "x"+i;
                            window.clearInterval(varInterval);
                         }
                         $('.main-slider').show();
                         $('.modification-block').hide();
                         $('.info-block').hide();
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
                        $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                        $('.main-slider').hide();
                        $('.modification-block').hide();
                        $('.info-block').show();    
                    }
                    
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

function getPreviewRessource(ressourceId,categoryRessource,fe_typo_user) {
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                
                if (result.ressourcedeleted) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
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
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                    
                    $('.prewiewsharing_header').show();
                    $('.main-slider').hide();
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



function getUserInfo(fe_typo_user,owner_id) {
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                
                if (result.ok) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html(result.content);
                    
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                    
                    $('.main-slider').hide();
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



function getSiteInfo(site_id,referentiel_id,fe_typo_user) {
    
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                if (result.ok) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html(result.content);
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                    
                    $('.main-slider').hide();
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


function checkDeleteMyBooking(booking_id,category,ressourceid,fe_typo_user,index) {
    
    initPopin();
    $('.prewiewsharing_header').hide();
    $('.previewsharing_content').html(trad['confirmdeletebooking']);
    $('#btn_close').text(trad['validate']);
    $('#btn_close').attr('onclick','deleteMyBooking('+booking_id+',\''+category+'\','+ressourceid+',\''+fe_typo_user+'\','+index+')');
    $('#btn_cancel').text(trad['cancel']);
    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                    
    $('.main-slider').hide();
    $('.info-block').show();
    
}

function deleteMyBooking(booking_id,category,ressourceid,fe_typo_user,index) {
    
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingcancelled) {
                    
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingdeleted) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.ressourcedeleted) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
                
                 if (result.sharinglocked) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                    
                }
            
                if (result.result) {
                    
                    initPopin();
                    
                    //clearInterval('x'+index);
                         
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
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

function editMyBooking(booking_id,category,ressourceid,datestart,dateend,udatestart,udateend,fe_typo_user,domain,url) {
    
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
                $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
            
            }
            
           
            if (result.bookingnotexist) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookinginprogress) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookingfinished) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookingcancelled) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookinglocked1) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookinglocked2) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.bookingdeleted) {
                
                initPopin();
                $('.prewiewsharing_header').hide();
                $('.previewsharing_content').html('<p></p><p>'+result.bookingdeleted+'</p>');
                $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                $('.main-slider').hide();
                $('.info-block').show();
                
            }
            
            if (result.result) {
                
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
                
                
                $('#date_start').text(datestart);
                $('#date_end').text(dateend);
                $('#modification_lien1').text(domain);
                $('#modification_lien1').attr('href',url);
                $('#btn_back').attr('onclick','$(\'.modification-block\').hide();$(\'.main-slider\').show();');
                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
                //$('.modification-info').html(result.info);
                
                if (result.infosup) {
                    $('#modification_texte2').html(result.infosup);
                    $('.warning-block').show();
                } else {
                    $('.warning-block').hide();
                }
                
                if (!result.firstEditable && !result.lastEditable) {
                    
                    $('.main-slider').hide();
                    $('#slider_holder1').hide();
                    $('#slider_holder2').hide();
                    $('#slider_holder3').hide();
                    $('.modification-block').show();        
                
                } else {
                
                    var step = 5 * 60;
                    moment.locale(lang);
                    
                    $('#modif_datestart').val(result.dateStartBooking);
                    $('#modif_dateend').val(result.dateEndBooking);
                    
                    //Dans le cas ou la plage est sur 1 jour => 1 slider (jour/heure)
                    if (timecode.length <= 2) {
                        
                        var myvalues = [];
                        $('#slider_holder1').show();
                        $('#slider_holder2').hide();
                        $('#slider_holder3').hide();
                        
                        
                        for(var index in timecode) {
                            for(var index2 in timecode[index]) {
                                myvalues.push(timecode[index][index2]);
                            }
                        }
                        
                        var my_from1 = myvalues.indexOf(result.dateStartBooking);
                        var my_to1 = myvalues.indexOf(result.dateEndBooking);
                        
                        
                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.modification-block').show();
                            },
                            onFinish: function (data) {
                                $('#modif_datestart').val(data.from_value);
                                $('#modif_dateend').val(data.to_value);
                                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
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
                                if (timecode[index][index2] ==  result.dateStartBooking) {
                                    indexStart1 = index;
                                    indexStart2 = index2;
                                }
                                if (timecode[index][index2] ==  result.dateEndBooking) {
                                    indexEnd1 = index;
                                    indexEnd2 = index2;
                                }
                            }
                        }
                        
                        
                        
                        var my_from1 = myvalues1.indexOf(timecode[indexStart1][0]);
                        var my_to1 = myvalues1.indexOf(timecode[indexEnd1][0]);
                        
    
                        
                        
                        $(".js-range-slider1").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.modification-block').show();
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
                                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
                                //console.log(timecode[indexStart1][indexStart2]);
                                
                                for(var index6 in timecode[indexEnd1]) {
                                    myvalues3.push(timecode[indexEnd1][index6]);
                                }
                                
                                var my_from3 = myvalues3.indexOf(timecode[indexEnd1][indexEnd2]);
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
                                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
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
                        
                       $(".js-range-slider2").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.modification-block').show();
                            },
                            onFinish: function (data) {
                                $('#modif_datestart').val(data.from_value);
                                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
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
                        
                       $(".js-range-slider3").ionRangeSlider({
                            onUpdate: function (data) {
                                $('.main-slider').hide();
                                $('.modification-block').show();
                            },
                            onFinish: function (data) {
                                $('#modif_dateend').val(data.from_value);
                                $('#btn_modifynow').attr('onclick','checkBooking('+booking_id+','+$('#modif_datestart').val()+','+$('#modif_dateend').val()+',\''+fe_typo_user+'\')');
                
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
                        
                    }
                }
    
            }  
                
            console.log('editBooking success');
            
            $('.loader2').hide();
        },  
          error: function(error) {
                console.log('deleteMyBooking error');
                $('.loader2').hide();
          }   
    
    });
    
}




function checkBooking(idBooking,dateStart,dateEnd,fe_typo_user) {
    
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
        data:{action:"checkBooking",idBooking:idBooking,dateStart:dateStart,dateEnd:dateEnd,fe_typo_user:fe_typo_user},
    
          success: function(result) {
                
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                if (result.ressourcenotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcenotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.ressourcedeleted) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.ressourcedesactived) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcedesactived+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                 
                if (result.notassistant) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.notassistant+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.norighttobook) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.norighttobook+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.sharingdeleted) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingdeleted+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.sharingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.sharingclosed) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharingclosed+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.sharinglocked) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.sharinglocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.ressourcelocked) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.ressourcelocked+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingcancelled) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                
                
                
                
                if (result.result) {
                    
                    console.log("modif ok");
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.message0+result.message1+result.message2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    
                    setTimeout(function(){
                        $('.info-block').show();
                    }, 500);
                    
                    
                } else {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.error+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
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


function checkStartMyBooking(bookingId,fe_typo_user) {
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingcancelled) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingnoshow) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnoshow+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingtoolate) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.result) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.checkbookingconfirmstart+'</p>');
                    $('#btn_close').text(trad['validate']);
                    $('#btn_close').attr('onclick','startMyBooking('+bookingId+',\''+fe_typo_user+'\')');
                    $('#btn_cancel').text(trad['cancel']);
                    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
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


function startMyBooking(bookingId,fe_typo_user) {
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingcancelled) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingnoshow) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnoshow+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                 
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                   
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingtoolate) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.result) {
                
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmstart+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
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



function checkEndMyBooking(bookingId,fe_typo_user) {
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
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingcancelled) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingtoolate) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.result) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.checkbookingconfirmend+'</p>');
                    $('#btn_close').text(trad['validate']);
                    $('#btn_close').attr('onclick','endMyBooking('+bookingId+',\''+fe_typo_user+'\')');
                    $('#btn_cancel').text(trad['cancel']);
                    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                                    
                    $('.main-slider').hide();
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


function endMyBooking(bookingId,fe_typo_user) {
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
          data: {action:"enMyBooking",bookingId:bookingId,fe_typo_user:fe_typo_user},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(\''+url+'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookingnotexist) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingnotexist+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                }
                
                if (result.bookinginprogress) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookinginprogress2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinginprogress2+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookingfinished) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingfinished+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookingcancelled) {
                    
                   initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingcancelled+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookinglocked1) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked1+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookinglocked2) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked2+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookinglocked3) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked3+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.bookinglocked4) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookinglocked4+'</p>');
                    $('#btn_close').attr('onclick','$(\'.info-block\').hide();$(\'.modification-block\').show();');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                
                if (result.bookingtoolate) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingtoolate+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
                    $('.modification-block').hide();
                    $('.info-block').show();
                    
                    
                }
                
                if (result.result) {
                
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.bookingconfirmend+'</p>');
                    $('#btn_close').attr('onclick','getBooking(\''+fe_typo_user+'\',\'refresh\')');
                
                    $('.main-slider').hide();
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
