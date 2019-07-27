var countslide = 0;
function getBooking(fe_typo_user,action) {
        
    $('.loader2').show();    
    
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
            type: 'POST',
            url:url,
            dataType: 'json',
            data: {fe_typo_user:fe_typo_user,action:'getBooking'},
            success: function(result, status, jqXHR) {

                console.log("result is " + result);
    
                //console.log(JSON.stringify(jqXHR.responseJSON));
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(url+\'mesreservations.html\', \'_self\')');
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                if (result.result) {
                    if (action == "refresh") {
                         console.log('countslide:'+countslide);
                         for (var i = 0; i < countslide; i++) {
                            clearInterval('x'+i);
                         }
                         $('.main-slider').show();
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
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getPreviewRessource',ressourceId:ressourceId,categoryRessource:categoryRessource,fe_typo_user:fe_typo_user},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(url+\'mesreservations.html\', \'_self\')');
                    
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
                    $('.prewiewsharing_mandatories').html(result.mandatories);
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
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getUserInfo',fe_typo_user:fe_typo_user,owner_id:owner_id},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);
                    window.localStorage.clear();
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(url+\'mesreservations.html\', \'_self\')');
                    
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
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getSiteInfo',site_id:site_id,referentiel_id:referentiel_id,fe_typo_user:fe_typo_user},
    
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);       
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(url+\'mesreservations.html\', \'_self\')');
                    
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


function checkDeleteMyBooking(booking_id,category,ressourceid,fe_typo_user,message,validate,cancel) {
    
    initPopin();
    $('.prewiewsharing_header').hide();
    $('.previewsharing_content').html(trad['confirmdeletebooking']);
    $('#btn_close').text(trad['validate']);
    $('#btn_close').attr('onclick','deleteMyBooking('+booking_id+',\''+category+'\','+ressourceid+',\''+fe_typo_user+'\')');
    $('#btn_cancel').text(trad['cancel']);
    $('#btn_cancel').attr('onclick','$(\'.info-block\').hide();$(\'.main-slider\').show();');
                    
    $('.main-slider').hide();
    $('.info-block').show();
    
}

function deleteMyBooking(booking_id,category,ressourceid,fe_typo_user) {
    
    var L = $("#sysLanguageUid").val();
    $('.loader2').show();
    var domain = window.localStorage.getItem("domain");
    var L = window.localStorage.getItem("language");
    var url = "http://"+domain+"/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=deleteMyBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L;
    $.ajax({
          type: 'GET',
          url:url,
          dataType: "json",
          data:{booking_id:booking_id,category:category,ressourceid:ressourceid,fe_typo_user:fe_typo_user},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    initPopin();
                    $('.prewiewsharing_header').hide();
                    $('.previewsharing_content').html('<p></p><p>'+result.deconnexion+'</p>');
                    
                    var url = window.location.href;
					url = url.substring(0, url.lastIndexOf("/") + 1);       
                    $('#btn_close').attr('onclick','cordova.InAppBrowser.open(url+\'mesreservations.html\', \'_self\')');
                    
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
            
                if (result.ok) {
                    
                    initPopin();
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
    
    initPopin();
    $('#date_start').text(datestart);
    $('#date_end').text(dateend);
    $('#modification_lien1').text(domain);
    $('#modification_lien1').attr('href',url);
    $('#btn_back').attr('onclick','$(\'.modification-block\').hide();$(\'.main-slider\').show();');
    
    


    $(".js-range-slider").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800,
        prefix: "$",
        skin: "big"
    });
    


    $('.main-slider').hide();
    $('.modification-block').show();
    
}