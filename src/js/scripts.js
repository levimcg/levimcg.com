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
**  Creates a dynamic copyright date and inserts it
**  into the page.
*/
var elCopyRight = document.getElementById('js-copyright');
var currentDate = new Date().getFullYear();

elCopyRight.innerText = currentDate;

/*
 * Filtering lists - currently using on the library page to
 * filter books based on category
*/
$(function() {

    var $books = $(".library-list li");
    var tagged = {};

    $books.each(function() {
        var book = this;
        var tags = $(this).data("tags");

        if(tags) {
            tags.split(", ").forEach(function(tagName) {
                if (tagged[tagName] == null) {
                    tagged[tagName] = [];
                }

                tagged[tagName].push(book);
            });
        }

    });

    // Select all filter "buttons"
    var $filters = $(".filter li");

    $filters.on("click", function(e) {
        // Capture the what was clicked on.
        var $target = $(e.target);
        var currentTag = $target.data("filter-term");

        $target.addClass("is-active").siblings().removeClass("is-active");

        // Show filtered list
        $books.hide().filter(tagged[currentTag]).fadeIn();

    });

    // Show all books
    $(".js-filter-all").on("click", function() {
        $(this).addClass("is-active");
        $books.hide().fadeIn("fast");
    });

});
