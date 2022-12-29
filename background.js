/*
Copyright [2023] [Koushik Shom Choudhury]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  await chrome.scripting.executeScript({
    files: ["jquery.min.js"],
    target: { tabId: tab.id },
  });

  if (nextState === 'ON') {
    await chrome.scripting.executeScript({
      files: ["check-all.js"],
      target: { tabId: tab.id },
    });
  } else {
    await chrome.scripting.executeScript({
      files: ["uncheck-all.js"],
      target: { tabId: tab.id },
    });
  }
  
});
