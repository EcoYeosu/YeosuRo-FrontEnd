'use client';

import { useEffect, useState } from "react";
import HttpClient from "@/apis/httpClient";
import { useRouter } from "next/navigation"; // Next.js 13 이상에서 App Router 사용 시

interface Journey {
    id: string;
    name: string;
}

const ReviewPage = () => {
    const [journeys, setJourneys] = useState<Journey[]>([]); // 여정 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리
    const router = useRouter(); // useRouter 훅 생성

    // HttpClient 인스턴스 생성
    const httpClient = HttpClient({
        baseURL: 'https://api.example.com', // 실제 API 엔드포인트로 변경
    });

    useEffect(() => {
        // API 요청
        const fetchJourneys = async () => {
            try {
                const data = await httpClient.get<Journey[]>("/journeys"); // 여정 데이터 요청
                setJourneys(data); // 요청 성공 시 여정 데이터를 상태에 저장
            } catch (err) {
                setError("여정을 불러오는데 실패했습니다."); // 에러 발생 시 에러 메시지 설정
                console.error(err);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchJourneys();
    }, []);

    // 버튼 클릭 시 호출될 함수
    const handleButtonClick = (journeyId: string) => {
        router.push(`/review/${journeyId}`); // 동적으로 페이지 이동 (해당하는 여정 후기 페이지로 이동)
    };

    return (
        <div className="w-360 mx-auto border border-1 border-black">
            <div className="relative flex justify-start items-center h-11">
                <div className="absolute left-2">X</div>
                <div className="mx-auto">여정 후기 작성 페이지</div>
            </div>
            <section>
                <div>
                    {loading ? (
                        <div>로딩 중...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : journeys.length > 0 ? (
                        journeys.map((journey) => (
                            <button
                                key={journey.id}
                                onClick={() => handleButtonClick(journey.id)}
                                className="my-2 border border-gray-300 p-2 w-full text-left"
                            >
                                {journey.name}
                            </button>
                        ))
                    ) : (
                        <div>여정이 없습니다.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ReviewPage;