import classes from "./AvailableSlots.module.css";

const AvailableSlots = ({ dataObj }) => {
  if(!dataObj) return "N/A";
  const detailsAvailable = (
    <div>
      {dataObj.available_capacity_dose1 ? (
        <p>
          <span className={dataObj.vaccine === "COVAXIN" ? `${classes.dose} ${classes.covaxin}` : classes.dose}>{dataObj.vaccine} (Dose 1)</span> :{" "}
          <span className={classes["slot-text"]}>{dataObj.available_capacity_dose1} Slots
          </span>
        </p>
      ) : null}

      {dataObj.available_capacity_dose2 ? (
        <p>
          <span className={dataObj.vaccine === "COVAXIN" ? `${classes.dose} ${classes.covaxin}` : classes.dose}>{dataObj.vaccine} Dose 2</span> :{" "}
          <span className={classes["slot-text"]}>{dataObj.available_capacity_dose2} Slots</span>
        </p>
      ) : null}

      {dataObj.precaution_online_dose_one_available ? (
        <p>
          <span className={`${classes.dose} ${classes.precaution}`}>Precaution Dose</span> :{" "}
          <span className={classes["slot-text"]}>{dataObj.precaution_online_dose_one_available} Slots</span>
        </p>
      ) : null}
    </div>
  );
  return detailsAvailable;
};

export default AvailableSlots;