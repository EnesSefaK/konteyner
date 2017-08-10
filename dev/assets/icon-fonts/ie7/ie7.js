/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'konteyner\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-menu': '&#xe90b;',
		'icon-brand': '&#xe907;',
		'icon-gmail': '&#xe907;',
		'icon-caret-up': '&#xe908;',
		'icon-caret-down': '&#xe909;',
		'icon-close': '&#xe900;',
		'icon-remove': '&#xe900;',
		'icon-times': '&#xe900;',
		'icon-movie_creation': '&#xe906;',
		'icon-info': '&#xe902;',
		'icon-chevron-right': '&#xe903;',
		'icon-package': '&#xe901;',
		'icon-info': '&#xe902;',
		'icon-chevron-right': '&#xe903;',
		'icon-chevron-left': '&#xe904;',
		'icon-search': '&#xe905;',
		'icon-office': '&#xe90a;',
		'icon-images': '&#xe90e;',
		'icon-phone': '&#xe942;',
		'icon-location2': '&#xe948;',
		'icon-mobile': '&#xe958;',
		'icon-list2': '&#xe9bb;',
		'icon-checkbox-checked': '&#xea52;',
		'icon-checkbox-unchecked': '&#xea53;',
		'icon-google-plus': '&#xea8b;',
		'icon-facebook': '&#xea90;',
		'icon-instagram': '&#xea92;',
		'icon-twitter': '&#xea96;',
		'icon-youtube': '&#xea9d;',
		'icon-vimeo': '&#xeaa0;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
