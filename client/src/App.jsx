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
import UserPage from './pages/UserPage/UserPage';

import TabsCard from './components/TabsCard/TabsCard';
import EntriesDetailPage from './pages/EntriesDetailPage/EntriesDetailPage';
import EntryEditPage from './pages/EntryEditPage';
import DreamPage from './pages/DreamPage/DreamPage';
import DreamsEntriesPage from './pages/DreamsEntriesPage/DreamsEntriesPage';
import DreamEntryDetailsPage from './pages/DreamEntryDetailsPage';

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
                  <UserPage />
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
                </IsPrivate>
              }
            />
            <Route
              path="/entries/:entryId"
              element={
                <IsPrivate>
                  <EntriesDetailPage />
                </IsPrivate>
              }
            />
            <Route
              path="/entries/:entryId/edit"
              element={
                <IsPrivate>
                  <EntryEditPage />
                </IsPrivate>
              }
            />
            <Route
              path="/dream-page"
              element={
                <IsPrivate>
                  <DreamPage />
                </IsPrivate>
              }
            />
            <Route
              path="/dreams-entries"
              element={
                <IsPrivate>
                  <DreamsEntriesPage />
                </IsPrivate>
              }
            />
            <Route
              path="/dreams-entries/:dreamId"
              element={
                <IsPrivate>
                  <DreamEntryDetailsPage />
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
