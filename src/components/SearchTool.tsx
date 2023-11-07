import { Toolbar } from '@mui/material';
import AddFab from './AddFab';
import FilterIcon from './FilterIcon';

export default function SearchTool() {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'end',
        gap: 4,
      }}
    >
      <FilterIcon />
      <AddFab />
    </Toolbar>
  );
}
