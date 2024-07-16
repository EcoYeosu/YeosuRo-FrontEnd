'use client';
import { useState } from "react";
import KeywordSelect from "./_components/KeywordSelect";
import Loading from "./_components/Loading";

export default function page() {
    const [loading, setLoading] = useState(false)
  
    // word 나중에 빼기(store에 사용자 정보랑 함께 들어감)

    return (
        <div className="min-w-[320px] max-w-[480px] mx-auto px-4 py-16 bg-slate-50">
            {loading ? <Loading setLoading={setLoading}/> : <KeywordSelect setLoading={setLoading}/>}
        </div>
    )
}