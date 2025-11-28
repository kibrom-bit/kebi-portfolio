import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { CustomCursor } from './components/ui/AdvancedComponents';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
        <CustomCursor />
        <Header />
        <Home />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;