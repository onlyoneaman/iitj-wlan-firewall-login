import {MY_USERNAME, MY_PASSWORD} from './Enums/StorageEnums'
import RunServer from './Common/ApiCalls/Apis'
import Sleep from './Common/helpers/Sleep'

/*global chrome*/

export async function saveCreds(username, password) {
  chrome.storage.sync.set({
    MY_USERNAME: username, 
    MY_PASSWORD: password
  }, ()=>{console.log("Credentials Updated Successfully")})
}

export async function getCredsFromChrome() {
  let u, p;
  if( RunServer || process.env.NODE_ENV !== 'development') {
    chrome.storage.sync.get([
      MY_USERNAME, MY_PASSWORD 
    ], (val)=>{
      u = val.MY_USERNAME;
      p = val.MY_PASSWORD;
    })
    return [u, p];
  } else {
    Sleep(3000)
      .then(r => {
        console.log('finish');
        [u,p] = dummyCreds()
      })
    console.log('next')
    return [u, p]
  }
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

function dummyCreds() {
  return ['kumar', 'password']
}