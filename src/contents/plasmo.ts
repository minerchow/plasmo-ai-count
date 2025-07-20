import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded");

  // 添加文本选择监听
  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection().toString().trim();
    console.log("selection",selection)
    if (selection) {
      chrome.storage.local.set({ selectedText: selection });
    }
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
    countDiv.textContent = `当前计数1: ${count}`;
    document.body.appendChild(countDiv);
  }
})