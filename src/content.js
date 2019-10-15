chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = document.body.innerHTML;
    sendResponse({data: data, success: true});
});

