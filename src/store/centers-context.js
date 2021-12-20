import React, { useState } from "react";

const CentersContext = React.createContext({
  vaccinationCenters: [],
  searched: false
});

export const CentersContextProvider = (props) => {
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [searched, setSearched] = useState(false);
  return (
    <CentersContext.Provider
      value={{
        vaccinationCenters: vaccinationCenters,
        setVaccinationCenters: setVaccinationCenters,
        searched: searched,
        setSearched: setSearched
      }}
    >
      {props.children}
    </CentersContext.Provider>
  );
};
export default CentersContext;
