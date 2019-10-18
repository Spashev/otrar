
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = document.body.innerHTML;
    sendResponse({data: data, success: true});
    
    if( request.todo == "changeColor") {
        var matches = [
            {
                id: 1, 
                color: '#da0e0e', 
                pattern: /(\d{1,2})\s+(\w{2})(\s?\d{1,4})\s+(\w{1,4})\s+(\w{3})\s+(\d+\s)?(\w{3})\s+(\d+\s+)?(\d{4})\s+(\d{4})\s+(\d+)\s+(\d{2}[A-Z]{3}\d{2})\s+(\d{2}[A-Z]{3}\d{2})\s+(\w+)\s+(\d{1,2}\:\d{1,2})/
            }
        ];// change matches
        var tags = document.getElementsByClassName('mg1');
        tags.forEach(function(items){
            for(let element of matches) {
                var tag = items.innerHTML;
                var result = tag.match(element.pattern);
                console.log(element);
                if(result) { 
                    items.style.backgroundColor = request.clickedColor;
                }
            }
        });
    }
});