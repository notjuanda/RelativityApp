import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-[1216px] mx-auto px-4 py-6">
        <Outlet /> {/* Aquí se renderizan las rutas */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
