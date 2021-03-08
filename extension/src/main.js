import {MY_USERNAME, MY_PASSWORD} from './Enums/StorageEnums'

/*global chrome*/

export async function saveCreds(username, password) {
  chrome.storage.sync.set({
    MY_USERNAME: username, 
    MY_PASSWORD: password
  }, ()=>{console.log("Credentials Updated Successfully")})
}

export async function getCredsFromChrome() {
  let u, p;
  chrome.storage.sync.get([
    MY_USERNAME, MY_PASSWORD 
  ], (val)=>{
    u = val.MY_USERNAME;
    p = val.MY_PASSWORD;
  })
  return [u, p];
}

export async function changeColor() {
  chrome.storage.sync.set({color: "#3aa757"}, ()=>{});

  await chrome.tabs.query({active: true, currentWindow: true}, 
    (
      r => {
      chrome.tabs.executeScript(r[0].id , {file: 'scripts/changeBgColor.js'}, function() {
        if(chrome.runtime.lastError) {
          console.error("Script injection failed: " + chrome.runtime.lastError.message);
        }
      })
    }
  ));
  
}