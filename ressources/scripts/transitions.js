function initNavEffect() {

    $(".nav-link").hover(function() {
        $(this).prev().toggleClass("text-sptlred")
    })

    $("#who-am-i")
        .on('mouseenter', function() {
            $("#fullname").glitch({
                charTime: 1,
                chars: '_',
                finalText: "Lucas Chaplain"
            });
            $("#job").glitch({
                charTime: 1,
                chars: '_',
                finalText: "design & développement web"
            });
        })
        .on('mouseleave', function() {
            $("#fullname").glitch({
                charTime: 1,
                chars: '_',
                finalText: "Lucas Chaplain"
            })
            $("#job").glitch({
                charTime: 1,
                chars: '_',
                finalText: "design & développement web"
            })
        })

    $("#about-link")
        .on('mouseover', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "À propos"
            })
        .on('mouseleave', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "À propos"
            });
        });
    });

    $("#services-link")
        .on('mouseover', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Services"
            })
        .on('mouseleave', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Services"
            });
        });
    });

    $("#creations-link")
        .on('mouseover', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Créations"
            })
        .on('mouseleave', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Créations"
            });
        });
    });

    $("#contact-link")
        .on('mouseover', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Contact"
            })
        .on('mouseleave', function() {
            $(this).glitch({
                charTime: 1,
                chars: '▲⬤■',
                finalText: "Contact"
            });
        });
    });

    $("#github-link")
    .hover(function() {
        $(this).find("span")
        .toggle()
        .glitch({
            charTime: 5,
            chars: '.',
            finalText: "GitHub"
        })
    })

    $("#whatsapp-link")
    .hover(function() {
        $(this).find("span")
        .toggle()
        .glitch({
            charTime: 5,
            chars: '.',
            finalText: "WhatsApp"
        })
    })

};

$(document).ready(function(){
    if (document.title = "Lucas Chaplain - Design & développement web") {
        $('footer').css('display', 'none');
        $('footer').fadeIn(1000);
    }
    $('main').css('display', 'none');
    $('main').fadeIn(1000);
    initNavEffect();
});