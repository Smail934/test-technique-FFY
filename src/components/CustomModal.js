import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import { CiCalendar, CiTimer } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment'; 
const CustomModal = ({ isOpen, closeModal }) => {
  
  const [title, setTitle] = useState('Add Title');
  const [color, setColor] = useState('#AC7BF3');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [comment, setComment] = useState('');


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleAddClick = () => {
    const newEvents = {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      color,
      comment,
    };
    // Récupérer les événements existants du localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    // Ajouter le nouvel événement à la liste existante
    const updatedEvents = [...existingEvents, newEvents];

    // Sauvegarder la liste mise à jour dans le localStorage
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  useEffect(() => {
  // Charger les événements depuis le localStorage
  const storedEvents = JSON.parse(localStorage.getItem('events'));

  // Vérifier si des événements sont présents dans le localStorage
  if (storedEvents && storedEvents.length > 0) {
    // Sélectionner le dernier événement ajouté (vous pouvez adapter cette logique en fonction de vos besoins)
    const latestEvent = storedEvents[storedEvents.length - 1];

    // Vérifier chaque valeur avant de les définir
    if (latestEvent.title) setTitle(latestEvent.title);
    if (latestEvent.startDate) setStartDate(new Date(latestEvent.startDate));
    if (latestEvent.endDate) setEndDate(new Date(latestEvent.endDate));
    if (latestEvent.startTime) setStartTime(latestEvent.startTime);
    if (latestEvent.endTime) setEndTime(latestEvent.endTime);
    if (latestEvent.color) setColor(latestEvent.color);
    if (latestEvent.comment) setComment(latestEvent.comment);
  }
}, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Event Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '40%',
          height: '40%',
          margin: 'auto',
        },
      }}
    >
     <style>
        {`
          .rc-time-picker-input,
          .react-datepicker-wrapper input {
            border: none;
            border-radius: 5%;
            padding: 5px;
            margin-right:10px;
          }

          .rc-time-picker-input {
            color: black !important;
            background-color: ${color} !important;
          }
        `}
      </style>

      <h1>
        <input
          style={{border:'none',
          fontfamily: 'Montserrat',
          fontSize: '48px',
          fontweight: '500',
          lineheight: '59px',
          letterspacing: '0px',
          textalign: 'left',
          color:'#5C5F6C'
          }}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Add Title"
        />
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <div
          style={{
            width: '80%',
            height: '2px',
            backgroundColor: color,
            marginBottom: '10px',
            flexGrow: 1,
          }}
        />
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            cursor: 'pointer',
            marginRight: '20px',
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        ></div>
      </div>

      {showColorPicker && (
        <SketchPicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '34px' }}>
        <CiCalendar style={{ marginRight: '10px' }} />
        <div >
          <DatePicker 
            style={{ background: color }} 
            dateFormat="MMMM d, yyyy" 
            selected={startDate} 
            onChange={date => setStartDate(date)} 
            customInput={<input style={{ background: color }} />} 
            inputReadOnlyStyle={{ background: color }}/>
          <DatePicker 
            style={{ background: color }} 
            dateFormat="MMMM d, yyyy" 
            selected={endDate} 
            onChange={date => setEndDate(date)} 
            customInput={<input style={{ background: color }} />} 
            inputReadOnlyStyle={{ background: color }}/>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '34px' }}>
        <CiTimer style={{ marginRight: '10px' }} />
        <div  >
          <TimePicker
            onChange={newTime => setStartTime(moment(newTime).format('HH:mm'))}
            defaultValue={moment(startTime, 'HH:mm')}
            showSecond={false}
            inputReadOnly
            className="timepicker-class"
            popupStyle={{ background: color }}
          />
          <TimePicker
            onChange={newTime => setEndTime(moment(newTime).format('HH:mm'))}
            defaultValue={moment(endTime, 'HH:mm')}
            showSecond={false}
            inputReadOnly
            className="timepicker-class"
          />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="comment"
          style={{ width: '80%',  padding: '10px',  border:'none', resize:'none' }}
        />
      </div>
      <div
          style={{
            width: '95%',
            height: '2px',
            backgroundColor: color,
            marginBottom: '10px',
            flexGrow: 1,
          }}
        />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button onClick={handleAddClick}>Add</button>

      </div>
      
    </Modal>
  );
};

export default CustomModal;
