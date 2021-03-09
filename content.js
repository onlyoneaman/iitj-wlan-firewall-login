console.group("WLan Extension")
chrome.storage.sync.get([
  'wlan_us', 'wlan_pd' 
], (val)=>{
  u = val['wlan_us'];
  p = val['wlan_pd'];
  if(u && p) {
    p = atob(p)
    document.getElementById("ft_un").value = u
    document.getElementById("ft_pd").value = p
    console.log('Set values in Form')
    document.forms[0].submit()
    console.log('Form Submitted')
    increaseSuccessLogins()
  } else {
    console.log('User Credentials not available. Enter Credentials in Popup to Continue.')
  }
  console.groupEnd()
})