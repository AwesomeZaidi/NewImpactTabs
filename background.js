//This file should watch for a new tab to open, track timer, etc, storage
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
//   $scope.websiteList = [];
//
//   function addWebsite(tabId) {
var timers = {};
chrome.tabs.onUpdated.addListener(function() {
  console.log("testingonUpdate");
})
chrome.tabs.onActiveChanged.addListener(function(tabId,selectInfo) {
  console.clear();
  Object.keys(timers).forEach(k => {
    console.log(`${k}: ${timers[k].totalTime}s`);
    console.log(timers);
  });
  chrome.tabs.get(tabId, function (tab) {
      $('#resultslist').html('');
      var url = new URI(tab.url);
      var timeSpent = 0;
      url = url.domain().replace(".","_");

      if (!timers[url])
        timers[url] = {
          taskStart:new Date(),
          totalTime:0
        };
      console.log(`Other domains: ${Object.keys(timers).filter(k => k != url).length}`);
      // $('#resultslist').append("<li><span>"+totalTime+"</span></li>");
      let allTimers = Object.keys(timers).map(k => {let result = timers[k]; result.key = k; return result;});
      let otherTimers = allTimers.filter(t => t.key != url);
      let thisTimer = allTimers.find(t => t.key == url);
      let runningTimers = allTimers.filter(t => t.taskStart)

      allTimers.forEach(t => {
        $('#resultslist').append(`<p>${t.key}: ${t.totalTime}</p>`);
      });

      runningTimers.forEach(t => {
        let s = (new Date() - t.taskStart) / 1000
        t.totalTime += Math.round(s);
      });

      otherTimers.forEach(t => t.taskStart = null);

      thisTimer.taskStart = new Date();


      // $scope.websiteList.push(url);
      // console.log(url);

      //Program Trace
      //Create timer
      //If url already exists in dict
      //This function will run for each timer
  });
  
  $(document).ready(function(){
    setTimeout(function(){
       PopUp();
    },5000); // 5000 to load it after 5 seconds from page load
  });

    var omniCounter=0;
    var viaCounter=0;
    var mstechCounter=0;
    for (j=0;j<Object.keys(timers).length; j++) {
      if (Object.keys(timers)[j] == "doodle_com") {
          omniCounter+=1;
          console.log("https://www.omnipointment.com");
          if (omniCounter<=1) {
            document.getElementById("suggestSiteOne").innerHTML= "<h2>https://www.omnipointment.com</h2>"
          }
          else {
            break;
          }
      }
      if (Object.keys(timers)[j] == "uber_com") {
        viaCounter+=1;
        if (viaCounter<=1) {
          document.getElementById("suggestSiteOne").innerHTML= "<h2>https://www.via.com</h2>"
          console.log("https://www.via.com");
        }
        else {
          break;
        }
      }
      if (Object.keys(timers)[j] == "chiwomenintech_com") {
        mstechCounter+=1;
        if (mstechCounter<=1) {
          document.getElementById("suggestSiteOne").innerHTML= "<h2>https://www.ms-tech.co</h2>"
        console.log("https://www.ms-tech.co");
        }
        else {
          break;
        }
      }
    }
      

  // var limit = timers.youtube_com.totalTime+timers.twitter_com.totalTime
  // console.log("limit="+limit);
  // if (limit > 40) {
  //   console.log("Passed Limit Mfer");
  // }

  // console.log("list="+list);

});