import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {abi} from "../constants/abi.js";

const MLAPage = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [fundMonitorContract, setFundMonitorContract] = useState(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      accountChangedHandler(window.ethereum.selectedAddress);
    }
  }, []);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[3]);
        })
        .catch((error) => {
          console.error("User Denied account access", error);
        });
    } else {
      console.log("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
    initializeFundMonitorContract(newAccount);
  };

  const getUserBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setUserBalance(ethers.formatUnits(balance));
    } catch (error) {
      console.error("Error fetching user balance", error);
    }
  };

  const initializeFundMonitorContract = async (account) => {
    if (account) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0x4711CAB8cc28191F16D40eA850b7677BA0cb6c8e";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setFundMonitorContract(contract);
    }
  };

  const allocateFundsHandler = async () => {
    try {
      if (!fundMonitorContract) {
        console.log("FundMonitor contract not initialized");
        return;
      }
      if (!fromAddress || !toAddress || !amount) {
        console.log(
          "Please enter all required parameters(sAddress, rAddress, amount)"
        );
        return;
      }

      const transaction = await fundMonitorContract.allocateFunds(
        fromAddress,
        toAddress,
        ethers.parseEther(amount)
      );
      await transaction.wait();
    } catch (error) {
      console.error("error allocating funds", error);
    }
  };

   const transferFundsHandler = async () => {
    try {
      if (!fundMonitorContract) {
        console.log("FundMonitor contract not initialized.");
        return;
      }
      if (!toAddress || !amount) {
        console.log("Please enter all required parameters.");
        return;
      }
      console.log(amount);
      const transaction = await fundMonitorContract.transferFunds(
        toAddress,
        ethers.parseEther(amount)
      );
      await transaction.wait();
    } catch (error) {
      console.error("Error transferring funds: ", error);
    }
  };

  return (
    <>
  <div className="walletAddress"><h3>Connect MLA's Wallet</h3></div>
  <div className="buttonContainer"><button onClick={connectWalletHandler}>Connect</button></div>
      <div className="accountDisplay">
        <h3>Address of MLA's Wallet : {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance of MLA's Wallet : {userBalance} ETH</h3>
      </div>
      <div className="allocateFunds">
        <h4>{"Allocate Funds to Cotractor"}</h4>
        <input
          type="text"
          placeholder="From Address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount(ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="buttonContainer"><button onClick={allocateFundsHandler}>Allocate</button></div>
      </div>
      <div className="transferFunds">
        <h4>{"Transfer Funds to Cotractor"}</h4>
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount(ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="buttonContainer"><button onClick={allocateFundsHandler}>Transfer</button></div>
      </div>
    </>
  );
};

export default MLAPage;
