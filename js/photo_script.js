$(window).on('load', function() {

  //Load up elements
  var photo_display_ele = $('#photo-display-img');
  var caption_display_ele = $('#photo-caption-span');
  var left_button_ele = $('#button-left');
  var right_button_ele = $('#button-right');
  var image_num_ele = $('#image-number');

  //list of images (update when adding new Images)
  var base_image_dir = "resources\\imgs\\photopage\\";
  var image_list = ["img (1).jpg",
                    "img (2).jpg",
                    "img (3).jpg",
                    "img (4).jpg",
                    "img (5).jpg",
                    "img (6).jpg",
                    "img (7).jpg",
                    "img (8).jpg"];
  var curr_image_number = 0;
  var caption_list = ["Image taken atop of the Mt in Tauranga - 2018 Jan",
                      "xx",
                      "xx",
                      "xx",
                      "xx",
                      "xx",
                      "xx",
                      "xx"
                  ];

  //update display
  function update(){
    console.log("Updating");
    image_num_ele.text((curr_image_number+1) + "/" + image_list.length);
    photo_display_ele.attr("src", base_image_dir + image_list[curr_image_number]);
    caption_display_ele.text(caption_list[curr_image_number]);
  }

  //button click left
  left_button_ele.on("click", function () {
    console.log("Left Click");
    curr_image_number--;
    if(curr_image_number < 0){
      curr_image_number = 0;
    }
    update();
  });

  //button click Wright
  right_button_ele.on("click", function () {
    console.log("RIght Click");
    curr_image_number++;
    if(curr_image_number > (image_list.length-1)){
      curr_image_number = image_list.length-1;
    }
    update();
  });

    update();
    console.log("Loaded photo JS");
});
