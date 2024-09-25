import { CardProps } from '@/type/plan'

const MyPlanCard: React.FunctionComponent<CardProps> = ({title,startDate,endDate,editPage}) => {
    return (
        <div style={{ width: '320px', height:'100px', display:'flex',alignItems:'center'}} onClick={editPage}>
            <div style={{width:'243px',height:'100%',display:'flex', flexDirection:'column', justifyContent:'center',paddingLeft:'20px',background:'#d9d9d9',borderRadius:'8px'}}>
                <p style={{ fontWeight:'600', fontSize:'20px'}}>{title ? title : '혜지랑 1박2일'}</p>
                <p style={{ color:'#777777',fontWeight:'400', fontSize:'16px' }}>{startDate ? startDate : `2024. 05. 04`} ~ {endDate ? endDate : `2024. 05. 06`}</p>
            </div>
            <div style={{height:'83px',border:'1px dashed black'}}/>
            <button style={{
                 color:'#0D77E0',
                 fontWeight:'400',
                 fontSize:'14px',
                 width:'77px',
                 height:'100px',
                 borderRadius:'8px',
                 background:'#d9d9d9',
                }}>
                편집
            </button>
        </div>
    )
};

export default MyPlanCard;