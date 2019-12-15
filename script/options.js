$('#slack-channels').on('click', '.delete-slack-channel', function(){
   $(this).parent().remove();
   save();
});

$('#add-slack-channel').on('click',
   function(){
      var new_url = $('#new-slack-channel').val();
      var url='<span class="channel-url">'+new_url+'</span>';
      var button='<button class="delete-slack-channel">Del</button>';
      $('#slack-channels').append("<li>"+url+button+"</li>");
      save();
   }
);

function save(){
      var channel_list=$('.channel-url').map(function(i,e){return e.innerHTML;});
      chrome.storage.sync.set({slack_channel_list: channel_list}, function(){
         reload();
      });
};

$(document).ready( function (){
   reload();
});

function reload(){
   chrome.storage.sync.get(['slack_channel_list'], function(result){
      var channel_list = result.slack_channel_list;
      $('#slack-channels').empty();
      for(let i=0;i<channel_list.length; i++){
         var new_url=channel_list[i];
         var url='<span class="channel-url">'+new_url+'</span>';
         var button='<button class="delete-slack-channel">Del</button>';
         $('#slack-channels').append("<li>"+url+button+"</li>");
      }
   });
}
