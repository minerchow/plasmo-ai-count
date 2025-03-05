import { useState } from "react"

function IndexOptions() {
  const [data, setData] = useState("")
  const [initValue, setInitValue] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault()
    chrome.storage.local.set({ initialCount: initValue }, () => {
      alert('初始值设置成功！')
    })
  }
  return (
    <div style={{ padding: 16 }}>
      <h2>设置初始计数值</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="number"
          value={initValue}
          onChange={(e) => setInitValue(Number(e.target.value))}
          style={{ marginRight: 8, padding: 8 }}
        />
        <button 
          type="submit"
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          保存设置
        </button>
      </form>
    </div>
  )
}

export default IndexOptions
