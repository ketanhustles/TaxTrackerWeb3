import { ethers } from "ethers";

const getEthereumClient = async () => {
  // Check if the browser has MetaMask installed
  if (window.ethereum) {
    try {
      // Request access to the user's accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Connect to the Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace 'FundMonitor' with the actual contract name if different
      const contractName = "FundMonitor";
      const contractAddress = "0x4711CAB8cc28191F16D40eA850b7677BA0cb6c8e"; // Contract Address

      // Load the contract ABI dynamically
      const response = await fetch(`/contracts/${contractName}.json`);
      const contractABI = await response.json();

      // Get the deployed contract instance
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      return { provider, signer, contract };
    } catch (error) {
      console.error("Error connecting to Ethereum provider:", error);
      return null;
    }
  } else {
    console.error("Please install MetaMask to use this application.");
    return null;
  }
};

export default getEthereumClient;
