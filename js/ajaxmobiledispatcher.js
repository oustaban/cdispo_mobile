function getBooking() {
        
    $('.loader2').show();    
    var L = 0;
    var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=getBooking&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
    $.ajax({
          type: 'POST',
          url:url,
          dataType: "json",
    
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
            console.log('getBooking error');
            $('.loader2').hide();
          }   
    }); 
}