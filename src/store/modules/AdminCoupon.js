import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import { apiAdminCouponsGet, apiAdminCouponAdd, apiAdminCouponEdit, apiAdminCouponRemove } from '@/api.js'

Vue.use(Vuex)

export default ({
  namespaced: true,
  state: {
    coupons: [],
    pagination: {},
  },
  mutations: {
    getCoupons: (state, coupons) => {
      state.coupons = coupons
    },
    getPagination: (state, pagination) => {
      state.pagination = pagination
    },
  },
  actions: {
    COUPONS_GET: ({ commit }, page = 1) => {
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      commit('updateLoading', true, { root: true })
      apiAdminCouponsGet().then(res => {
        commit('updateLoading', false, { root: true })
        if (!res.data.success) return false
        commit('getCoupons', res.data.coupons)
        commit('getPagination', res.data.pagination)
      })
    },
    COUPON_ADD: ({ dispatch }, tempCoupon) => {
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      apiAdminCouponAdd({ data: tempCoupon }).then(res => {
        if (!res.data.success) return false
        dispatch('COUPONS_GET')
        dispatch('ALERT_SHOW', {
          isAlert: true,
          status: 'success',
          message: res.data.message
        }, { root: true })
      })
    },
    COUPON_EDIT: ({ dispatch }, tempCoupon) => {
      //const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${tempCoupon.id}`
      apiAdminCouponEdit(tempCoupon.id, { data: tempCoupon }).then(res => {
        if (!res.data.success) return false
        dispatch('COUPONS_GET')
        dispatch('ALERT_SHOW', {
          isAlert: true,
          status: 'success',
          message: res.data.message
        }, { root: true })
      })
    },
    COUPON_REMOVE: ({ dispatch }, id) => {
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`
      apiAdminCouponRemove(id).then(res => {
        if (!res.data.success)
          dispatch('ALERT_SHOW', {
            isAlert: true,
            status: 'danger',
            message: res.data.message
          }, { root: true })
        dispatch('COUPONS_GET')
        dispatch('ALERT_SHOW', {
          isAlert: true,
          status: 'success',
          message: res.data.message
        }, { root: true })
      })
    }
  },
  getters: {
    coupons: state => {
      return state.coupons
    },
    pagination: state => {
      return state.pagination
    }
  }
})
