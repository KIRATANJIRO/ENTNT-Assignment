import React from 'react';
import { BarChart3, Bell, User } from 'lucide-react';

const buttonStyle = {
  width: '100%',
  padding: '20px',  // Increased padding
  marginBottom: '40px', // Significantly increased margin between buttons
  display: 'flex',
  alignItems: 'center',
  border: '2px solid #2563eb',
  borderRadius: '8px',
  color: '#2563eb',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontSize: '17px',  // Slightly larger font for buttons
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#1d4ed8',
  color: 'white',
  borderColor: '#1d4ed8',
};

const iconStyle = {
  marginRight: '16px',
  width: '24px',
  height: '24px',
};

const Sidebar = () => {
  const currentPath = window.location.pathname;

  return (
    <div style={{ 
      height: '100vh', // Full viewport height
      backgroundColor: 'white', 
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h1 style={{ 
        fontSize: '32px',
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: '60px', // Increased margin
        color: '#2563eb',
        fontFamily: "'Orbitron', sans-serif", // Modern, tech-style font
        letterSpacing: '2px', // Adds spacing between letters
        textShadow: '2px 2px 4px rgba(37, 99, 235, 0.1)', // Subtle shadow effect
        borderBottom: '3px solid #2563eb',
        paddingBottom: '15px',
      }}>
        ENTNT
      </h1>

      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around', // Evenly distributes buttons
        flexGrow: 1, // Takes up remaining space
        marginTop: '40px',
      }}>
        <button 
          onClick={() => window.location.pathname = '/admin'}
          style={currentPath === '/admin' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== '/admin') {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== '/admin') {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#2563eb';
            }
          }}
        >
          <BarChart3 style={iconStyle} />
          <span style={{ fontWeight: '500' }}>Admin</span>
        </button>

        <button 
          onClick={() => window.location.pathname = '/user'}
          style={currentPath === '/user' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== '/user') {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== '/user') {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#2563eb';
            }
          }}
        >
          <User style={iconStyle} />
          <span style={{ fontWeight: '500' }}>User</span>
        </button>

        <button 
          onClick={() => window.location.pathname = '/reports'}
          style={currentPath === '/reports' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== '/reports') {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== '/reports') {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#2563eb';
            }
          }}
        >
          <Bell style={iconStyle} />
          <span style={{ fontWeight: '500' }}>Reports</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;