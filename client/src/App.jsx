import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

import EntriesPage from './pages/EntriesPage/EntriesPage';

function App() {
  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />

          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route path="/entries" element={<EntriesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
