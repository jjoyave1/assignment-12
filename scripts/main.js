//FLICKR PICS
// var foodpicsTemplate = _.template($('#foodTemplate').text());


var flickrKeyCode = '849c1dd07ac410f7ffc69b61a1e44400';
var url = 'https://api.flickr.com/services/rest/?&method=flickr.galleries.getPhotos&api_key=' + flickrKeyCode + '&gallery_id=5704-72157653593281981&format=json&extras=url_m&callback=jsonFlickrApi';

var images = [];

$.ajax(url, {
  dataType: 'jsonp',
  jsonpCallback: 'jsonFlickrApi',
  success: function(data) {
    var photos = data.photos.photo;
    // processFlickr(photos);
    images.push(photos);


  _.each(images, function(image) {

    console.log(image.url_m);
    $('.flickrPics').append('<img src="' + image.url_m + '">');
    });

  }
});



// function processFlickr(pics) {
//   pics.forEach(function(pic) {
//     var $element = foodpicsTemplate(pic);
//     $('.flickrPics').append($element);

//   });
// };

// var imgSlider = new SimpleSlider(document.getElementById('myslider'));

// console.log(imgSlider);







//Pulls appetizers from API
 var appTemplate = _.template($('#app-template').text());
 var entreeTemplate = _.template($('#entree-template').text());
 var sideTemplate = _.template($('#side-template').text());


 $.getJSON("http://private-anon-60601716e-restaurantapi.apiary-mock.com/menu-1", function(items){
   processApps(items.appetizers);
   });

 function processApps(items) {
   items.forEach(function(app){
     var $element = appTemplate(app);
     $('#apps-tab').append($element);
   });
 }

  $.getJSON("http://private-anon-60601716e-restaurantapi.apiary-mock.com/menu-1", function(items){
   processEntrees(items.entrees);
   });

 function processEntrees(items) {
   items.forEach(function(entree){
     var $element = entreeTemplate(entree);
     $('#entrees-tab').append($element);
   });
 }

  $.getJSON("http://private-anon-60601716e-restaurantapi.apiary-mock.com/menu-1", function(items){
   processSides(items.appetizers);
   });

 function processSides(items) {
   items.forEach(function(side){
     var $element = sideTemplate(side);
     $('#sides-tab').append($element);
   });
 }


// START OF TAB BOX FUNCTIONS


$('.tabTitleMenu').on('click', function(){
  $('#menu-tab').removeClass('hide');
  $('#history-tab').addClass('hide');
  $('#drinks-tab').addClass('hide');
  $('#story-tab').addClass('hide');

  $('.tabTitleMenu').addClass('selected');
  $('.tabTitleHistory').removeClass('selected');
  $('.tabTitleDrinks').removeClass('selected');
  $('.tabTitleStory').removeClass('selected');
});

$('.tabTitleStory').on('click', function(){

  $('#menu-tab').addClass('hide');
  $('#history-tab').addClass('hide');
  $('#drinks-tab').addClass('hide');
  $('#story-tab').removeClass('hide');

  $('.tabTitleMenu').removeClass('selected');
  $('.tabTitleHistory').removeClass('selected');
  $('.tabTitleDrinks').removeClass('selected');
  $('.tabTitleStory').addClass('selected');

});

$('.tabTitleHistory').on('click', function(){

  $('#history-tab').removeClass('hide');
  $('#menu-tab').addClass('hide');
  $('#drinks-tab').addClass('hide');
  $('#story-tab').addClass('hide');

  $('.tabTitleMenu').removeClass('selected');
  $('.tabTitleHistory').addClass('selected');
  $('.tabTitleDrinks').removeClass('selected');
  $('.tabTitleStory').removeClass('selected');

});

$('.tabTitleDrinks').on('click', function(){

  $('#history-tab').addClass('hide');
  $('#menu-tab').addClass('hide');
  $('#story-tab').addClass('hide');
  $('#drinks-tab').removeClass('hide');

  $('.tabTitleMenu').removeClass('selected');
  $('.tabTitleHistory').removeClass('selected');
  $('.tabTitleDrinks').addClass('selected');
  $('.tabTitleStory').removeClass('selected');

});

// END TAB BOX FUNCTIONS


// START  News & Special
var newsTemplate = _.template($('#newsTemplate').text());

$.getJSON("http://private-anon-d51db0770-restaurantapi.apiary-mock.com/news/latest", function(blog){
  processNews(blog);
});
function processNews(news){
  var $element = newsTemplate(news);
  $('.news').append($element);
};

// $.getJSON("http://private-anon-d51db0770-restaurantapi.apiary-mock.com/menu/special",
//   function(items){});

var dailySpecial;

$.getJSON("http://private-anon-d51db0770-restaurantapi.apiary-mock.com/menu/special"
, function(spec){
  dailySpecial = spec.menu_item_id;
});

$.getJSON("http://private-anon-d51db0770-restaurantapi.apiary-mock.com/menu-1",
  function(spec){
  spec.entrees.forEach(function(entree){

    if (entree.id == dailySpecial) {
      $('.special').html('<h3>Our Daily Special</h3>' + '<p>'+ entree.item  + '<p>' +'Price $' + entree.price + '<p>' + entree.description + '</p>')
    }
  });
});


// MENU TAB BOX FUNCTIONS

$('.tabTitleApps').on('click', function(){
  $('#apps-tab').removeClass('menuHide');
  $('#entrees-tab').addClass('menuHide');
  $('#sides-tab').addClass('menuHide');


  $('.tabTitleApps').addClass('sel');
  $('.tabTitleEntrees').removeClass('sel');
  $('.tabTitleSides').removeClass('sel');

});

$('.tabTitleEntrees').on('click', function(){

  $('#apps-tab').addClass('menuHide');
  $('#entrees-tab').removeClass('menuHide');
  $('#sides-tab').addClass('menuHide');

  $('.tabTitleApps').removeClass('sel');
  $('.tabTitleEntrees').addClass('sel');
  $('.tabTitleSides').removeClass('sel');

});

$('.tabTitleSides').on('click', function(){

  $('#apps-tab').addClass('menuHide');
  $('#entrees-tab').addClass('menuHide');
  $('#sides-tab').removeClass('menuHide');

  $('.tabTitleApps').removeClass('sel');
  $('.tabTitleEntrees').removeClass('sel');
  $('.tabTitleSides').addClass('sel');

});
