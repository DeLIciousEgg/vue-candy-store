import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default ({
  strict: true,
  namespaced: true,
  state: {
    loadingItem: '',
    carts: [],
    couponMessage: ''
  },
  mutations: {
    updateLoadingItem(state, id) {
      state.loadingItem = id
    },
    getCarts(state, carts) {
      state.carts = carts
    },
    updateCouponMes(state, mes) {
      state.couponMessage = mes
    }
  },
  actions: {
    CARTS_GET: ({ commit }) => {
      // commit('updateLoading', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(res => {
        // commit('updateLoading', false, { root: true })
        if (!res.data.success) return false
        commit('getCarts', res.data.data)
      })
    },
    CART_ADD: ({ commit, dispatch }, cart) => {
      commit('updateLoadingItem', cart.product_id)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.post(api, { data: cart }).then(res => {
        commit('updateLoadingItem', '')
        if (!res.data.success) return false
        dispatch('CARTS_GET')
      })
    },
    CART_REMOVE: ({ commit, dispatch }, id) => {
      commit('updateLoading', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios.delete(api).then(res => {
        commit('updateLoading', false, { root: true })
        if (!res.data.success) return false
        dispatch('CARTS_GET')
      })
    },
    COUPON_APPLY: ({ commit, dispatch }, couponCode) => {
      commit('updateLoading', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      axios.post(api, { data: { code: couponCode } }).then(res => {
        commit('updateLoading', false, { root: true })
        commit('updateCouponMes', res.data.message)
        if (!res.data.success) return false
        dispatch('CARTS_GET')
      })
    }
  },
  getters: {
    cartItem: state => {
      return state.carts.carts
    },
    cartCount: (state, getters) => {
      if (!getters.cartItem) return 0
      else return getters.cartItem.length
    },
    cartTotal: state => {
      return state.carts.total
    },
    cartFinalTotal: state => {
      return state.carts.final_total
    },
    couponMessage: state => {
      return state.couponMessage
    }
  }
})
