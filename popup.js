var toggleButton = document.getElementById('toggleOn');
toggleButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (/facebook\.com/.test(tabs[0].url)) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "hide_the_spoilers"});
        }
    });
});
