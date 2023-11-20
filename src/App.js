import React,{useState} from 'react';
import './App.css';
import MyRightCalendar from './components/Calendar';
import LeftSection from './components/LeftSection';
function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleLeftDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <div className="left-section">
        <LeftSection selectedDate={selectedDate} onDateChange={handleLeftDateChange} />
      </div>
      <div className="right-section">
        <MyRightCalendar onDateChange={handleDateChange}/>
      </div>
    </div>
  );
}

export default App;
