import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Transaction() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ width: '100%', bgcolor: 'primary-color'}}>
      <Tabs value={value} onChange={handleChange} textColor="secondary" variant="scrollable">
        <Tab label='TODAY' />
        <Tab label='THIS WEEK' />
        <Tab label='THIS MONTH' />
        <Tab label='THIS YEAR' />
      </Tabs>
    </Box>
  );
}