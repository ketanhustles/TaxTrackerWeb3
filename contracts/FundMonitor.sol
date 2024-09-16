// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMonitor {
    // global variable & modifier
    address public owner;
    address public centralGov;
    mapping(address => uint256) public hierarchy; // Maps organization address to hierarchy level

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier onlyHigherHierarchy() {
        require(
            hierarchy[msg.sender] < hierarchy[centralGov],
            "Only higher hierarchy organizations can call this function."
        );
        _;
    }

    // Fund monitor Code
    struct Transfer {
        address fromDistrict;
        address toSector;
        uint256 amount;
    }

    mapping(address => mapping(address => uint256)) public allocatedFunds;
    mapping(address => mapping(address => uint256)) public transferredFunds;
    mapping(address => mapping(address => Transfer[])) public transferHistory;

    // mapping(address => mapping(address => bool)) public isDistrictSector; // to check if the sector belongs to that district

    event FundsAllocated(
        address indexed sender,
        address indexed district,
        address indexed sector,
        uint256 amount
    );
    event FundsTransferred(
        address indexed sender,
        address indexed fromDistrict,
        address indexed toSector,
        uint256 amount
    );

    constructor() {
        owner = msg.sender;
        centralGov = address(0); // Set the central government address initially to address(0)
        hierarchy[msg.sender] = 0; // Owner (deployer of the contract) is assigned the highest hierarchy (0)
    }


    function setHierarchy(address organization, uint256 level) external {
        require(level > hierarchy[msg.sender], "You can only set hierarchy for lower organizations.");
        hierarchy[organization] = level;
    }

    function allocateFunds(address fromAddress, address toAddress, uint256 value)
        external
    {
        // require(hierarchy[fromAddress] < hierarchy[toAddress], "You can only allocate for lower organizations.");
        allocatedFunds[fromAddress][toAddress] += value;
        emit FundsAllocated(msg.sender, fromAddress, toAddress, value);

    }

    function transferFunds(address payable toAddress, uint256 amount) 
        external
        payable 
    {
        require(amount == msg.value, "Amount parameter should be equal to amount sent");
        require(toAddress != address(0), "Invalid recipient address");
        // require(address(msg.sender).balance >= amount, "Insufficient balance");
        require(amount > 0, "Amount should be greater than zero");

        // Transfer funds from the organization's address to the specified address
        (bool sent, ) = toAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    // -------------FUND MONITOR ends.-------------
    //  CENTRAL GOVENRMENT code.
    struct Central {
        address centralAddress;
    }
    Central central;
    
    function setCentralGov(address _centralGov) external onlyOwner {
        centralGov = _centralGov;
        hierarchy[_centralGov] = 1; // Central government is assigned hierarchy 1
    }

    // ----------------CENTRAL GOVERNMENT ENDS.----------------
    //  STATE code.
    struct State {
        string nameOfState;
        address stateAddress;
    }

    State[] public states;
    mapping(address => bool) public isState;

    function addState (address _stateAddress, string memory _stateName)
        public
        onlyOwner
    {
        require(!isDistrict[_stateAddress], "State already exists.");
        District memory newDistrict = District(_stateName, _stateAddress);
        districts.push(newDistrict);
        isDistrict[_stateAddress] = true;
        this.setHierarchy(_stateAddress, 2);
    }

    function removeState(address _stateAddress) 
        public
        onlyOwner 
        
    {
        require(isDistrict[_stateAddress], "State does not exist");

        for (uint256 i = 0; i < districts.length; i++) {
            if (districts[i].districtAddress == _stateAddress) {
                delete districts[i];
                isDistrict[_stateAddress] = false;
                break;
            }
        }
    }
    // ----------------STATE ENDS.----------------
    //  DISTRICT code.
    struct District {
        string nameOfDistrict;
        address districtAddress;
    }

    District[] public districts;
    mapping(address => bool) public isDistrict;

    function addDistrict(address _districtAddress, string memory _districtName)
        public
        onlyOwner
        
    {
        require(!isDistrict[_districtAddress], "District already exists.");
        District memory newDistrict = District(_districtName, _districtAddress);
        districts.push(newDistrict);
        isDistrict[_districtAddress] = true;
        this.setHierarchy(_districtAddress, 3);
    }

    function removeDistrict(address _districtAddress)
        public
        onlyOwner
        
    {
        require(isDistrict[_districtAddress], "District does not exist");

        for (uint256 i = 0; i < districts.length; i++) {
            if (districts[i].districtAddress == _districtAddress) {
                delete districts[i];
                isDistrict[_districtAddress] = false;
                break;
            }
        }
    }
    // ----------------DISTRICT ENDS.----------------
    // code for SECTORS
    struct Sectors {
        string nameOfSectors;
        address sectorAddress;
    }

    Sectors[] public sectors;
    mapping(address => bool) public isSector;

    function addSector(address _sectorAddress, string memory _sectorName)
        public
        onlyOwner    
    {
        require(!isSector[_sectorAddress], "Sector already exists.");
        Sectors memory newSector = Sectors(_sectorName, _sectorAddress);
        sectors.push(newSector);
        isSector[_sectorAddress] = true;
        this.setHierarchy(_sectorAddress, 4);
    }

    function removeSector(address _sectorAddress) 
        public 
        onlyOwner
         
    {
        require(isSector[_sectorAddress], "Sector does not exist");

        for (uint256 i = 0; i < sectors.length; i++) {
            if (sectors[i].sectorAddress == _sectorAddress) {
                delete sectors[i];
                isSector[_sectorAddress] = false;
                break;
            }
        }
    }

    // ----------------SECTOR ENDS.----------------
    // code for CONTRACTORS
    struct Contractor {
        string nameOfContractor;
        address contractorAddress;
    }

    Contractor[] public contractors;
    mapping(address => bool) public isContractor;

    function addContractor(address _contractorAddress, string memory _contractorName)
        public 
        onlyOwner
    {
        require(!isContractor[_contractorAddress], "Contractor already exists.");
        Contractor memory newcontractor = Contractor(_contractorName, _contractorAddress);
        contractors.push(newcontractor);
        isContractor[_contractorAddress] = true;
        this.setHierarchy(_contractorAddress, 5);
    }

    function removeContractor(address _contractorAddress) 
        public 
        onlyOwner
    {
        require(isContractor[_contractorAddress], "Contractor does not exists.");

        for (uint256 i = 0; i < contractors.length; i++) {
            if (contractors[i].contractorAddress == _contractorAddress) {
                delete contractors[i];
                isContractor[_contractorAddress] = false;
                break;
            }
        }
    }
    // ----------------COTRACTOR ENDS.----------------
    // code for SUPPLIERS
    struct Supplier {
        string nameOfContractor;
        address contractorAddress;
    }

    Supplier[] public suppliers;
    mapping(address => bool) public isSupplier;

    function addSupplier(address _contractorAddress, string memory _contractorName) 
        public 
        onlyOwner
    {
        require(!isContractor[_contractorAddress], "Contractor already exists.");
        Contractor memory newcontractor = Contractor(_contractorName, _contractorAddress);
        contractors.push(newcontractor);
        isContractor[_contractorAddress] = true;
        this.setHierarchy(_contractorAddress, 6);
    }

    function removeSupplier(address _contractorAddress) 
        public 
        onlyOwner  
    {
        require(isContractor[_contractorAddress], "Contractor does not exists.");

        for (uint256 i = 0; i < contractors.length; i++) {
            if (contractors[i].contractorAddress == _contractorAddress) {
                delete contractors[i];
                isContractor[_contractorAddress] = false;
                break;
            }
        }
    }
    // ----------------SUPPLIER ENDS.----------------
}
