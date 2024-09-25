import CancelIcon from '@/components/plan/images/CancelIcon.svg'
import { useRouter } from "next/navigation";

type ListHeaderProps = {
    title:string;
}

const MakeHeader: React.FC<ListHeaderProps> = ({title}) => {
    const router = useRouter()
    return (
        <div style={{ width: '100%', position:'relative', margin:'12px 0 24px 0', textAlign:'center' }}>
            <CancelIcon style={{marginLeft:'20px', position:'absolute'}} onClick={() => router.back()}/>
            <p style={{color:'#1f1f1f',fontWeight:'600', fontSize:'16px'}}>{title}</p>
        </div>
    )
};

export default MakeHeader;