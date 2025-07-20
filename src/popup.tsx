import { useEffect, useState } from "react"

function IndexPopup() {
  const [count, setCount] = useState(0);
  const resetCount = () => {
    chrome.storage.local.remove('count', () => {
      chrome.storage.local.get(['initialCount'], (result) => {
        const initialValue = result.initialCount || 0;
        setCount(initialValue);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'COUNT_UPDATE', count: initialValue });
        });
      });
    });
  };
  useEffect(() => {
    chrome.storage.local.get(['initialCount', 'count'], (result) => {
      const initialValue = result.initialCount || 0;
      setCount(result.count !== undefined ? result.count : initialValue);
    });
  }, []);
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    chrome.storage.local.set({ count: newCount });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'COUNT_UPDATE', count: newCount });
    });
  };
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleStorageChange = (changes) => {
      if (changes.selectedText) {
        setSelectedText(changes.selectedText.newValue);
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "400px"
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      
      <div style={{ marginBottom: 16 }}>
        <h2>Current Count: {count}</h2>
        <button 
          style={{ marginTop: 8, padding: '8px 16px', cursor: 'pointer' }}
          onClick={increment}>
          Increment
        </button>
        <button 
          style={{ marginTop: 8, marginLeft: 8, padding: '8px 16px', cursor: 'pointer' }}
          onClick={resetCount}>
          Reset
        </button>
      </div>

      <div>
        <h3>当前选中内容：</h3>
        <div style={{ 
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 4,
          minHeight: 60
        }}>
          {selectedText || '暂无选中文本'}
        </div>
      </div>
      
      <footer>Crafted by @PlasmoHQ</footer>
    </div>
  )
}

export default IndexPopup