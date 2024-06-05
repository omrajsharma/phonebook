import { TextField, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter } from '../../redux/filter/filterSlice';
import { selectFilter } from '../../redux/filter/filterSelectors';

const Filter: React.FC = () => {
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '20px',
        mb: '20px',
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="Find contacts by name"
        value={filter}
        variant="outlined"
        size="medium"
        sx={{ maxWidth: '700px' }}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </Container>
  );
};

export default Filter;
