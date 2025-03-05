import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded")

  chrome.storage.local.get(['count', 'initialCount'], (result) => {
    const initialValue = result.initialCount || 0;
    updateCountDisplay(result.count !== undefined ? result.count : initialValue);
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'COUNT_UPDATE') {
      updateCountDisplay(message.count)
    }
  });
  
  function updateCountDisplay(count) {
    const existingCountDiv = document.getElementById('plasmo-count-display');
    if (existingCountDiv) {
      existingCountDiv.remove();
    }
    const countDiv = document.createElement('div');
    countDiv.id = 'plasmo-count-display';
    countDiv.style.position = 'fixed';
    countDiv.style.top = '20px';
    countDiv.style.right = '20px';
    countDiv.style.padding = '10px';
    countDiv.style.background = 'rgba(0,0,0,0.7)';
    countDiv.style.color = 'white';
    countDiv.textContent = `当前计数: ${count}`;
    document.body.appendChild(countDiv);
  }
})
