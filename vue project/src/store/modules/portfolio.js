const state = {
	stocks: [],
	funds: 10000,
};

const mutations = {
	BUY_STOCK: (state, { stockID, quantity, stockPrice }) => {
		const record = state.stock.find((element) => {
			element.id == stockId;
		});
		if (record) {
			record.quantity += quantity;
		} else {
			state.stocks.push({
				id: stockId,
				quantity,
			});
		}
		state.funds -= stockPrice * quantity;
	},
	SELL_STOCK: (state, { stockID, quantity, stockPrice }) => {
		const record = state.stock.find((element) => {
			element.id == stockId;
		});
		if (record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
		state.funds += stockPrice * quantity;
	},
};

const actions = {
	sellStock: ({ commit }, order) => {
		commit("SELL_STOCK", order);
	},
};

const getters = {
	stockPortfolio: (state, getters) => {
		return state.stocks;
	},
	funds: (state) => {
		return state.funds;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
