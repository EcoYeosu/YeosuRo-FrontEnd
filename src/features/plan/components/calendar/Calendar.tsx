'use client'

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '@/styles/calendar.css';
import BackArrow from '../../images/CalendarArrow1.svg'
import NextArrow from '../../images/CalendarArrow2.svg'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {

    const [value, setValue] = useState<Value>(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [isClient, setIsClient] = useState(false)

    const currentMonth = (value as Date).toLocaleString('en', { month: 'short' });
    const currentYear = (value as Date).getFullYear();

    const handlePrevMonth = () => {
        const newDate = new Date(value as Date);
        newDate.setMonth(newDate.getMonth() - 1);
        setValue(newDate);
        setActiveStartDate(newDate)
    };

    const handleNextMonth = () => {
        const newDate = new Date(value as Date);
        newDate.setMonth(newDate.getMonth() + 1);
        setValue(newDate);
        setActiveStartDate(newDate)
    };

    const handlePrevYear = () => {
        const newDate = new Date(value as Date);
        newDate.setFullYear(newDate.getFullYear() - 1);
        setValue(newDate);
        setActiveStartDate(newDate)
    };

    const handleNextYear = () => {
        const newDate = new Date(value as Date);
        newDate.setFullYear(newDate.getFullYear() + 1);
        setValue(newDate);
        setActiveStartDate(newDate)
    };

    useEffect(() => {
        setIsClient(true)
        console.log(value)
      }, [value])
    
    return (
        <div style={{ width: '320px', margin:'0 auto'}}>
                <div className={`font-regular`} style={{ width: '100%',lineHeight:'44px', margin:'24px 0 12px 0', background:'#F6F6F6' }}>
                    <p style={{ padding: '0 16px' }}>
                        {value instanceof Date ? `${value.getFullYear()}. ${String(value.getMonth() + 1).padStart(2, '0')}. ${String(value.getDate()).padStart(2, '0')}` : ''}
                    </p>
                </div>
            <div className='w-full flex' style={{ justifyContent:'space-between' }}>
                <div className='flex justify-between items-center'>
                    <div onClick={handlePrevMonth}>
                        <BackArrow />
                    </div>
                    <p style={{color:'#949494'}}>{currentMonth}</p>
                    <div  onClick={handleNextMonth}>
                        <NextArrow />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div  onClick={handlePrevYear}>
                        <BackArrow />
                    </div>
                    <p style={{color:'#949494'}}>{currentYear}</p>
                    <div  onClick={handleNextYear}>
                        <NextArrow />
                    </div>
                </div>
            </div>
            <div style={{marginBottom:'24px'}}>
                {isClient &&
                    <Calendar
                        onChange={setValue}
                        value={value}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        showNavigation={false}  
                        activeStartDate={activeStartDate}         
                     />
                }
            </div>
        </div>
    )
}; 

export default CustomCalendar;