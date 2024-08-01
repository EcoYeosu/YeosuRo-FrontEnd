import BackIcon from '@/features/plan/images/BackIcon.svg'
import CancelIcon from '@/features/plan/images/CancelIcon.svg'

const ListHeader = () => {
    return (
        <div className='mb-6' style={{ width: '100%', display:'flex'}}>
            <BackIcon style={{marginLeft:'20px'}}/>
            <p style={{color:'#1f1f1f',margin:'0 auto',fontWeight:'600', fontSize:'16px'}}>내 여정</p>
            <CancelIcon style={{marginRight:'20px'}}/>
        </div>
    )
};

export default ListHeader