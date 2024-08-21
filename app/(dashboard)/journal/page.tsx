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
        include: {
            analysis: true, // Include the related Analysis data
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
        <div className="p-8 bg-sky-950 text-white">
            <h2 className="text-3xl mb-8 flex justify-center">Journal</h2>
            <div className="my-8 flex justify-center">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4 ml-2 text-black">
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