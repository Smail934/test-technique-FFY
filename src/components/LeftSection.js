import React, { useState } from 'react';
import './LeftSection.css';
import formatDate from './dateFormatter';
import CustomModal from './CustomModal';
import MyCalendar from './MyCalendar';

const LeftSection = ({ selectedDate, onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
  let formattedDate = '';
  if (selectedDate instanceof Date) {
    formattedDate = formatDate(selectedDate);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("check ici pour test",storedEvents)
 
  const handleLeftDateChange = (date) => {
    console.log('Selected date in LeftSection:', date);
    onDateChange(date);
  };
  return (
    <div className="left-section">
      <div className="title-and-button">
        <h1>{formattedDate}</h1>
        <button className="add-button" onClick={openModal}>+</button>
      </div>
      <CustomModal isOpen={isModalOpen} closeModal={closeModal} selectedDate={selectedDate} />
      <MyCalendar storedEvents={storedEvents} onDateChange={handleLeftDateChange} />
    </div>
  );
};

export default LeftSection;
