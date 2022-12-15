$(document).ready(function () {
    let dogsOrMagicCards; // parameter for selection of api (dogs) or database(magic cards)
    const toggle = $('.toggle');
    const form = $('#search-form');

    function checkToggle() {
        toggle.each(function () {
            if ($(this).prop('checked') === true) {
                dogsOrMagicCards = $(this).val();
            }
        });
    }

    function displayDogImages(response) {
        $('#results').empty().append('<div class="col d-flex justify-content-center align-items-center mt-3"  style="min-height: 30vw"> <img src="' + response.message[0] + '" class="rounded img-fluid" alt="Image not found"></div>')

        var i = 1;
        var dogInterval = setInterval(function () {
            var picture = response.message[i++];
            $('#results').fadeOut(500, function () {
                $('#results').empty().append('<div class="col d-flex justify-content-center align-items-center mt-3" style="min-height: 30vw"> <img src="' + picture + '" class="rounded img-fluid" alt="Image not found"></div>').fadeIn(500);
            });
            if (i >= response.message.length) i = 0;

        }, 4000);

        form.on('submit', function (event) {
            event.preventDefault();
            clearInterval(dogInterval);
        });

    }

    function displayMagicImages(response) {
        $('#results').empty().append("<div id='magicCards' class='row g-2'></div>");


        $.each(response, function (key, magicCard) {
            let image = magicCard['Image_URI'];

            //some magic the gathering cards are double-sided and have 2 images
            if (response[key]['Second_Image_Uri'] !== "") {
                $('#magicCards').append("<div class='col-lg-4 col-md-6'><img src='" + image + "' id='" + key + "' class='img-fluid rounded magic-card-double'></div>");
            } else {
                $('#magicCards').append("<div class='col-lg-4 col-md-6'><img src='" + image + "' id='" + key + "' class='img-fluid rounded magic-card'></div>");
            }
        });
    }

    function hoverMagicImage(response) {
        $('.magic-card-double').on('click', function () {
            let elementId = $(this).attr('id');
            let imageOne = response[elementId]['Image_URI'];
            let imageTwo = response[elementId]['Second_Image_Uri'];

            $('#search-button').css("display", "none"); // for some reason the button is still shown, so we need to turn it off.
            $('#overlay').empty().append("<div class='d-flex justify-content-center'>" +
                "<div><img src='" + imageOne + "' class='img-fluid rounded m-md-4' alt='image not found'></div>" +
                "<div><img src='" + imageTwo + "' class='img-fluid rounded m-md-4' alt='image not found'></div>" +
                "</div>").css("display", "block");
        });
        $('#overlay').on('click', function () {

            $('#search-button').css("display", "block");
            $('#overlay').css("display", "none");
        });
    }

    checkToggle();

    toggle.on('click', checkToggle);

    form.on('submit', function (event) {
        event.preventDefault();

        let searchInput = $('#search-string').val();
        let $url = "handler.php";
        $.ajax({
            url: $url,
            cache: false,
            method: "POST",
            dataType: 'json',
            data: {
                searchInput: searchInput,
                dogsOrMagicCards: dogsOrMagicCards
            },
            success: function (response) {
                switch (dogsOrMagicCards){
                    case "Dogs":
                        displayDogImages(response);
                        break;
                    case "Magic_cards":
                        displayMagicImages(response);
                        hoverMagicImage(response);
                        break;
                }
            }
        });
    });
});