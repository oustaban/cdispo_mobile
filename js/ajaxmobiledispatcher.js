function getBooking(cookievalue) {
        
    $('.loader2').show();    
    var L = 0;
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=getBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    $.ajax({
            type: 'POST',
            url:url,
            data: {fe_typo_user:cookievalue},
            dataType: "json",
            crossDomain: true,
          
            success: function(result, status, jqXHR) {

                console.log("result is " + result);
    
                console.log(JSON.stringify(jqXHR.responseJSON));
                
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