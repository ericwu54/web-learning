import stocks from "../../data/data.js";

const state = {
	stocks: [],
};

const mutations = {
	INIT_STOCKS: (state, stocks) => {
		state.stocks = stocks;
	},
	RND_STOCKS: (state) => {},
};

const actions = {
	buyStock: ({ commit }, order) => {
		commit();
	},
	initStocks: ({ commit }) => {
		commit("INIT_STOCKS", stocks);
	},
	randomizeStocks: ({ commit }) => {
		commit("RND_STOCKS");
	},
};

const getters = {
	stocks: (state) => {
		return state.stocks;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
