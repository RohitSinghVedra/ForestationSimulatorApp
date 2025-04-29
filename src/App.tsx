import React from 'react';
import Layout from './components/Layout';
import MapView from './views/MapView';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout>
        <MapView />
      </Layout>
    </AppProvider>
  );
}

export default App;