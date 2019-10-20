
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = document.body.innerHTML;
    sendResponse({data: data, success: true});
    
    if (request.hasOwnProperty('action')) {
        if (request.action == 'highlight') {
            for (let pattern of request.patterns) {
                let regex = new RegExp(pattern.regex, 'g');
                document.body.innerHTML = document.body.innerHTML.replace(regex, function(match) {
                    return '<span title="' + pattern.tooltip + '" style="background-color: ' + pattern.color + '">' + match + '</span>';
                });
            }
        }
    }
});

chrome.runtime.sendMessage({message: 'get'}, function(response) {
    console.log(response);
});

