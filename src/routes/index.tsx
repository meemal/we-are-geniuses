import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DirectoryPage } from '../pages/DirectoryPage';
import { ProfilePage } from '../pages/ProfilePage';
import { MyProfilePage } from '../pages/MyProfilePage';
import { CreateProfilePage } from '../pages/CreateProfilePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { ToolsPage } from '../pages/ToolsPage';
import { AboutPage } from '../pages/AboutPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};