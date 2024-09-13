import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useState } from 'react';
import PlaceCard from './components/placeCard'
import Button from "@/components/common/buttons/Button";

const BottomSheet = () => {
    const [open, setOpen] = useState(false);
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
                }
            } else {
                api.start({ y: my });
            }
        }
    );

    return (
        <>
            <Button value={'다음날 추가하기'} color={'0D74DB'} className={'w-full bg-white border border-[#C8C8C8] border-[1px]' } onClick={openSheet}/>
            <animated.div
                style={{
                    transform: y.to(y => `translateY(${y}px)`),
                    position: 'fixed',
                    bottom: 0,
                    height: '400px',
                    background: '#fff',
                    borderRadius: '20px 20px 0 0',
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                    width:'360px',
                }}
            >
                <div>
                    <div {...bind()} style={{height:'23px',paddingTop:'9px',marginBottom:'20px'}}>
                        <div style={{width:'50px',height:'3px',background:'#DFDFDF',margin:'0 auto'}}/>
                    </div>
                    <input 
                        placeholder='예) 여수 낭만포차44번'
                        style={{width:'320px',padding:'11px 12px',background:'#EFEFEF',margin:'0 auto', display:'block', borderRadius:'4px'}}
                    />
                    <p style={{color:'#0D77E0', fontSize:'12px', margin:'12px 20px 12px 260px',}}>직접 추가하기</p>
                    <PlaceCard />
                </div>
            </animated.div>
        </>
    );
};

export default BottomSheet;
