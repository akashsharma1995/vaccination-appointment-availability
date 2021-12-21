import React, { useState, useEffect, useContext, Fragment } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MaterialSelect from "./MaterialSelect";
import LinearProgress from '@mui/material/LinearProgress';
import TextField from "@mui/material/TextField";
import CentersContext from "../store/centers-context";
import classes from "./SearchForm.module.css";
import useHttp from "../customHooks/useHttp";

const initialState = {
  state: {
    state_name: "",
    state_id: "",
  },
  district: {
    district_name: "",
    district_id: "",
  },
  pin: "",
};

const getCurrentDateString = () => {
  const dateToday = new Date();
  // Getting date string
  let day = dateToday.getDate();
  day = day.toString().length === 1 ? `0${day}` : day;
  let month = dateToday.getMonth() + 1;
  month = month.toString().length === 1 ? `0${month}` : month;
  return `${day}-${month}-${dateToday.getFullYear()}`;
}

const SearchForm = ({ byDistrict, byPin }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filters, setFilters] = useState(initialState);
  const ctx = useContext(CentersContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { loading, error, sendRequest } = useHttp();

  const handleCentersData = (data) => {
    const sortedData = data.centers.sort(function (a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    ctx.setVaccinationCenters(sortedData);
    ctx.setSearched(true);
  };
  
  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  useEffect(() => {
    // Fetches states everytime the component mounts
    const handleFetchedStates = (data) => {
      setStates(data.states);
    };

    sendRequest(
      {
        url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
      },
      handleFetchedStates
    );
  }, []);

  useEffect(() => {
    // Fetches states everytime the new state is selected by user
    if (byDistrict && filters.state.state_id) {
      const handleFetchedDistricts = (data) => {
        setDistricts(data.districts);
      };
      sendRequest(
        {
          url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${filters.state.state_id}`,
        },
        handleFetchedDistricts
      );
    }
  }, [filters.state]);

  const handleChange = (e) => {
    if (e.target.name === "state" || e.target.name === "district") {
      // Doing it because an object containing id and name is associated with "state" and "district" keys
      const targetName = e.target.name;
      const targetValue = e.target.value;
      const arrayToSearchFrom = targetName === "state" ? states : districts;

      const index = arrayToSearchFrom.findIndex(
        (item) => item[`${targetName}_name`] === targetValue
      );

      setFilters({ ...filters, [targetName]: arrayToSearchFrom[index] });
      return;
    }

    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchSlots = () => {
    const dateToday = getCurrentDateString();
    // Generating query
    const searchByDistrict = byDistrict;
    const query = searchByDistrict
      ? generateQuery(
          "calendarByDistrict",
          "district_id",
          filters.district.district_id,
          dateToday
        )
      : generateQuery("calendarByPin", "pincode", filters.pin, dateToday);

    if (searchByDistrict ? filters.district.district_id : filters.pin) {
      // Sending Request to fetch centers
      sendRequest(
        {
          url: query,
          headers: { "Content-type": "application/json" },
        },
        handleCentersData
      );
    }
  };

  const generateQuery = (path, searchBy, searchByValue, dateToday) => {
    return `https://cdn-api.co-vin.in/api/v4/appointment/sessions/public/${path}?${searchBy}=${searchByValue}&date=${dateToday}`;
  };

  return (
    <Fragment>
      {loading && <div className={classes.loading}><LinearProgress/></div>}
      <form className={classes.form}>
        {byDistrict ? (
          <>
            <MaterialSelect
              name="state"
              label="State"
              value={filters.state.state_name}
              handleChange={handleChange}
              options={states}
            />
            <MaterialSelect
              name="district"
              label="District"
              value={filters.district.district_name}
              handleChange={handleChange}
              options={districts}
              disabled={filters.state.state_name ? false : true}
            />
            <Button
              variant="contained"
              onClick={searchSlots}
              disabled={
                filters.state.state_name && filters.district.district_name
                  ? false
                  : true
              }
            >
              Search
            </Button>
          </>
        ) : (
          <>
            <TextField
              id="pin-code"
              label="PIN Code"
              variant="outlined"
              size="small"
              value={filters.pin}
              minLength={5}
              name="pin"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              disabled={filters.pin && filters.pin.length === 6 ? false : true}
              onClick={searchSlots}
              loading={loading}
            >
              Search
            </Button>
          </>
        )}
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} message={error} />
    </Fragment>
  );
};

export default SearchForm;
