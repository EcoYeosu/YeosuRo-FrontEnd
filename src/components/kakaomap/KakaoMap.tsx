'use client';

import { useEffect, useRef, useState } from 'react';

const KakaoMap: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        const initializeMap = () => {
            const { kakao } = window as any;
            if (!kakao) return;

            kakao.maps.load(() => {
                if (mapContainerRef.current) {
                    const options = {
                        center: new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
                        level: 3,
                    };

                    const map = new kakao.maps.Map(mapContainerRef.current, options);
                    // 주소-좌표 변환 객체를 생성합니다
                    const geocoder = new kakao.maps.services.Geocoder();
                    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                    var linePath = [
                        new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
                        new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
                        new kakao.maps.LatLng(33.45178067090639, 126.5726886938753)
                    ];

                    // 선을 표시할 마커 배열
                    const markers: any[] = [];

                    // linePath를 반복하면서 각 좌표에 마커를 생성하고 지도에 표시
                    linePath.forEach((coord: any) => {
                        const marker = new kakao.maps.Marker({
                            position: coord,
                            map: map
                        });
                        markers.push(marker);
                    });
                    // 지도에 표시할 선을 생성합니다
                    var polyline = new kakao.maps.Polyline({
                        path: linePath, // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 3, // 선의 두께 입니다
                        strokeColor: '#000000', // 선의 색깔입니다
                        strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'dot' // 선의 스타일입니다
                    });

                    // 지도에 선을 표시합니다 
                    polyline.setMap(map);

                    // 주소로 좌표를 검색합니다
                    geocoder.addressSearch(searchVal, function (result, status) {

                        // 정상적으로 검색이 완료됐으면 
                        if (status === kakao.maps.services.Status.OK) {

                            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            const marker = new kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            const infowindow = new kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">검색한 장소</div>'
                            });
                            infowindow.open(map, marker);

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            map.setCenter(coords);
                        }
                    });
                }
            });
        };

        if (!(window as any).kakao) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
            script.onload = initializeMap;
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        } else {
            initializeMap();
        }
    }, [searchVal]);

    return (
        <>
            <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder='장소를 검색하세요.'
                className='rounded-full w-full py-4 px-8 mb-6 text-xl'
            />
            <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
        </>
    )
};

export default KakaoMap;