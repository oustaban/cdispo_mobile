function getBooking(cookievalue) {
        
    $('.loader2').show();    
    var L = 0;
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=getBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    /*
    const options = {
        method: 'post',
        headers: { Cookie: 'fe_typo_user='+cookievalue }
    };
       
      cordova.plugin.http.sendRequest(url, options, function(response) {
        // prints 200
        console.log(response.status);
      }, function(response) {
        // prints 403
        console.log(response.status);
       
        //prints Permission denied
        console.log(response.error);
        
        if (response.result) {
            console.log('BAP');
            $('.main-slider').html(response.slide);
            console.log('BAP2');
            initSlickCarousel();
            console.log('BAP3');
        } else {
            
        }
        $('.loader2').hide();
                
      });
    */
    $.ajax({
            type: 'POST',
            url:url,
            dataType: "json",
            crossDomain: true,
            headers: {
                Cookie: 'fe_typo_user='+cookievalue
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
    
}