import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">My first journal app:)</h1>
        <p className="text-2xl text-gray-400 mb-4">This is an app that tracks your mood throught your life, just be honest</p>
        <div>
          <Link href={href}>
            <button className="bg-cyan-600 px-4 py-2 rounded-lg text-xl">Go to Journal</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
