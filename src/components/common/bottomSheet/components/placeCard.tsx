import Image from 'next/image';

interface PlaceCardProps {
  place: any;
  select:string
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, setSelect, select }) => {

  const selectId = select === place.contentid

  const againClick = (select:string) => {
    if(select === place.contentid){
      setSelect('')
    }else{
      setSelect(place.contentid)
    }
  }

  return (
    <div 
      style={{ width: `${selectId ? '340px' : '320px'}`, height: '90px', padding:'10px',background:`${selectId ? '#EFEFEF' : 'none'}`,margin:'0 auto', borderRadius:'8px',display:'flex',gap:'12px',alignItems:'center'}}
      onClick={()=>againClick(select)}
    >
        <div style={{ width: '66px', height: '66px', position: 'relative', overflow: 'hidden', borderRadius: '4px', textAlign:'center'}}>
          {place.firstimage === '' ? 'No Image' :
          <Image
          src={place.firstimage}
          alt={place.title}
          layout="fill"
          objectFit="cover"  
          />
        }
        </div>
        <div style={{}}>
          <p style={{ fontSize:'16px', fontWeight:'600' }}>{place.title}</p>
          <p style={{ fontSize:'14px'}}>{place.addr1}</p>
        </div>
    </div>
  );
};

export default PlaceCard;

