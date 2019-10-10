/**
 * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
 *
 * @example $.validator.methods.date("01/01/1900")
 * @result true
 *
 * @example $.validator.methods.date("01/13/1990")
 * @result false
 *
 * @example $.validator.methods.date("01.01.1900")
 * @result false
 *
 * @example <input name="pippo" class="{dateITA:true}" />
 * @desc Declares an optional input element whose value must be a valid date.
 *
 * @name $.validator.methods.dateITA
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */

$.validator.addMethod( "dateNL", function( value, element ) {
	return this.optional( element ) || /^(0?[1-9]|1[012])[\.\/\-](0?[1-9]|[12]\d|3[01])[\.\/\-]([12]\d)?(\d\d)$/.test( value );
}, $.validator.messages.date );
$.validator.addMethod( "timeNL", function( value, element ) {
		return this.optional( element ) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test( value );
}, "Please enter a valid time in 12-hour am/pm format" );
$.validator.addMethod('le', function (value, element, param) {
		return this.optional(element) || parseInt(value) >= parseInt($(param).val());
}, 'The end date / time must be greater than or equal to the date / time of the day.');
