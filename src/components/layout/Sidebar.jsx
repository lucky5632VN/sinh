import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Library, BookOpen, Microscope } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel-heavy">
      <div className="sidebar-brand">
        <div className="brand-icon" style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}>
          <Microscope size={24} color="var(--accent-cyan)" />
        </div>
        <h1 className="brand-title text-glow">BioSTEM <span className="text-gradient">LAB</span></h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home size={20} />
          <span>Trang Chủ</span>
        </NavLink>
        <NavLink to="/virtual-lab" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Library size={20} />
          <span>Thư viện Thí nghiệm</span>
        </NavLink>
        <NavLink to="/theory" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <BookOpen size={20} />
          <span>Cơ sở lý thuyết</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
