import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';

const SharedLayout: React.FC = () => {
  return (
    <div
      className="mainContainer"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Container style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px' }}>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SharedLayout;
