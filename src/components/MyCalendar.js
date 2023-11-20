import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ storedEvents, onDateChange }) => {
  const [events, setEvents] = useState([]);
  console.log("check ici",storedEvents)
  useEffect(() => {
    const formattedEvents = [];

    storedEvents.forEach((event) => {
      const startDate = moment(event.startDate);
      const endDate = moment(event.endDate);
      const startTime = moment(event.startTime, 'HH:mm');
      const endTime = moment(event.endTime, 'HH:mm');

      while (startDate.isSameOrBefore(endDate, 'day')) {
        const startDateTime = startDate.clone().set({
          hour: startTime.hours(),
          minute: startTime.minutes(),
        });

        const endDateTime = startDate.clone().set({
          hour: endTime.hours(),
          minute: endTime.minutes(),
        });

        formattedEvents.push({
          ...event,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
          color: event.color,
          comment: event.comment,
        });

        startDate.add(1, 'day');
      }
    });

    setEvents(formattedEvents);
  }, [storedEvents]);

  const handleDateSelect = (date) => {
    onDateChange(date);
  };
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black',
      border:'none',
    };
    console.log("check event",event)
    return {
      style: style,
    };
  };
  const handleNavigate = (newDate, view, action) => {
    onDateChange(newDate);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', width: '95%' }}
        onSelectEvent={handleDateSelect}
        eventPropGetter={eventStyleGetter}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default MyCalendar;
