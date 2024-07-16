import KakaoMap from "@/components/kakaomap/KakaoMap";
import SearchInput from "@/components/kakaomap/SearchInput";
import * as React from "react";


export default async function Map() {

    return (
        <div className="min-w-[320px] max-w-[480px] mx-auto">
            <div className="w-full h-full relative flex flex-col items-center justify-start overflow-hidden">
                <h1>
                    나의 여정과<br/>
                    가장 가까운<br/>
                    키워드를 골라볼까요?
                </h1>
                <div className="w-full mt-10">
                    <KakaoMap/>        
                </div>
            </div>
        </div>
        
    )
}
