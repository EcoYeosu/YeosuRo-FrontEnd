import { useEffect, useState } from 'react'
import { Site } from '@/type/plan'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { allPlanData, planData, siteData } from '@/recoil/atoms';
import MemoIcon from '../images/MemoIcon.svg'
import ClockIcon from '../images/ClockIcon.svg'

interface PlaceCardProps {
    color?: string;
    site: Site;
    selectCardId: number;
    index: number;
}

  const PlaceCard = ({ color, site, selectCardId, index  }: PlaceCardProps) => {

    // const [select,isSelect] = useState(false)
    const [edit,isEdit] = useState(false)
    const [memo,setMemo] = useState(site.memo ? site.memo : '')
    const [price,setPrice] = useState('')

    const planDataState = useRecoilValue(planData);
    const siteDataState = useRecoilValue(siteData);

    const setAllPlanData = useSetRecoilState(allPlanData)
    const setPlanData = useSetRecoilState(planData)
    const setSiteData = useSetRecoilState(siteData)

    const CardHandle = () =>{
        isEdit(false);
        setSiteData(site)
    }

    // 수정 버튼
    const editButtonHandle = () => {
            isEdit(true)
    }

    // 완료 버튼
    const editText = (memo:string,price?:string) => {
        //price API 추가되면 주석 해제
        setSiteData((prevSiteData) => ({
            ...prevSiteData,
            memo: memo,
            // price: price,
        }));
        isEdit(false)
    }
    useEffect(() => {
        const updatedPlanData = {
          ...planDataState,
          siteList: planDataState.siteList.map((site) =>
            site.id === siteDataState.id ? siteDataState : site
          ),
        };
      
        setPlanData(updatedPlanData);
      
        setAllPlanData((prevAllPlanData) =>
          prevAllPlanData.map((plan) =>
            plan.planId === updatedPlanData.planId ? updatedPlanData : plan
          )
        );
    }, [siteDataState]);
      
    return (
        <>
            {edit && selectCardId === site.id ?
                <div style={{ width: `${selectCardId === site.id ? '340px' : '320px' }`,
                height:'230px',
                position:'relative',
                borderRadius:'8px',
                display:'flex', 
                flexDirection:'column',
                justifyContent:'space-between', 
                alignItems:'center',
                padding:`${selectCardId === site.id ? '20px 10px 16px 10px' : '0' }`, 
                background:'#FAFAFA',
                marginBottom:'20px',
                transition: 'all 0.3s ease',
                }}
                >
                    <div style={{ width:'282px', display:'flex',justifyContent:'space-between' }}>
                        <p style={{ fontSize:'16px', fontWeight:'600' }}>{site.category}</p>
                        <div>
                            <button style={{fontSize:'14px', color:'#0D77E0'}} onClick={()=>editText(memo)}>완료</button>
                            <button style={{fontSize:'14px', color:'#0D77E0',  marginLeft:'15px'}} onClick={()=>isEdit(false)}>취소</button>
                        </div>
                    </div>
                    <div onClick={(e) => {e.stopPropagation();}}>
                        <p style={{ fontSize:'14px', marginBottom:'8px' }}>메모</p>
                        <input 
                            style={{width:'282px', height:'44px', background:'#EFEFEF', padding:'0 12px'}}
                            placeholder={site.memo ? site.memo : '예) 편의점 들렀다 가기'}
                            onChange={(e) => setMemo(e.target.value)}
                            value={memo}
                        />
                    </div>
                    <div>
                        <p style={{ fontSize:'14px', marginBottom:'8px' }}>경비</p>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <input 
                                style={{width:'260px', height:'44px', background:'#EFEFEF', padding:'0 12px'}}
                                placeholder='예) 30000'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                            <p>원</p>
                        </div>
                    </div>
                </div>
            :
                <div style={{ width: `${selectCardId === site.id ? '340px' : '320px' }`,
                    height:`${selectCardId === site.id ? '151px' : '63px' }`,
                    position:'relative',
                    borderRadius:'8px',
                    display:'flex', 
                    flexDirection:'row',
                    justifyContent:'space-between', 
                    alignItems:' flex-start',
                    padding:`${selectCardId === site.id ? '20px 10px 16px 10px' : '0' }`, 
                    background:`${selectCardId === site.id ? '#F2F2F2' : 'none' }`,
                    marginBottom:'20px',
                    transition: 'all 0.3s ease',
                    }}
                    onClick={()=>CardHandle()}
                >
                    <div style={{width:'26px',display:'flex', flexDirection:'column',alignItems:'center'}}>
                        <div style={{width:'100%', lineHeight:'26px', background:`${color}`, borderRadius:'50%', color:'white',textAlign:'center'}}>{index}</div>
                        <div style={{width:'1px', height:'30px', border:`1px dashed ${color}`}} />
                    </div>
                    <div style={{ width:'282px' }}>
                        <div>
                            <div style={{ display:'flex', justifyContent:'space-between',alignItems:'flex-start'}}>
                                <p style={{ fontSize:'16px', fontWeight:'600' }}>{site.category}</p>
                                <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                                    <ClockIcon  />
                                    <p style={{ lineHeight:'17px',fontSize:'12px', color:'#949494'}}>
                                        {
                                            site.startTime === null && site.endTime === null ?
                                            '지정된 시간이 없습니다.' : 
                                            `${site.startTime} ~ ${site.endTime}`
                                        }
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize:'14px', color:'#777777' }}>{site.address}</p>
                            <div style={{lineHeight:'17px', fontSize:'12px', color:'#949494',display:'flex', gap:'4px', alignItems:'center'}}><MemoIcon />{site.memo}</div>
                        </div>
                        <div style={{display: selectCardId === site.id ? 'block' : 'none', transition: 'all 0.1s ease',}}>
                            <div style={{position:'absolute',left:'41px', bottom:'16px',display:'flex',gap:'10px',}} onClick={(e) => {e.stopPropagation();}}>
                                <button style={{width:'126px', height:'32px', background:'#0D77E0',borderRadius:'4px' , color:'white', fontSize:'14px' }} onClick={editButtonHandle}>
                                    수정
                                </button>
                                <button style={{width:'126px', height:'32px', color:'#777777', fontSize:'14px', background:'#ffffff', border:'1px solid #C8C8C8', borderRadius:'4px'}}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default PlaceCard;