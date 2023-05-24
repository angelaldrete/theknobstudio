import '@styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './AppRoutes';
import Navbar from '@components/Navbar';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <div className="app__content">
          <Routes />
        </div>
      </Router>
    </div>
  )
}

export default App
