import { useAuth } from '@/hooks/api';
import Authpopup from '@/components/shared/Authpopup';
import Layout from '@/components/layout/Layout';

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      {!isAuthenticated && <Authpopup />}
      <Layout />
    </>
  );
};

export default App;