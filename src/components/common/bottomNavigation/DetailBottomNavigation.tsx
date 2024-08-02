import Link from 'next/link'
import React from 'react'

function DetailBottomNavigation() {
  return (
    <div className="fixed bottom-0 right-0 z-10 flex justify-center gap-[48px] w-full bg-white pt-5xs pb-xs px-xs shadow-thumb">
      {/* TODO: ICON 및 디자인 변경 */}
      <Link href='/' className="flex flex-col items-center">
        home
      </Link>
      <Link href='/plan' className="flex flex-col items-center">
        plan
      </Link>
      <Link href='/comunity' className="flex flex-col items-center">
        community
      </Link>
      <Link href='/mypage' className="flex flex-col items-center">
        mypage
      </Link>
    </div>
  )
}

export default DetailBottomNavigation
