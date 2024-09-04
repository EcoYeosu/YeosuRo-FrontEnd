type CardProps = {
    title? : string,
    startDate? : string,
    finishDate? : string,
}

const MyPlanCard: React.FunctionComponent<CardProps> = ({title,startDate,finishDate}) => {
    return (
        <div style={{ width: '320px', height:'100px', background:'#d9d9d9', borderRadius:'8px', position:'relative',padding:'20px'}}>
            <div style={{height:'100%',display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <p style={{ fontWeight:'600', fontSize:'20px'}}>{title ? title : '혜지랑 1박2일'}</p>
                <p style={{ color:'#777777',fontWeight:'400', fontSize:'16px' }}>{startDate ? startDate : `2024. 05. 04`} ~ {finishDate ? finishDate : `2024. 05. 06`}</p>
            </div>
                <button style={{ color:'#0D77E0',position:'absolute',right:'14px',bottom:'14px', fontWeight:'400', fontSize:'14px' }}>편집</button>
        </div>
    )
};

export default MyPlanCard;