import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const MyRightCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date()); 
  const [selectedMonth, setSelectedMonth] = useState(null);

  const onChange = (newDate) => {
    setDate(newDate); 
    setSelectedMonth(newDate.getMonth());
    onDateChange(newDate);
    console.log("Selected date in MyRightCalendar:", newDate);
  };

  const tileClassName = ({ date }) => {
    if (date.getMonth() === selectedMonth) {
      return 'selected-month-day';
    }
    return 'not-selected-month-day';
  };
  
  return (
    <div className="my-calendar">
      <Calendar 
       
        value={date} 
        onChange={onChange}
        formatShortWeekday={(locale, date) => {
          const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Indiquez vos abréviations des jours ici
          return weekdaysShort[date.getDay()];
        }}
        tileClassName={tileClassName}
         />
    </div>
  );
};

export default MyRightCalendar;
