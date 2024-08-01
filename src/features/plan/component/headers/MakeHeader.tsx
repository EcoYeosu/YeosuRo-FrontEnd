import CancelIcon from '@/features/plan/images/CancelIcon.svg'

type ListHeaderProps = {
    title:string;
}

const MakeHeader: React.FC<ListHeaderProps> = ({title}) => {
    return (
        <div style={{ width: '100%', position:'relative', marginBottom:'24px', textAlign:'center' }}>
            <CancelIcon style={{marginLeft:'20px', position:'absolute'}}/>
            <p style={{color:'#1f1f1f',fontWeight:'600', fontSize:'16px'}}>{title}</p>
        </div>
    )
};

export default MakeHeader;