const formatDate = (date) => {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[monthIndex];
  
    return `${day} ${month}`;
  };
  
  export default formatDate;
  