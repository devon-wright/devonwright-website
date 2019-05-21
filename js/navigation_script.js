$(window).on('load', function() {
    var nav_links_element = $("#nav-links-container");

    var nav_home_button = $("#nav-home-button");
    var nav_dev_button = $("#nav-dev-button");
    var nav_photo_button = $("#nav-photo-button");
    var nav_barista_button = $("#nav-barista-button");
    var nav_contact_button = $("#nav-contact-button");

    //go through each button and add a hover listener to it
    //it will zoom away icon and fade in text
    $("#nav-home-button").on("click", function (){
        location.href = "/index.html";
    });

    $("#nav-dev-button").on("click", function (){
        location.href = "/developer.html";
    });

    $("#nav-photo-button").on("click", function (){
        location.href = "/photography.html";
    });

    $("#nav-barista-button").on("click", function (){
        location.href = "/barista.html";
    });

    $("#nav-contact-button").on("click", function (){
        location.href = "/contact.html";
    });

    console.log("Loaded Navigation JS");
});
