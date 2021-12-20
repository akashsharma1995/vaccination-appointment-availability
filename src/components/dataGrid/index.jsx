import React, { useContext, useEffect, useState } from "react";
import BodyRow from "./BodyRow";
import Filters from "./Filters";
import { datesForSevenDays } from "./helpers";
import CentersContext from "../../store/centers-context";
import classes from "./DataGrid.module.css";

const DataGrid = () => {
  const { vaccinationCenters, searched } = useContext(CentersContext);
  const [centers, setCenters] = useState([]);
  const [ dates ] = useState(datesForSevenDays());

  useEffect(() => {
    if (vaccinationCenters.length > 0) setCenters(vaccinationCenters);
  }, [vaccinationCenters]);

  return (
    searched ? (
      vaccinationCenters.length > 0 ? 
    
    <>
    <Filters centers={vaccinationCenters} setCenters={setCenters}/>
    <div className={classes.container}>
      {/* Heading */}
      <div className={classes.row}>
        <div className={`${classes["center-name"]} ${classes["date-head"]}`}><b>Vaccination Center</b></div>
        {dates.map((item, i) => {
          return (
            <div className={classes["date-head"]} key={"date" + i}>
              <b>{item.dateFormat_1}</b>
            </div>
          );
        })}
      </div>
      {/* Body */}
      {centers.map((center, i) => {
        return <BodyRow key={center.center_id} center={center} dates={dates} />;
      })}
    </div>
    </>: <h3 className={classes["no-items"]}>No Items Found</h3>) : null
  );
};

export default DataGrid;
