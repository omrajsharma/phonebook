import { FadeLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <FadeLoader
      color="#1976d2"
      cssOverride={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
};

export default Loader;
