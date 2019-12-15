chrome.browserAction.onClicked.addListener(function(tab){
   chrome.tabs.sendMessage(tab.id, {message: "start restrictor"}, function(response) {
      if(chrome.runtime.lastError){
         // maybe content scripts is not injected
         return;
      }
      //console.log("response.greeting="+ response);
   });
});

