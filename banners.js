"use strict";
const $ = selector => document.querySelector(selector);

var imageCache = [];
var imageCounter = 0;
var timer;

/*var runSlideShow = function() {
    imageCounter = (imageCounter + 1) % imageCache.length;
    var image = imageCache[imageCounter];
    $("image").src = image.src;
    $("caption").firstChild.nodeValue = image.title;
};

window.onload = function () {
    var listNode = $("#image_list");    // the ul element
    var links = listNode.getElementsByTagName("a");
    
    // Preload image, copy title properties, and store in array
    var i, link, image;
    for ( i = 0; i < links.length; i++ ) {
        link = links[i];
        image = new Image();
        image.src = link.getAttribute("href");
        image.title = link.getAttribute("title");
        imageCache[imageCache.length] = image;
    }
    */
    document.addEventListener("DOMContentLoaded", () => { 
        // get all the <a> tags in the ul element
        const links = $("#image_list").querySelectorAll("img");
        const imageCache = [];
        let image = null;
        const mainImage = $("#main_image");   // the img element for the show
        const caption = $("#caption");        // the h2 element for the caption
        let myTimer = null; 
        // Process image links
       
        for ( let link of links ) {
            // Preload image and copy title properties
            image = new Image();
            image.src = link.src;
            image.alt = link.alt;
            // add image to array 
            imageCache[imageCache.length] = image;
        }
       // Attach start and pause event handlers
    $("#start").onclick = function() {
        $("#pause").removeAttribute("disabled");  
        $("#start").setAttribute("disabled", "true"); 
            // Start slide show
        let imageCounter = 0;
        myTimer  = setInterval( () => { 
        // calculate the index for the current image
        imageCounter = (imageCounter + 1) % imageCache.length;
        console.log("imageCounter=" + imageCounter); 
        // get image from array
        image = imageCache[imageCounter];
        // set HTML img and h2 with values from image object
        mainImage.src = image.src;
        mainImage.alt = image.alt;
        caption.textContent = image.alt;
        },
        2000);  // 2 second interval   
    };

    $("#pause").onclick = function() {
        $("#pause").setAttribute("disabled", "true");  
        $("#start").removeAttribute("disabled");  
        clearInterval(myTimer); 
    };
});