chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(
      tab.id,
      { toggle: true },
      function(response) {
        var enabledForTab = response.enabled;
        var icon = (enabledForTab ? 'on' : 'off') + '.png';
        var title = 'Click to ' + 
          (enabledForTab ? 'disable' : 'enable');
        chrome.browserAction.setIcon({
          path: icon,
          tabId: tab.id
        });
        chrome.browserAction.setTitle({
          title: title,
          tabId: tab.id
        });
      });
  });
});
