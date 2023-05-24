import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Contact from '@pages/Contact';
import NotFound from '@pages/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes;
