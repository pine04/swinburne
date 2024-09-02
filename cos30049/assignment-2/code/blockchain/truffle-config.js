module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "9999",
			from: "0xd395C86E63d756fbf67854539a8CcaEcd1F274AD",
			gas: 4500000
		}
	},
	compilers: {
		solc: {
			version: "0.5.16"
		}
	}
}