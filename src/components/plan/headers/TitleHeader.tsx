import BackIcon from '@/components/plan/images/BackIcon.svg'
import { useRouter } from "next/navigation";

type TitleHeaderProps = {
    title:string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({title}) => {
    const router = useRouter()
    return (
        <div style={{ width: '100%', margin:'12px 0 24px 0', textAlign:'center', display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex'}}>
                <BackIcon style={{margin:'0 8px 0 20px'}} onClick={() => router.back()}/>
                <p style={{color:'#1f1f1f',fontWeight:'600', fontSize:'16px'}}>{title}</p>
            </div>
            <button style={{marginRight:'20px',color:'#0D74DB',fontWeight:'600', fontSize:'16px'}}>완료</button>
        </div>
    )
};

export default TitleHeader;