chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active && changeInfo.status === 'loading') {
        if (/facebook\.com/.test(tab.url)) {
            chrome.tabs.sendMessage(tab.id, {message: "hide_the_spoilers"});
        }
    }
});

chrome.tabs.onActivated.addListener(function(ids) {
    chrome.tabs.sendMessage(ids.tabId, {message: "hide_the_spoilers"});
});
