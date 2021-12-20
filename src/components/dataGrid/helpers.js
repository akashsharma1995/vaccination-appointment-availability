export const datesForSevenDays = () => {
  const currentDate = new Date();
  const datesToShow = [];

  for (let i = 0; i <= 6; i++) {
    let dateToShow = new Date();
    dateToShow.setDate(currentDate.getDate() + i);
    // Converting date single to double digit ex: 1 to 01
    let day = dateToShow.getDate();
    day = day.toString().length === 1 ? `0${day}` : day;

    // Converting month single to double digit ex: 1 to 01
    let month = dateToShow.getMonth() + 1;
    month = month.toString().length === 1 ? `0${month}` : month;
    // console.log(month)

    let dateFormat_1 = `${day}/${month}/${dateToShow.getFullYear()}`; //This date is down to the user
    let dateFormat_2 = `${day}-${month}-${dateToShow.getFullYear()}`; //Date in this format comes from API we'll use this later to map dates for slots
    datesToShow.push({
      dateFormat_1,
      dateFormat_2,
    });
  }
  return datesToShow;
};

export const getStructuredData = (center) => {
  // expects center data and returns data in structured form
  const dataObj = {};
  center.sessions.forEach((session) => {
    dataObj[session.min_age_limit] = dataObj[session.min_age_limit]
      ? { ...dataObj[session.min_age_limit] }
      : {};
    const objToAdd = {
      [session.date]: {
        available_capacity_dose1: session.available_capacity_dose1,
        available_capacity_dose2: session.available_capacity_dose2,
        precaution_online_dose_one_available:
          session.precaution_online_dose_one_available,
        vaccine: session.vaccine,
      },
    };
    dataObj[session.min_age_limit] = {
      ...dataObj[session.min_age_limit],
      ...objToAdd,
    };
  });

  return dataObj;
};
