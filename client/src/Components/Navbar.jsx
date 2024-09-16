// import React from 'react';
// import './Navbar.css';

// const Banner = () => {
//   return (
//     <div className="banner">
//       <h1>TrackMyTaxMoney</h1>
//       <nav>
//         <ul>
//           <li><a href="#">Home</a></li>
//           <li><a href="#">About</a></li>
//           <li><a href="#">Services</a></li>
//           <li><a href="#">Contact</a></li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Banner;
import React from 'react';
import { Link } from 'react-router-dom';
import  "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
    <h1 className="company-name">Track My Tax</h1>
      <div className="nav-content">
        <ul className="nav-list">
          <li><Link to="/home">Home</Link></li>
          {/*<li><Link to="/CentralGov">Central Gov</Link></li>*/}
          <li><Link to="/About">About</Link></li>
          {/* <li><Link to="/Contact>">Contact</Link></li> */}
        </ul>
        {/* {<div className="nav-dropdown">
          <select>
            <option value="">Select Sectors</option>
            <option value="/HealthCare">Health Care</option>
            <option value="/LabourSupplier">Labour SUpplier</option>
            <option value="/MaterialSupplier">Material Supplier</option>
            <option value="/MLA">MLA</option>
            <option value="/Roads&Transport">Roads & Transport</option>
          </select>
        </div> } */}
      </div>
    </nav>
  );
};

export default Navbar;
