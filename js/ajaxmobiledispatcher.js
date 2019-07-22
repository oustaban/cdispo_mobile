function getBooking(cookievalue,action) {
        
    $('.loader2').show();    
    var L = 0;
    //document.cookie = "fe_typo_user="+cookievalue;
    //var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=getBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    
    
    //cordova.plugin.http.setCookie(url, 'fe_typo_user='+cookievalue);
    
    /*
    const options = {
        method: 'post',
        data: {cookie:cookievalue},
        headers: { Cookie: 'fe_typo_user='+cookievalue}
    };
       
    cordova.plugin.http.sendRequest(url, options, function(response) {
            // prints 200
            console.log(response.status);
            console.log(response.data);
            console.log(response.url);
            console.log(response.header);
            if (response.data.result) {
                console.log('BAP');
                $('.main-slider').html(response.slide);
                console.log('BAP2');
                initSlickCarousel();
                console.log('BAP3');
            } else {
                console.log('BOUU');
            }
            $('.loader2').hide();
        }, function(response) {
            // prints 403
            console.log(response.status);
       
            //prints Permission denied
            console.log(response.error);
        
        
            $('.loader2').hide();
                
        }
    );
    */
    
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    var data = cookievalue.split(";");
    $.ajax({
            type: 'POST',
            url:url,
            dataType: 'json',
            data: {fe_typo_user:data[0],action:'getBooking'},
            success: function(result, status, jqXHR) {

                console.log("result is " + result);
    
                //console.log(JSON.stringify(jqXHR.responseJSON));
                
                if (result.result) {
                    if (action == "refresh") {
                        $('.main-slider').slick('unslick');
                    }
                    $('.main-slider').html(result.slide);
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


function getPreviewRessource(ressourceId,categoryRessource,fe_typo_user) {
    var L = 0;
    $('.loader2').show();
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    $.ajax({
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getPreviewRessource',ressourceId:ressourceId,categoryRessource:categoryRessource,fe_typo_user:fe_typo_user},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    $('.info-block').html(result.deconnexion);
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                if (result.ressourcedeleted) {
                    
                    $('.info-block').html(result.ressourcedeleted);
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
                
                
                if (result.ok) {
                    $('.info-block').html(result.content);
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



function getUserInfo(fe_typo_user) {
    var L = 0;
    $('.loader2').show();
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    $.ajax({
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getUserInfo',fe_typo_user:fe_typo_user},
          
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    $('.info-block').html(result.deconnexion);
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                
                if (result.ok) {
                    
                    $('.info-block').html(result.content);
                    
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
    
    var L = $("#sysLanguageUid").val();
    $('.loader2').show();
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=dispatcher&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    $.ajax({
          type: 'POST',
          url:url,
          dataType: "json",
          data:{action:'getSiteInfo',site_id:site_id,referentiel_id:referentiel_id,fe_typo_user:fe_typo_user},
    
          success: function(result) {
            
                if (result.deconnexion) {
                    
                    $('.info-block').html(result.deconnexion);
                    
                    $('.main-slider').hide();
                    $('.info-block').show();
                
                }
            
                if (result.ok) {
                    
                    $('.info-block').html(result.content);
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