const FundMonitor = artifacts.require("FundMonitor");

module.exports = async function (deployer) {
  await deployer.deploy(FundMonitor);
  const fundMonitorInstance = await FundMonitor.deployed();
  console.log(
    "FundMonitor contract deployed to: ",
    fundMonitorInstance.address
  );
};
