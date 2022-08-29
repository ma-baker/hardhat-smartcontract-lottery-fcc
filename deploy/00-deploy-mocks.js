const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium, it costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // 1 000 000 000 // calculated value based on the gas price of the chain

// the price of requests change based on the price of gas (could become more expensive if ETH price rises significantly)

module.exports = async function ({ getNamedAccount, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks ...")
        // deploy a mock vrfcoordinator ...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mock deployed!")
        log("------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
