function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};
  
function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function toggleBlock(elementId, arrowId) {
    var x = document.getElementById(elementId);
    var arrow = document.getElementById(arrowId);
    if (x.style.display === "none" || x.style.display === "") {
        arrow.classList.add("transform", "rotate-180");
        fadeIn(x);
    } else {
        arrow.classList.remove("transform", "rotate-180");
        fadeOut(x);
    }
}