import classes from "./CenterDetails.module.css";

const CenterDetails = ({ center, age }) => {
  return (
    <div className={classes["center-cont"]}>
      <p className={classes["center-name"]}>{center.name}</p>
      <p className={classes["center-address"]}>
        {center.address}, {center.district_name}, {center.pincode}{" "}
      </p>
      <p className={classes["age-allowed"]}>
        Age {age} and above{" "}
        <span
          className={
            center.fee_type === "Free"
              ? classes["fee-type-free"]
              : classes["fee-type-paid"]
          }
        >
          {center.fee_type}
        </span>
      </p>
    </div>
  );
};

export default CenterDetails;