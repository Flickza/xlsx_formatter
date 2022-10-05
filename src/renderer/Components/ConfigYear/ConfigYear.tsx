import {
  FormControl,
  FormLabel,
  MenuItem,
  MenuProps,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import selectStyles from './selectStyles';

const ConfigYear = ({
  changeYear,
  selectedYear,
}: {
  changeYear: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    changeYear(event.target.value as string);
  };

  const minimalSelectClasses = selectStyles();

  // moves the menu below the select input
  const menuProps: Partial<MenuProps> = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
  };
  const instructions = `Velg ett standard årstall, dette vil brukes om person nummer ikke er utfyllt.`;
  return (
    <FormControl>
      <Tooltip title={instructions} placement="top" arrow>
        <FormLabel sx={{ color: 'white' }}>Standard Årstall - ?</FormLabel>
      </Tooltip>
      <Select
        disableUnderline
        className={minimalSelectClasses.select}
        MenuProps={menuProps}
        IconComponent={ExpandMoreIcon}
        value={selectedYear}
        onChange={handleChange}
      >
        <MenuItem value="18">18</MenuItem>
        <MenuItem value="19">19</MenuItem>
        <MenuItem value="20">20</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ConfigYear;
