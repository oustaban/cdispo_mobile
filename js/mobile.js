jQuery(function(){
	console.log( "jquery!" );
	initConnect();
	initMobileConnect();
	loader2();
    initPassword();
	initChangePassword();
});


function loader2() {
        var opts = {
        lines: 13, // The number of lines to draw
        length: 7, // The length of each line
        width: 3, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
      };
      
	  var target = document.getElementById('loader2');
      var spinner = new Spinner(opts).spin(target);

	  var loading = $("#loader2");
	  var content = $("#main");

}

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener',
		menuDrop: '.nav-drop'
	});
}


function initConnect() {
	jQuery('#connexion').click(function() {
		$('.loader2').show();
		jQuery("#submitlogin").click();
	});
	
	jQuery('#form_seconnecter a').click(function() {
        $('.loader2').show();
	});
    jQuery('.tx-felogin-pi1 a').click(function() {
        $('.loader2').show();
	});
}

function initPassword() {
	jQuery('#sendpassword').click(function() {
		$('.loader2').show();
		jQuery("#submitpassword").click();
	});
}

function initChangePassword() {
	jQuery('#changepassword').click(function() {
		$('.loader2').show();
		jQuery("#changepasswordsubmit").click();
	});
}


function initMobileConnect() {
	jQuery('#mobileconnexion').click(function() {
		var login = $('#user').val();
		var password = $('#pass').val()
		var L = 0;
		var url = "http://cdispo_preprod.moonlikestudio.com/?type=476&tx_cdispofrontend_fcdispofrontend[controller]=Mobile&tx_cdispofrontend_fcdispofrontend[action]=connexion&tx_cdispofrontend_fcdispofrontend[uid]=1&L="+L
		$.ajax({
			  type: 'POST',
			  url:url,
			  data: {login:login,password:password},
			  dataType: "json",
		
			  success: function(result) {
				if (result[0]) {
                    var cookieName = result[1].ses_name;
					var cookieValue = result[1].ses_id;
					
					cookieMaster.setCookieValue('http://'+result[1].domainsite, cookieName, cookieValue,
						function() {
							console.log('A cookie has been set');
							var url = window.location.href;
							url = url.substring(0, url.lastIndexOf("/") + 1);
							cordova.InAppBrowser.open(url+'main.html', '_self');
							
							//var inAppBrowserRef = cordova.InAppBrowser.open('/main.html', '_self');
						},
						function(error) {
							console.log('Error setting cookie: '+error);
						}
					);
					console.log(result[1].domainsite+':'+cookieName+':'+cookieValue);
					//window.location = "/main.html"
					//var myDate = new Date();
					//myDate.setMonth(myDate.getMonth() + 12);
					//document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + ";domain="+result.domainsite+";path=/";
					//window.location.href = "/index.html";
                } else {
					$('#messageerror').show();
					$('#messageerror').html(result[1]);
					$('#loginmessage').hide();
				}
				
				console.log('initMobileConnect success');
				$('.loader2').hide();
			  },  
			  error: function(error) {
				console.log('initMobileConnect error');
				$('.loader2').hide();
			  }
			  
		}); 
	});
}

