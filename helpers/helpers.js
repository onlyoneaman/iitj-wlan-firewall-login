function increaseSuccessLogins() {
  chrome.storage.sync.get(['wlan_logins'], function(result) {
    let a = Number(result.wlan_logins || '0')
    console.group('Logins')
    console.log('Successful Logins Till Now: ', a)
    chrome.storage.sync.set({'wlan_logins': a+1}, function() {
      console.log('SuccessFul Logins Now: ', a);
      console.groupEnd()
    })
  }
)}