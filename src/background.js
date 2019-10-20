console.log("background");

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (sender.hasOwnProperty('tab')) {
        const axios = require('axios');
        axios
            .get('http://otrarserver.test.cgr/') // Change this later on
            .then(function(response) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {patterns: response.data, action: 'highlight'});
                });
            })
            .catch(function(error) {
                //Some error handling
            });
    }
});



/*
chrome.webRequest.onSendHeaders.addListener(
    function(details) {
        // console.log(details);
        // if (details.initiator.match(/chrome-extension/g) === null) {
            var xhr = new XMLHttpRequest();
            var url = 'http://server_name';//change server_name
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    console.log('Response: ' + xhr.responseText);
                }
            };
            details = '{"headers": ' + JSON.stringify(details) + '}';
            console.log(details, xhr);
            xhr.send(details);
        // }
    },
    {urls: ["<all_urls>"]},
    ['requestHeaders']
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details){
        // console.log(details);
        // if (details.initiator.match(/chrome-extension/g) === null) {
            var xhr = new XMLHttpRequest();
            var url = 'http://server_name';//change server_name
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    console.log('Response: ' + xhr.responseText);
                }
            };
            details = '{"body": ' + JSON.stringify(details) + '}';
            xhr.send(details, xhr);
        // }
    },
    {urls: ["<all_urls>"]},
    ['requestBody']
);
*/