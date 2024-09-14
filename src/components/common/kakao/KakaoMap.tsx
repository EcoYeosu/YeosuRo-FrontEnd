import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = () => {

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Map
        center={{ lat: 34.7603, lng: 127.6622 }}
        style={{ width: '100%', height: '100%' }}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
      </Map>
    </div>
  );
};

export default KakaoMap;

