
$(function init() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    var title = tab.title;
    console.log(title);
  });
  $('#name').keyup(function(){
    $('#greet').text('Hello ' + $('#name'));
  })
})
