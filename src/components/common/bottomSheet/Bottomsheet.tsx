'use client'

import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useState } from 'react';
import PlaceCard from './components/placeCard';
import Search from '@/components/plan/images/Search.svg';
import Button from "@/components/common/buttons/Button";
import { useGetPlaceList } from '@/hooks/plan';

const BottomSheet = () => {
    const [open, setOpen] = useState(false);

    //to do 장소 리스트를 받아오고 선택된 장소 id를 select에 저장 후 Place카드에 props 주기
    const [select, setSelect] = useState('');
    const [keyword, setKeyword] = useState('');
    const [{ y }, api] = useSpring(() => ({ y: 400 }));

    const openSheet = () => {
        setOpen(true);
        api.start({ y: 0 });
    };

    const closeSheet = () => {
        setOpen(false);
        api.start({ y: 400 });
    };

    const bind = useDrag(
        ({ movement: [, my], last, cancel }) => {
            if (my < -100) cancel();
            if (last) {
                if (my > 200) {
                    api.start({ y: 400 });
                } else {
                    api.start({ y: 0 });
                    setSelect('')
                }
            } else {
                api.start({ y: my });
                setSelect('')
            }
        }

    );

    const { data, isLoading, error, refetch } = useGetPlaceList(keyword, false);


    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        if (keyword) {
            refetch();
        }
    };


    return (
        <>
            <Button value={'일정 추가하기'} className={'w-full mb-3'} onClick={openSheet}/>
            <animated.div
                style={{
                    transform: y.to(y => `translateY(${y}px) translateX(-50%)`),
                    left: '50%',
                    position: 'fixed',
                    bottom: 0,
                    height: '400px',
                    background: '#fff',
                    borderRadius: '20px 20px 0 0',
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                    width:'360px',
                    overflowY: 'auto'
                }}
            >
                <div>
                    <div {...bind()} style={{height:'23px',paddingTop:'9px',marginBottom:'20px'}}>
                        <div style={{width:'50px',height:'3px',background:'#DFDFDF',margin:'0 auto'}}/>
                    </div>
                    <div style={{width:'320px',margin:'0 auto', position:'relative'}}>
                        <input 
                            placeholder='예) 여수 낭만포차44번'
                            style={{ width:'320px',padding:'11px 12px',background:'#EFEFEF', display:'block', borderRadius:'4px'}}
                            onChange={handleKeywordChange}
                            />
                        <div style={{position:'absolute', width:'20px',height:'20px', right:'12px', top:'12px'}} onClick={handleSearch}>
                            <Search />
                        </div>
                    </div>
                    <p style={{color:'#0D77E0', fontSize:'12px', margin:'12px 20px 12px 260px',}}>직접 추가하기</p>
                    <p style={{fontSize:'12px',lineHeight:'1.4',letterSpacing: '-0.15px',color:'#0D77E0',margin:'0 0 8px 20px',}}>🔥 70만 유튜버가 다녀간 유명 맛집PICK</p>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error occurred while fetching data</div>}
                    <div>
                        {data&&data.response.body.items&&data.response.body.items.item.map((place: any,index:number) => (
                            <div style={{ marginBottom: '12px' }} key={index}>
                                <PlaceCard place={place} setSelect={setSelect} select={select}/>
                            </div>
                        ))}
                    </div>
                </div>
            </animated.div>
            {select !== '' &&
                    <button
                      style={{
                        width: '320px',
                        lineHeight: '44px',
                        color: 'white',
                        background: '#0D77E0',
                        borderRadius:'4px',
                        position: 'absolute',  // fixed로 수정하여 버튼을 고정
                        left: '50%',
                        bottom:'20px',        // 중앙 정렬
                        transform: 'translateX(-50%)',  // 수평 중앙 정렬 보정
                        overflow: 'auto'
                      }}
                    >
                        장소 추가하기
                    </button>
                }
        </>
    );
};

export default BottomSheet;
