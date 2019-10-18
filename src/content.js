
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = document.body.innerHTML;
    sendResponse({data: data, success: true});
    
    if( request.todo == "changeColor") {
        var matches = [
            {
                'id': 1, 
                'color': '#da0e0e', 
                'pattern': /(\d+)\s+(\w{2})(\s?\d{1,4})\s+(\w{1,4})\s+(\w{3})\s+(\d+\s)?(\w{3})\s+(\d+\s+)?(\d{4})\s+(\d{4})\s+(\d+)\s+(\d{2}[A-Z]{3}\d{2})\s+(\d{2}[A-Z]{3}\d{2})\s+(\w+)\s+(\d{1,2}\:\d{1,2})/g
            }
        ];// change matches
        var tags = document.getElementsByClassName('mg1');
        tags.forEach(function(items){
            matches.forEach(function(element) {
                var tag = items.innerHTML;
                var result = tag.match(element.pattern);
                if(result) { 
                    items.style.color = request.clickedColor;
                }
            });
        });
    }
});