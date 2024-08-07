import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"
import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import Link from "next/link"
import { analyze } from "@/utils/ai"
import Question from "@/components/Question"

const getEntries = async () => {
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    return(
        <div className="p-8 bg-zinc-100 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="my-8">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4 ml-2">
                <NewEntryCard />
                {entries.map((entry) => (
                <Link href={`/journal/${entry.id}`} key={entry.id}>
                <EntryCard key={entry.id} entry={entry} />
                </Link>
                ))}
            </div>
        </div>
    )
}

export default JournalPage