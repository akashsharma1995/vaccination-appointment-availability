import classes from "./BodyRow.module.css";
import CenterDetails from "./CenterDetails";
import AvailableSlots from "./AvailableSlots";
import { getStructuredData } from "./helpers";

const BodyRow = ({ center, dates }) => {
  const dataObj = getStructuredData(center);
  let itemsToReturn = [];

  for (const key in dataObj) {
    itemsToReturn.push(
      <div className={classes.row} key={Math.random()}>
        <CenterDetails center={center} age={key} />
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[0].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[1].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[2].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[3].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[4].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[5].dateFormat_2]} />
        </div>
        <div className={classes["data-cell"]}>
          <AvailableSlots dataObj={dataObj[key][dates[6].dateFormat_2]} />
        </div>
      </div>
    );
  }

  return itemsToReturn;
};

export default BodyRow;
