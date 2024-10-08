'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"
import Spinner from './Spinner'

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)

    const {mood, summary, color, subject, negative} = analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value);
            setAnalysis(data.analysis)
            setIsLoading(false)
        },
    })
    const defaultColor = "#FFFFFF"; // Set your default color here
    const backgroundColor = color || defaultColor; // Use the provided color or fallback to default


    return(
        <div className="w-full h-full grid grid-cols-3 gap-0 relative text-black bg-slate-300">
            <div className="absolute left-0 top-0 p-2">
                {isLoading ? (
                <Spinner />
                ) : (
                <div className="w-[16px] h-[16px] rounded-full bg-pink-600"></div>
                )}
            </div>
            <div className="col-span-2">
                <textarea className="w-full h-full p-8 text-xl outline-none  bg-slate-300" value={value} onChange={e => setValue(e.target.value)}></textarea>
            </div>
            <div className="border-l border-black/10">
            <div
            className="px-5 py-8"
            style={{
                backgroundColor: color,
                color: color === "#000000" ? "#FFFFFF" : "#000000", // White text if background is black, otherwise black text
            }}
            >
                <h2 className="text-3xl">Analysis</h2>
            </div>
                <div>
                    <ul>
                        {analysisData.map(item => (
                            <li key={item.name} className="flex items-center justify-between text-lg font-semibold px-2 py-4 border-b border-t border-black/10">
                                <span>{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor