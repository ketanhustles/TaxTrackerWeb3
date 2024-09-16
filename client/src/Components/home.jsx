import React, {useEffect , useState} from "react";
//import { Link } from 'react-router-dom';
import "./home.css";


const home = () => {
  const handleButtonClick = (path) => {
    window.location.href = path;
  };


  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const text = "Track My Tax";
    let index = 0;

    const type = () => {
      if (index < text.length) {
        setTypingText((prevText) => prevText + text.charAt(index));
        index++;
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          setTypingText("");
          index = 0;
          type();
        }, 2000);
      }
    };

    type();
  }, []);


  return (
  <div>
     <div>
       
        <h1 className="homeText">Track My Tax</h1>
      </div>

   <div className="home-content">
      <div className="button-group">
        <button onClick={() => handleButtonClick('/CentralGov')}>Central Gov</button>
      </div>

      <div className="button-group">
        <button onClick={() => handleButtonClick('/StateGov')}>State Gov</button>
      </div>

      <div className="button-group">
        <button onClick={() => handleButtonClick('/DistrictGov')}>District Gov</button>
      </div>

      <div className="button-group horizontal">
        <button onClick={() => handleButtonClick('/HealthCare')}>Health Care</button>
        <button onClick={() => handleButtonClick('/MLA')}>MLA</button>
        <button onClick={() => handleButtonClick('/Roads&Transport')}>Road & Transport</button>
      </div>

      <div className="button-group horizontal">
        <button onClick={() => handleButtonClick('/Contractor')}>Contractor</button>
        <button onClick={() => handleButtonClick('/MaterialSupplier')}>Material Supplier</button>
        <button onClick={() => handleButtonClick('/LabourSupplier')}>Labour Supplier</button>
      </div>
    </div>


    </div> 
  );
};

export default home;




















// export default function home(){
//     return (
// <>
{/* <div>
            <h1>Track My Tax</h1>
            <p>In today's world, financial transparency in government remains a significant challenge. Citizens often lack access to clear and up-to-date information about how their tax money is allocated and spent. This lack of transparency can lead to skepticism, mistrust, and even potential misuse of public funds.</p>
            <p>Our project, TransparentGov, aims to address this critical issue by developing a decentralized application (DApp) that promotes financial transparency in government operations. The DApp leverages blockchain technology and smart contracts to create an immutable, tamper-resistant, and publicly accessible ledger of all government financial transactions.
</p>
            <p>Open and Accessible Data: TransparentGov will provide a user-friendly platform that grants citizens easy access to real-time financial data related to government budgeting and spending.: The DApp will foster citizen engagement by enabling public participation in the budgeting process.</p>
            <p>Decentralization and Trust: By leveraging blockchain technology, TransparentGov will decentralize data storage, ensuring that financial records are free from centralized control and manipulation</p>
        </div> */}

//         <div className="home-content">
//       <div className="home-dropdown">
//         <select onChange={(e) => window.location.href = e.target.value}>
//           <option value="">Sectors</option>
//           {/* <option value="/home">Home</option> */}
//           <option value="/CentralGov">Central Gov</option>
//           <option value="/StateGov">State Gov</option>
//           <option value="/DistrictGov">District Gov</option>
//           <option value="/HealthCare">Health Care</option>
//           <option value="/MLA">MLA</option>
//           <option value="/Contractor">Contractor</option>
//           <option value="/MaterialSupplier">Material Supplier</option>
//           <option value="/LabourSupplier">Labour Supplier</option>
//           <option value="/Roads&Transport">Road & Transport</option>
//         </select>
//       </div>
//     </div>



{/* <div className="home-content">
        <ul className="home-list">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/CentralGov">Central Gov</Link></li>
          <li><Link to="/StateGov">State Gov</Link></li>
          <li><Link to="/DistrictGov">District Gov</Link></li>
          <li><Link to="/HealthCare">Health Care</Link></li>
          <li><Link to="/MLA">MLA</Link></li>
          <li><Link to="/Roads">Road & Transport</Link></li>
          <li><Link to="/HealthCare">Health Care</Link></li>
          <li><Link to="/HealthCare">Health Care</Link></li>
          <li><Link to="/HealthCare">Health Care</Link></li>
          
        </ul>
        </div> */}
        {/* {<div className="home-dropdown">
          <select>
            <option value="">Select Sectors</option>
            <option value="./HealthCare">Health Care</option>
            <option value="/LabourSupplier">Labour Supplier</option>
            <option value="/MaterialSupplier">Material Supplier</option>
            <option value="/MLA">MLA</option>
            <option value="/Contractor">Contractor</option>
            <option value="/Roads&Transport">Roads & Transport</option>
          </select>
        </div> } */}
      

        
        
// </>
//     );
// };