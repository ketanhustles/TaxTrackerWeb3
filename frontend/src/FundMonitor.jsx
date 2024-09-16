import { useState, useEffect } from "react";
import getEthereumClient from "./ethereum";

const FundMonitor = () => {
  const [loading, setLoading] = useState(true);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [allocatedAmount, setAllocatedAmount] = useState(0);
  const [transferredAmount, setTransferredAmount] = useState(0);

  useEffect(() => {
    loadFundsData();
  }, []);

  const loadFundsData = async () => {
    const ethereumClient = await getEthereumClient();
    if (!ethereumClient) {
      setLoading(false);
      return;
    }

    try {
      const { contract } = ethereumClient;

      // Replace this with the address you want to monitor
      const addressToMonitor = "ADDRESS_TO_MONITOR";

      // Get the received amount for the provided address
      const received = await contract.getReceivedAmount(addressToMonitor);
      setReceivedAmount(received.toNumber());

      // Get the allocated amount for the provided address
      const allocated = await contract.getAllocatedAmount(addressToMonitor);
      setAllocatedAmount(allocated.toNumber());

      // Get the transferred amount for the provided address
      const transferred = await contract.getTransferredAmount(addressToMonitor);
      setTransferredAmount(transferred.toNumber());

      setLoading(false);
    } catch (error) {
      console.error("Error fetching funds data:", error);
      setLoading(false);
    }
  };

  const setCentralGov = async () => {
    try {
      const { contract, signer } = ethereumClient;
  
      // Replace 'centralGovAddress' with the address of the central government
      const centralGovAddress = "CENTRAL_GOVERNMENT_ADDRESS";
  
      // Call the contract function
      const tx = await contract.setCentralGov(centralGovAddress);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Central government address set successfully");
  
      // After setting the central government, reload the funds data
      loadFundsData();
    } catch (error) {
      console.error("Error calling setCentralGov:", error);
    }
  };

  const allocateFunds = async (fromAddress, toAddress, value) => {
    try {
      const { contract, signer } = ethereumClient;
  
      // Call the contract function
      const tx = await contract.allocateFunds(fromAddress, toAddress, value);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Funds allocated successfully");
  
      // After allocating funds, reload the funds data
      loadFundsData();
    } catch (error) {
      console.error("Error calling allocateFunds:", error);
    }  
  };

  const transferFunds = async (toAddress, amount) => {
    try {
      const { contract, signer } = ethereumClient;
  
      // Call the contract function
      const tx = await contract.transferFunds(toAddress, amount, { value: amount });
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Funds transferred successfully");
  
      // After transferring funds, reload the funds data
      loadFundsData();
    } catch (error) {
      console.error("Error calling transferFunds:", error);
    }  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Fund Monitor</h1>
      <div>
        <strong>Received Amount:</strong> {receivedAmount} Wei
      </div>
      <div>
        <strong>Allocated Amount:</strong> {allocatedAmount} Wei
      </div>
      <div>
        <strong>Transferred Amount:</strong> {transferredAmount} Wei
      </div>
      {/* Add buttons or UI elements to trigger the functions */}
      <button onClick={() => setCentralGov()}>Set Central Gov</button>
      <button onClick={() => setHierarchy("ORG_ADDRESS", 2)}>Set Hierarchy</button>
      <button onClick={() => allocateFunds("FROM_ADDRESS", "TO_ADDRESS", 100)}>Allocate Funds</button>
      <button onClick={() => transferFunds("TO_ADDRESS", 50)}>Transfer Funds</button>
    </div>
  );
};

export default FundMonitor;
