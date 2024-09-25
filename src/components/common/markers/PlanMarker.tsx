
interface PlanMarkerProps {
    index: number;
    color: string;
}

const PlanMarker = ({ index, color } :PlanMarkerProps) => {
    return (
        <div
            style={{
                width: '34px',
                lineHeight: '34px',
                borderRadius: '50%',
                background: color,
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 드롭 섀도우 적용
            }}
        >
            <p style={{color:'white'}}>{index}</p>
        </div>
    )
};

export default PlanMarker