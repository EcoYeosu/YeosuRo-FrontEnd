'use client'

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '@/styles/calendar.css';
import BackArrow from '../../images/CalendarArrow1.svg'
import NextArrow from '../../images/CalendarArrow2.svg'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {

    const [value, onChange] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false)

    const currentMonth = (value as Date).toLocaleString('en', { month: 'short' });
    const currentYear = (value as Date).getFullYear();

    const handlePrevMonth = () => {
        const newDate = new Date(value as Date);
        newDate.setMonth(newDate.getMonth() - 1);
        onChange(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(value as Date);
        newDate.setMonth(newDate.getMonth() + 1);
        onChange(newDate);
    };

    const handlePrevYear = () => {
        const newDate = new Date(value as Date);
        newDate.setFullYear(newDate.getFullYear() - 1);
        onChange(newDate);
    };

    const handleNextYear = () => {
        const newDate = new Date(value as Date);
        newDate.setFullYear(newDate.getFullYear() + 1);
        onChange(newDate);
    };

    useEffect(() => {
        setIsClient(true)
      }, [])
    
    return (
        <div style={{ width: '320px', margin:'0 auto'}}>
            <div className='w-full flex' style={{ justifyContent:'space-between' }}>
                <div className='flex justify-between items-center'>
                    <div>
                        <BackArrow onClick={handlePrevMonth} />
                    </div>
                    <p style={{color:'#949494'}}>{currentMonth}</p>
                    <div>
                        <NextArrow onClick={handleNextMonth} />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <BackArrow onClick={handlePrevYear} />
                    </div>
                    <p style={{color:'#949494'}}>{currentYear}</p>
                    <div>
                        <NextArrow onClick={handleNextYear} />
                    </div>
                </div>
            </div>
            <div style={{marginBottom:'24px'}}>
                {isClient &&
                    <Calendar
                        onChange={onChange}
                        value={value}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        showNavigation={false}
                    />
                }
            </div>
        </div>
    )
}; 

export default CustomCalendar;