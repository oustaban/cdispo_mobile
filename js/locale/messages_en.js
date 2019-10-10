/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: FR (French; français)
 */

$.extend( $.validator.messages, {
	required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateNL: "Please enter a valid date.",
		timeNL: "Please enter a valid time in 12-hour am/pm format",
		dateITA: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please select an element!" ),
		min: $.validator.format( "Please select an element!" ),
		step: $.validator.format( "Please enter a multiple of {0}." )
} );
