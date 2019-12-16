enable_flag=false;
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){
      chrome.storage.sync.get(['slack_channel_list'], function(result){
         var channel_list = result.slack_channel_list;
         for(let i=0;i<channel_list.length; i++){
            var url=channel_list[i];
            if($(".p-workspace__channel_sidebar [href^='"+url+"']").length>0){
               enable_flag = !enable_flag;
               if(enable_flag){
                  enable(url);
                  sendResponse({sidebar_status: "restricted"});
               }
               else{
                  disable();
                  sendResponse({sidebar_status: "un-restricted"});
               }
               break;
            }
         }
      });
      return true;
   }
);
function enable(url){
   var target_item = $(".p-workspace__channel_sidebar [href^='"+url+"']");
   target_item[0].click(function(){});
   // click イベントの終了を待たないとlocation.hrefが昔の値となる可能性があるため1秒待機｡何か良い方法が無いかはＴＯＤＯ
   setTimeout(function(){
      window.history.pushState(null, null, location.href);        
      window.onpopstate = function() {
         window.history.pushState(null, null, location.href);        
         return;
      };
   }, 1000);
   $('.p-workspace__channel_sidebar [role=listitem]').not(target_item.parent()).css('display', 'none');
   $('.p-workspace__channel_sidebar').css('pointer-events', 'none');
}
function disable(){
   $('.p-workspace__channel_sidebar [role=listitem]').css('display', '');
   $('.p-workspace__channel_sidebar').css('pointer-events', '');
   window.onpopstate = "";
}
