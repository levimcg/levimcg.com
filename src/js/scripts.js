/*
**  Creates a dynamic copyright date and inserts it
**  into the page.
*/
var elCopyRight = document.getElementById('mcg-copy-year');
var currentDate = new Date().getFullYear();

if(elCopyRight) {
    elCopyRight.innerText = currentDate;
}

