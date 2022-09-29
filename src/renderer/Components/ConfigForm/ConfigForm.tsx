import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
        <FormControl sx={{ minWidth: '20%' }}>
          <InputLabel>Årstall</InputLabel>
          <Select
            value={year}
            variant="outlined"
            sx={{ borderColor: '#000000' }}
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
