function getBooking(cookievalue) {
        
    $('.loader2').show();    
    var L = 0;
    //document.cookie = "fe_typo_user="+cookievalue;
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=getBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    
    
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
    
    /*
    $.ajax({
            type: 'POST',
            url:url,
            dataType: 'json',
            data: {fe_typo_user:cookievalue,action:'getBooking'},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Cookie', 'fe_typo_user='+cookievalue);
            },
            success: function(result, status, jqXHR) {

                console.log("result is " + result);
    
                //console.log(JSON.stringify(jqXHR.responseJSON));
                
                if (result.result) {
                    console.log('BAP');
                    $('.main-slider').html(result.slide);
                    console.log('BAP2');
                    initSlickCarousel();
                    console.log('BAP3');
                } else {
                    
                }
                $('.loader2').hide();

            },

            error: function(xhr, ajaxOptions, thrownError) {
                $('.loader2').hide();
                alert(ajaxOptions + " " + thrownError);
            }
    
         
    });
    */
    
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
                    console.log('BAP');
                    $('.main-slider').html(result.slide);
                    console.log('BAP2');
                    initSlickCarousel();
                    console.log('BAP3');
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