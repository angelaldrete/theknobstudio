import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import '../../styles/logo.css';
import '../../styles/navbar.css';
import logo from '../../assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);
  const navigate = useNavigate();
  
  const links = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ]
  
  return (
    <>
      <nav
        className="navbar"
      >
        <img 
          src={logo} 
          alt="Logo image displaying The Knob Studio company" 
          className="logo" 
          onClick={() => navigate('/')}  
        />
        <button
          className="menu-button"
          onClick={() => setIsEnabled(!isEnabled)}
        >
          <FontAwesomeIcon icon={faBars} color='#fff' />
        </button>
        <ul className={
          `menu ${isEnabled ? 'active' : ''}`
        }>
          <li>
            <button
              className="close-button"
              onClick={() => setIsEnabled(!isEnabled)}
            >
              <FontAwesomeIcon icon={faClose} color='#fff' />
            </button>
          </li>
          {links.map((link, index) => (
            <li key={`${index}-link`}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
