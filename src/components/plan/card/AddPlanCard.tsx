import AddIcon from '@/components/plan/images/AddIcon.svg'

type NextPage = {
    onClick?: () => void;
  };

const AddPlanCard = ({ onClick }: NextPage) => {

    return (
        <div style={{ width: '320px', height:'100px', background:'#d9d9d9', borderRadius:'8px', display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center',gap:'4px'}}
            onClick={onClick}>
            <AddIcon />
            <p style={{ color:'#777777' }}>새로운 일정을 추가해보세요</p>
        </div>
    )
};

export default AddPlanCard;