'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)

    setResponse(answer)
    setValue('')
    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 text-lg bg-slate-200 text-black w-full"
          disabled={loading}
          placeholder="Ask a question..."
          style={{ minWidth: '300px' }}  // Adjust the minimum width as needed
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-cyan-600 mt-2 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {response && <p className="my-4 text-xl">{response}</p>}
    </div>
  )
}

export default Question