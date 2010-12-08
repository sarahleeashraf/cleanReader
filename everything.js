===manifest.json:
{
  "name": "qr-ome",
  "version": "0.3",
  "description": "Shows you QR codes for links",
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "js": ["jquery.min.js", "qrcode.js"],
      "css": ["qrcode.css"]
    }
  ],
  "background_page": "background.html",
  "browser_action": {
    "default_icon": "off.png",
    "default_title": "Click to enable QR-ome!"
  },
  "permissions": [
    "tabs"
  ]
}

===background.html:
<script src="background.js">
</script>

===background.js:
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {toggle: true}, function(response) {
      var enabledForTab = response.enabled;
      var icon = (enabledForTab ? 'on' : 'off') + '.png';
      var title = 'Click to ' + (enabledForTab ? 'disable' : 'enable');
      chrome.browserAction.setIcon({path: icon, tabId: tab.id});
      chrome.browserAction.setTitle({title: title, tabId: tab.id});
    });
  });
});




===qrcode.js:
var isEnabled = false;

chrome.extension.onRequest.addListener(
  function(msg, sender, response) {
    if (msg.toggle) {
      isEnabled = !isEnabled;
    }
    response({enabled: isEnabled});
  });

function addQrCode(text) {
  if (!isEnabled) {
    return;
  }
  var imgSrc = "http://chart.apis.google.com/chart" +
    "?cht=qr&chs=192x192&chl=" + encodeURIComponent(text);
  var qrcode = jQuery('<img />');
  qrcode.attr({src: imgSrc,id: 'qrcode'});
  jQuery('body').append(qrcode);
}

jQuery('a').mouseover(function() {
  addQrCode(this.href);
}).mouseout(function() {
  jQuery('#qrcode').remove();
});
