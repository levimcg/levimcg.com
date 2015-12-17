/*
**  Nice little feature test here instead of using Modernizr
**  https://24ways.org/2015/putting-my-patterns-through-their-paces/
*/

var doc = document.body || document.documentElement;
var style = doc.style;

if ( style.webkitFlexWrap == '' || style.msFlexWrap == '' || style.flexWrap == '' ) {
  doc.className += " supports-flex";
} else {
    doc.className += " no-flex";
}

/*
**  NOTE: Feature detection - if this stuff is true go wild
**  with the JavaScript features. It means that the browser
**  is using JavaScript and probably has good CSS3 support.
*/

/* if(document.querySelector && window.eventListener) {
    // Enhance !
} */
