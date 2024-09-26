import { Link, NavLink } from "react-router-dom";
import clasess from './MainNavigation.module.css'

export default function MainNavigation() {
  return (
    <header className={clasess.header}>
      <nav>
        <ul className={clasess.list}>
          <li>
            <NavLink to="/" className={({ isActive })=> isActive ? clasess.active : null } end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive })=> isActive ? clasess.active : null }>Products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
