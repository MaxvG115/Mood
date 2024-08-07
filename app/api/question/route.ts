import { qa } from '@/utils/ai'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'

export const POST = async (request) => {
  const { question } = await request.json()
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}