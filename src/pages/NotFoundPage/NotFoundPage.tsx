import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';
import notFoundImg from '../../images/not-found.png';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: '20px',
        }}
      >
        Oops... Sorry, no such page...
      </Typography>
      <img
        src={notFoundImg}
        alt="Not Found"
        width={300}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default NotFoundPage;
