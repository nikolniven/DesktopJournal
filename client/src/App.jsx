import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MoodProviderWrapper } from './context/mood.context';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

import EntriesPage from './pages/EntriesPage/EntriesPage';
import ReflectionPage from './pages/ReflectionPage/ReflectionPage ';

import TabsCard from './components/TabsCard/TabsCard';

function App() {
  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <MoodProviderWrapper>
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
            <Route
              path="/entries"
              element={
                <IsPrivate>
                  <EntriesPage />
                </IsPrivate>
              }
            />
            <Route
              path="/reflection"
              element={
                <IsPrivate>
                  <ReflectionPage />
                  <EntriesPage />
                </IsPrivate>
              }
            />
          </Routes>
        </MoodProviderWrapper>
      </main>
    </div>
  );
}

export default App;
