// When the user scrolls the page, execute myFunction
window.onscroll = function () { stickyFunction(); };

// Get the header
var menu = document.getElementById("menu");

// Get the offset position of the navbar
var sticky = menu.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyFunction() {
    if (window.pageYOffset + 30 > sticky) {
        menu.classList.add("sticky");
   // } else {
   //     menu.classList.remove("sticky");
    }
}
