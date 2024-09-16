import React, { useState } from 'react';
import CentralGov from './Components/CentralGov';
import StateGov from './Components/StateGov';
import DistrictGovernmentPage from './Components/DistrictGov';
import home from './Components/home';
import Navbar from './Components/Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import HealthCareSectorPage from './Components/HealthCare';
import MLAPage from './Components/MLA';
import RoadTransportSectorPage from './Components/Roads&Transport';
import ContractorPage from './Components/Contractor';
import MaterialSupplierPage from './Components/MaterialSupplier';
import LabourSupplierPage from './Components/LabourSupplier';
import Footer from "./Components/Footer";
import About from './Components/About';



const App = () => {
  // const [transferredAmount, setTransferredAmount] = useState(0);

  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/home" component={home} />
            <Route path="/CentralGov" component={CentralGov} />
            <Route path="/StateGov" component={StateGov} />
            <Route path="/DistrictGov" component={DistrictGovernmentPage} />
            <Route path="/HealthCare" component={HealthCareSectorPage} />
            <Route path="/LabourSupplier" component={LabourSupplierPage} />
            <Route path="/MaterialSupplier" component={MaterialSupplierPage} />
            <Route path="/MLA" component={MLAPage} />
            <Route path="/Contractor" component={ContractorPage} />
            
            <Route path="/Roads&Transport" component={RoadTransportSectorPage} />
            <Route path="/About" component={About} />
            
          </Switch>
        </div>
        <Footer />
      </>
    </Router>
  );
};

export default App;