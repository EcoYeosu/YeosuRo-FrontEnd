import BackIcon from '@/components/plan/images/BackIcon.svg'
import CancelIcon from '@/components/plan/images/CancelIcon.svg'
import { useRouter } from "next/navigation";

const ListHeader = () => {
    const router = useRouter()
    return (
        <div className='mb-6' style={{ width: '100%', display:'flex', margin:'12px 0 24px 0'}}>
            <BackIcon style={{marginLeft:'20px'}} onClick={() => router.back()}/>
            <p style={{color:'#1f1f1f',margin:'0 auto',fontWeight:'600', fontSize:'16px'}}>내 여정</p>
            <CancelIcon style={{marginRight:'20px'}}/>
        </div>
    )
};

export default ListHeader