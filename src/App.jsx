import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {}
      </main>
    </div>
  );
};

export default App;
