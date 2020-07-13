chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({members: []}, function() {
    console.log("The members is reset.");
  });
  //chrome.storage.sync.remove('members', function() {
  //  console.log("The members has been reset.");
  //});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: 'npm.cpami.gov.tw/apply_1_4.aspx'},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
