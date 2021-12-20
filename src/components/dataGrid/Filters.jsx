import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import classes from "./Filters.module.css";

const Filters = ({ centers, setCenters }) => {

  const [ageFilter, setAgeFilter] = useState({
    fifteen: false,
    eighteen: false,
  });

  const handleAgeFilter = (name) => {
    setAgeFilter({ ...ageFilter, [name]: !ageFilter[name] });
  };

  useEffect(() => {
    applyAgeFilters(centers);
  }, [ageFilter.fifteen, ageFilter.eighteen]);

  const applyAgeFilters = (centers) => {
    let filteredResults = [];
    // Applying age filters
    centers.forEach((center) => {
      const { fifteen, eighteen } = ageFilter;

      if ((fifteen && eighteen) || (!fifteen && !eighteen)) {
        filteredResults = [...centers];
        return;
      } else {
        const ageFilterApplied = fifteen ? "15" : "18";
        const filteredSessions = [];
        center.sessions.forEach((session) => {
          if (session.min_age_limit.toString() === ageFilterApplied)
            filteredSessions.push(session);
        });
        filteredResults.push({ ...center, sessions: filteredSessions });
      }
    });
    setCenters(filteredResults);
  };

  return (
    <div className={classes["filters-cont"]}>
      <Chip
        label={`Age 15 & above`}
        size="small"
        color="primary"
        variant={ageFilter.fifteen ? "filled" : "outlined"}
        onClick={() => handleAgeFilter("fifteen")}
      />
      <Chip
        label={`Age 18 & above`}
        size="small"
        color="primary"
        variant={ageFilter.eighteen ? "filled" : "outlined"}
        onClick={() => handleAgeFilter("eighteen")}
      />
    </div>
  );
};

export default Filters;
