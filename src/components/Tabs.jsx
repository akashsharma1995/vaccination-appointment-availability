import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DataGrid from "./dataGrid";
import Box from '@mui/material/Box';
import SearchForm from "./SearchForm";
import CentersContext from "../store/centers-context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const ctx = useContext(CentersContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const removeDataFromGrid = () => {
    ctx.setVaccinationCenters([]);
    ctx.setSearched(false);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} style={{fontFamily: "inherit"}}>
          <Tab label={<b>By District</b>} {...a11yProps(0)} onClick={() => removeDataFromGrid()}/>
          <Tab label={<b>By PIN Code</b>} {...a11yProps(1)} onClick={() => removeDataFromGrid()}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchForm byDistrict/>
        <DataGrid/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchForm byPin/>
        <DataGrid/>
      </TabPanel>
    </Box>
  );
}