import React from 'react'

export default function Recommend({data}) {
  return (

    <div className='mb-16'>
      {/* Photo slider */}
      <div className=' overflow-auto touch-auto'>
        <div className='flex w-fit'>
          <div className='w-[200px] h-[160px] bg-gray-400 rounded-lg mr-3'></div>
          <div className='w-[200px] h-[160px] bg-gray-400 rounded-lg mr-3'></div>
          <div className='w-[200px] h-[160px] bg-gray-400 rounded-lg mr-3'></div>
        </div>
      </div>

      {/* Content */}
      <div>

        {/* User */}
        <div className='flex items-center my-4'>
          <div className='w-[32px] h-[32px] rounded-full bg-gray-900'></div>
          <div className='ml-3'>기묘림</div>
          <div className='ml-3 text-[#949494]'>SLIVER</div>
        </div>

        {/* Article */}
        <div className='mb-4'>
          <div className=' font-semibold text-xl mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>본문 타이틀 내용 본문 타이틀 내용 본문 타이틀 내용 본문 타이틀 내용</div>
          <div className=' text-base text-[#949494]'>
            내용을 입력하세요. 두 줄 이상으로 넘어가면 더보기가 뜹니다. 
            내용을 입력하세요. 두 줄 이상으로 넘어가면 더보기가 뜹니다.
            내용을 입력하세요. 두 줄 이상으로 넘어가면 더보기가 뜹니다.
            {/* 두줄 더보기 기능 추가하기 */}
          </div>
        </div>

        {/* Keyword */}
        <div className='flex'>
          <div className='px-3 py-1 mr-2 bg-slate-300 rounded-lg'>당일치기</div>
          <div className='px-3 py-1 mr-2 bg-slate-300 rounded-lg'>섬</div>
          <div className='px-3 py-1 mr-2 bg-slate-300 rounded-lg'>식도락</div>
        </div>

      </div>




      {/* <div>서버에서 받은 추천 페이지: {JSON.stringify(data)}</div> */}
    </div>
  )
}
