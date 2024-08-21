const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()
    // Check if analysis exists
    const summary = entry.analysis?.summary || "No summary available";
    const mood = entry.analysis?.mood || "No mood recorded";

    return(
        <div className="divide-y divide-gray-800 overflow-hidden rounded-lg bg-slate-200 shadow">
            <div className="px-4 py-5">{date}</div>
            <div className="px-4 py-5">{summary}</div>
            <div className="px-4 py-5">{mood}</div>
        </div>
    )
}

export default EntryCard