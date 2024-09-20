import { useState, useRef, useEffect } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import PlanMarker from '../markers/PlanMarker';
import { useRecoilValue } from 'recoil';
import { siteData, planData } from '@/recoil/atoms';

const KakaoMapWithCondition = () => {
  const [allMapView, setAllMapView] = useState(false);
  const [selectPosition, setSelectPosition] = useState([0,0]);
  const mapRef = useRef<kakao.maps.Map | null>(null); // kakao.maps.Map 타입으로 ref 설정
  const siteDataState = useRecoilValue(siteData);
  const planDataState = useRecoilValue(planData);

  const markerColor = [
    '#0D77E0', '#37E00D', '#E0920D', '#E00DB3', '#572AAE',
    '#1FD8D8', '#D95050', '#3F4CC5', '#2F9E86', '#B22EE0'
  ];

  //테스트 좌표값 recoil에서(atom siteData) 받아오는걸로 추후 API수정되면 바꿀예정
  const positions = [
    { lat: 34.7577, lng: 127.7350 },
    { lat: 34.7476, lng: 127.7601 },
    { lat: 34.7315, lng: 127.6620 },
  ];

  useEffect(() => {
    //맵 전체
    if (allMapView && mapRef.current) {
      const map = mapRef.current;
      const bounds = new window.kakao.maps.LatLngBounds();
      positions.forEach((position) => {
        bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
      })
      map.setBounds(bounds, 20);
    //선택된 장소의 맵
    }else if (!allMapView && mapRef.current) {
      const map = mapRef.current;
      map.setCenter(new window.kakao.maps.LatLng(selectPosition[0], selectPosition[1]));
      map.setLevel(5);
    }
  }, [allMapView,planDataState]);

  //선택된 장소의 데이터의 좌표값을 selectPosition 에 배열로 저장
  useEffect(() => {
    // API 수정되면 주석 풀고 수정해서 활성화 해야됨
    // const latitudeNumber = Number(siteDataState.latitude);
    // const longitudeNumber = Number(siteDataState.longitude);
    // setSelectPosition([latitudeNumber,longitudeNumber])
    if(siteDataState.id){
      setSelectPosition([positions[siteDataState.id-1].lat,positions[siteDataState.id-1].lng])
    }
    setAllMapView(false)
  }, [siteDataState]);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <button onClick={()=>setAllMapView(!allMapView)}>11</button>
      <Map
        // center의 값도 positions값에 대입해줘야함
        center={siteDataState ? { lat: positions[0].lat, lng: positions[0].lng } : { lat: 34.760499, lng: 127.667744 }}
        style={{ width: '100%', height: '100%' }}
        onCreate={(map) => {
          mapRef.current = map;
        }}
        level={5}
      >
        {positions.map((position, index) => (
          <CustomOverlayMap key={index} position={position}>
            <PlanMarker color={markerColor[index]} index={index + 1} />
          </CustomOverlayMap>
        ))}
      </Map>
    </div>
  );
};

export default KakaoMapWithCondition;
