// Import the required contract artifacts and web3 libraries
const FundMonitor = artifacts.require("FundMonitor");

// Define the test suite
contract("FundMonitor", (accounts) => {
  // Define accounts
  const owner = accounts[0];
  const centralGov = accounts[1];
  const state1 = accounts[2];
  const district1 = accounts[3];
  const sector1 = accounts[4];
  const contractor1 = accounts[5];
  const supplier1 = accounts[6];

  // Define the hierarchy levels
  // const HIERARCHY_CENTRAL = 1;
  const HIERARCHY_STATE = 2;
  const HIERARCHY_DISTRICT = 3;
  const HIERARCHY_SECTOR = 4;
  const HIERARCHY_CONTRACTOR = 5;
  const HIERARCHY_SUPPLIER = 6;

  // Declare the contract instance
  let fundMonitor;

  // Deploy the contract before each test
  beforeEach(async () => {
    fundMonitor = await FundMonitor.new({ from: owner });
  });

  // Test the setCentralGov function
  it("should set the central government address", async () => {
    await fundMonitor.setCentralGov(centralGov, { from: owner });
    const actualCentralGov = await fundMonitor.centralGov();
    assert.strictEqual(actualCentralGov, centralGov, "Central government address not set correctly");
  });

  // Test the setHierarchy function
  it("should set the hierarchy level for organizations", async () => {
    await fundMonitor.setCentralGov(centralGov, { from: owner });
    await fundMonitor.setHierarchy(state1, HIERARCHY_STATE, { from: centralGov });
    await fundMonitor.setHierarchy(district1, HIERARCHY_DISTRICT, { from: state1 });
    await fundMonitor.setHierarchy(sector1, HIERARCHY_SECTOR, { from: district1 });
    await fundMonitor.setHierarchy(contractor1, HIERARCHY_CONTRACTOR, { from: sector1 });
    await fundMonitor.setHierarchy(supplier1, HIERARCHY_SUPPLIER, { from: contractor1 });
    
    const hierarchyState = await fundMonitor.hierarchy(state1);
    const hierarchyDistrict = await fundMonitor.hierarchy(district1);
    const hierarchySector = await fundMonitor.hierarchy(sector1);
    const hierarchyContractor = await fundMonitor.hierarchy(contractor1);
    const hierarchySupplier = await fundMonitor.hierarchy(supplier1);
    
    assert.strictEqual(hierarchyState.toNumber(), HIERARCHY_STATE, "Incorrect hierarchy level for state");
    assert.strictEqual(hierarchyDistrict.toNumber(), HIERARCHY_DISTRICT, "Incorrect hierarchy level for district");
    assert.strictEqual(hierarchySector.toNumber(), HIERARCHY_SECTOR, "Incorrect hierarchy level for sector");
    assert.strictEqual(hierarchyContractor.toNumber(), HIERARCHY_CONTRACTOR, "Incorrect hierarchy level for contractor");
    assert.strictEqual(hierarchySupplier.toNumber(), HIERARCHY_SUPPLIER, "Incorrect hierarchy level for supplier");
  });
  
  // Test the allocateFunds function
  it('should allocate funds from one address to another with higher hierarchy', async () => {
    await fundMonitor.setCentralGov(centralGov, { from: owner });
    await fundMonitor.setHierarchy(state1, HIERARCHY_STATE, { from: centralGov });
    
    const fromAddress = centralGov; // Replace with the address of an organization with higher hierarchy
    // Fetch the hierarchy value for fromAddress

    const toAddress = state1; // Replace with the address of an organization with lower hierarchy
    // Fetch the hierarchy value for toAddress

    const value = web3.utils.toWei('1', 'ether'); // Replace '1' with the amount of funds to allocate
    // Call the allocateFunds function
    await fundMonitor.allocateFunds(fromAddress, toAddress, value);

    // Get the allocated funds for the specific fromAddress and toAddress
    const allocatedFunds = await fundMonitor.allocatedFunds(fromAddress, toAddress);

    // Convert back the allocated funds value to ether
    const allocatedFundsInEther = web3.utils.fromWei(allocatedFunds, 'ether');

    // Assert that the allocated funds value is equal to the value passed to the function
    assert.equal(allocatedFundsInEther, '1', 'Incorrect allocated funds value');
  });

  // it('should revert if an organization with lower hierarchy tries to allocate funds', async () => {
  //   const fromAddress = accounts[2]; // Replace with the address of an organization with lower hierarchy
  //   const toAddress = accounts[1]; // Replace with the address of an organization with higher hierarchy
  //   const value = web3.utils.toWei('1', 'ether'); // Replace '1' with the amount of funds to allocate

  //   // Attempt to call the allocateFunds function from an organization with lower hierarchy
  //   try {
  //     await fundMonitor.allocateFunds(fromAddress, toAddress, value);
  //     assert.fail('Expected revert not received');
  //   } catch (error) {
  //     const expectedError = 'You can only set hierarchy for lower organizations.';
  //     assert(error.message.includes(expectedError), `Expected error: "${expectedError}"`);
  //   }
  // });


  // Test the transferFunds function
  // it("should transfer funds correctly and emit FundsTransferred event", async () => {
  //   const amount = web3.utils.toWei("0.1", "ether"); // Amount to transfer
  //   const toAddress = accounts[2]; // Replace with the address of the recipient
  
  //   // Get the recipient's initial balance
  //   const recipientInitialBalance = await web3.eth.getBalance(toAddress);
  
  //   // Call the transferFunds function
  //   const result = await fundMonitor.transferFunds(toAddress, amount, { from: centralGov, value: amount});
  
  //   // Get the recipient's updated balance
  //   const recipientFinalBalance = await (web3.eth.getBalance(toAddress));
  //   const recipientFinalBalanceBN = web3.utils.toBN(recipientFinalBalance);
  
  //   // Calculate the expected final balance for the recipient
  //   const expectedFinalBalance = await web3.utils.toBN(recipientInitialBalance).add(web3.utils.toBN(amount));
  
  //   // Check if the recipient's balance has increased by the transferred amount
  //   console.log("final bal - ",recipientFinalBalanceBN);
  //   console.log("expected bal - ",expectedFinalBalance);
  //   assert.ok(
  //     recipientFinalBalanceBN.eq(expectedFinalBalance),
  //     "Funds were not transferred correctly"
  //   );
  
  //   // Check if the FundsTransferred event was emitted with the correct parameters
  //   assert.strictEqual(result.logs.length, 1, "FundsTransferred event not emitted");
  //   assert.strictEqual(result.logs[0].event, "FundsTransferred", "Incorrect event emitted");
  //   assert.strictEqual(result.logs[0].args.sender, owner, "Incorrect sender address");
  //   assert.strictEqual(result.logs[0].args.fromDistrict, owner, "Incorrect fromDistrict address");
  //   assert.strictEqual(result.logs[0].args.toSector, toAddress, "Incorrect toSector address");
  //   assert.strictEqual(result.logs[0].args.amount.toString(), amount, "Incorrect transferred amount");
  // });
  
  it("should revert when transferring to the zero address", async () => {
    const amount = web3.utils.toWei("1", "ether"); // Amount to transfer
  
    // Attempt to transfer funds to the zero address
    try {
      await fundMonitor.transferFunds("0x0000000000000000000000000000000000000000", amount, { from: centralGov, value:amount });
      assert.fail("Transaction should have reverted");
    } catch (error) {
      assert(error.message.includes("Invalid recipient address"), "Unexpected error message");
    }
  });
  
  it("should revert when transferring zero amount", async () => {
    // Attempt to transfer zero amount
    try {
      await fundMonitor.transferFunds(accounts[1], 0, { from: owner, value: 0 });
      assert.fail("Transaction should have reverted");
    } catch (error) {
      assert(error.message.includes("Amount should be greater than zero"), "Unexpected error message");
    }
  });
  
  it("should revert when the organization's balance is insufficient", async () => {
    const amount = web3.utils.toWei("100000", "ether"); // Amount to transfer (larger than owner's balance)
  
    try {
      // Try to transfer funds larger than the owner's balance
      await fundMonitor.transferFunds(accounts[1], amount, { from: owner, value:amount });
      assert.fail("Transaction should have reverted");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert");
    }
  });
  

  // it("should revert if the organization's balance is insufficient", async () => {
  //   const transferAmount = web3.utils.toBN(web3.utils.toWei("1", "ether")); // Transfer amount

  //   try {
  //     // Try to transfer funds from an organization with zero balance
  //     await fundMonitor.transferFunds(accounts[1], transferAmount, {
  //       from: accounts[0],
  //     });
  //     assert.fail("Transaction should have reverted");
  //   } catch (error) {
  //     assert(error.message.includes("revert"), "Expected revert");
  //   }
  // });

  // Add more tests for the other functions of the FundMonitor contract as needed
});
