import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';

const ConfigForm = () => {
  const [year, setYear] = React.useState('19');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={6}>
        <TextField
          color="info"
          label="Dato felt navn"
          variant="filled"
          sx={{ color: 'success.main', minWidth: '100%' }}
        />
      </Grid> */}
      <Grid item xs={12}>
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel>Standard Årstall</InputLabel>
          <Select
            value={year}
            variant="filled"
            color="primary"
            label="Standard Årstall"
            onChange={handleChange}
          >
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ConfigForm;
