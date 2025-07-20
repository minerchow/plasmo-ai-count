chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SELECTION_TEXT') {
    console.log("background",request.text)
    chrome.storage.local.set({ selectionText: request.text });
  }
});

export {}
console.log("HELLO WORLD FROM BGSCRIPTS");