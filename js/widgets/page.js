//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Basic page definition and formatting.
//>>label: Page Creation
//>>group: Core

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.core", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
$.mobile.widgets = {};

originalWidget = $.widget;

$.widget = (function( orig ) {
	return function() {
		var constructor = orig.apply( this, arguments ),
			name = constructor.prototype.widgetName;
 
		constructor.initSelector = ( constructor.prototype.initSelector ? constructor.prototype.initSelector : ":jqmData(role='" + name + "')" );
 
		$.mobile.widgets[ name ] = constructor;
 
		return constructor;
	};
})( $.widget );

$.extend( $.widget, {
	extend: originalWidget.extend,
	bridge: originalWidget.bridge
})

$.widget( "mobile.page", {
	options: {
		theme: "a",
		domCache: false,
		//deprcated in 1.4 remove in 1.5
		keepNativeDefault: $.mobile.keepNativeSelector,
		//deprcated in 1.4 remove in 1.5
		contentTheme: null
	},

	// DEPRECATED for > 1.4
	// TODO remove at 1.5
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( "init" );
	},

	_create: function() {
		var attrPrefix = "data-" + $.mobile.ns,
			self = this;
		// if false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-page-theme-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
		this.element.find( "[" + attrPrefix + "role='content']" ).each( function() {
			var $this = $( this ),
				theme = this.getAttribute( attrPrefix + "theme" ) || undefined;
				self.options.contentTheme = theme || self.options.contentTheme || ( self.element.jqmData("role") === "dialog" &&  self.options.theme );
				$this.addClass( "ui-content" );
				if ( self.options.contentTheme ) {
					$this.addClass( "ui-body-" + ( self.options.contentTheme ) );
				}
				// Add ARIA role
				$this.attr( "role", "main" ).addClass( "ui-content" );
		});

		// enhance the page
		//$.mobile._enhancer.enhance( this.element[ 0 ] );
		$.mobile.enhanceWithin( this.element );
	},

	bindRemove: function( callback ) {
		var page = this.element;

		// when dom caching is not enabled or the page is embedded bind to remove the page on hide
		if ( !page.data( "mobile-page" ).options.domCache &&
			page.is( ":jqmData(external-page='true')" ) ) {

			// TODO use _on - that is, sort out why it doesn't work in this case
			page.bind( "pagehide.remove", callback || function(/* e */) {
				var $this = $( this ),
					prEvent = new $.Event( "pageremove" );

				$this.trigger( prEvent );

				if ( !prEvent.isDefaultPrevented() ) {
					$this.removeWithDependents();
				}
			});
		}
	},

	_setOptions: function( options ) {
		if( options.theme !== undefined ) {
			this.element.removeClass( "ui-body-" + this.options.theme ).addClass( "ui-body-" + options.theme );
		}

		if( options.contentTheme !== undefined ) {
			this.element.find( "[data-" + $.mobile.ns + "='content']" ).removeClass( "ui-body-" + this.options.contentTheme )
				.addClass( "ui-body-" + options.contentTheme );
		}

		this._super( options );
	},

	_handlePageBeforeShow: function(/* e */) {
		this.element.parent().content( "option", "theme", this.options.theme );
	},
	//deprcated in 1.4 remove in 1.5
	removeContainerBackground: function() {
		this.element.parent().content( "option", "theme", null );
	},
	//deprcated in 1.4 remove in 1.5
	// set the page container background to the page theme
	setContainerBackground: function( theme ) {
		theme = theme || this.options.theme;
		this.element.parent().content( "option", "theme", theme );
	},
	//deprcated in 1.4 remove in 1.5
	keepNativeSelector: function() {
		return $.mobile.keepNativeSelector;
	}
});
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
