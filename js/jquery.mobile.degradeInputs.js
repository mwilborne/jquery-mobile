//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Changes input type to another after custom enhancements are made (ex. range > numberic).
//>>label: Degrade Inputs
//>>group: Utilities


define( [ "jquery", "./widgets/page", "./jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};

//auto self-init widgets
$.mobile.degradeInputsWithin = function( target ) {

	var $target = $( target );

	// degrade inputs to avoid poorly implemented native functionality
	$target.find( "input" ).not( $.mobile.keepNativeSelector ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = $.mobile.degradeInputs[ type ] || "text",
			html, hasType, findstr, repstr;

		if ( $.mobile.degradeInputs[ type ] ) {
			html = $( "<div>" ).html( $this.clone() ).html();
			// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
			hasType = html.indexOf( " type=" ) > -1;
			findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/;
			repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});

}

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
