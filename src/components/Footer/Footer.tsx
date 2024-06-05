import { Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px 0',
        marginTop: 'auto',
      }}
    >
      <Container style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px' }}>
      </Container>
    </footer>
  );
};

export default Footer;
