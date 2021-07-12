const options = {
    animationDuration: 0.05,
    callbacks: {
        onInit: function() { 
            filterizr.sort('name', 'asc');
        },
        onFilteringStart: function() {},
        onFilteringEnd: function() {},
        onShufflingStart: function() {},
        onShufflingEnd: function() {},
        onSortingStart: function() {},
        onSortingEnd: function() {}
    },
};

const filterizr = new Filterizr('.filter-container', options);

$(function() {
    $(".filtr-item").each(function() {
        $(this).on('mouseover', function() {
            $(this).find(".absolute").fadeIn(200);
        });
        $(this).on('mouseleave', function() {
            $(this).find(".absolute").fadeOut(200);
        });
    });
});