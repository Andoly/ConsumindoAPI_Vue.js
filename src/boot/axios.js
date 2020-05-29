import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const axiosIntancia = axios.create({
  baseURL: 'http://www.splashbase.co/api/v1/images'
})

export { axiosIntancia }
