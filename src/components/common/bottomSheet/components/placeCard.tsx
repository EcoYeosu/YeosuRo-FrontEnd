
// to do selectId 를 받아와서 해당 id와 장소의 id가 맞으면 배경색 지정 useState 필요
const PlaceCard = () => {

  return (
    <div style={{ width: '340px', height: '90px', padding:'10px',background:'#EFEFEF',margin:'0 auto', borderRadius:'8px',display:'flex',gap:'12px',alignItems:'center'}}>
        <div style={{ width: '66px', height: '66px'}}>img</div>
        <div style={{}}>
          <p style={{ fontSize:'16px'}}>장소명 입력</p>
          <p style={{ fontSize:'14px'}}>장소 주소 입력</p>
        </div>
    </div>
  );
};

export default PlaceCard;

