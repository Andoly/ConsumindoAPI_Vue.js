import { axiosIntancia } from 'boot/axios'

export function pullFotos ({ commit }, { param }) {
  commit('putCarregando', true)
  if (param) {
    const query = `/search?query=${param.toLowerCase()}`
    return axiosIntancia.get(query).then((response) => {
      const fotos = response.data.images
      console.warn(fotos)
      commit('putCarregando', false)
      commit('putFotos', fotos)
    })
  } else {
    return axiosIntancia.get('/latest').then((response) => {
      const fotos = response.data.images
      console.warn(fotos)
      commit('putCarregando', false)
      commit('putFotos', fotos)
    })
  }
}
