import { login, logout, getInfo ,getRandomCode,checkRandomCode} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { createUuid } from '@/utils/index'
import { resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    tempToken:createUuid()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_TEMPTOKEN: (state, tempToken) => {
    state.tempToken = tempToken
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { Account, Password } = userInfo
    return new Promise((resolve, reject) => {
      login({ Account: Account.trim(), Password: Password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  //获取验证码
  getRandomCode({ commit ,state}) {
  return new Promise((resovle,reject) => {
     getRandomCode(state.tempToken).then( res => {
     resolve();
     }).catch( error => {
       reject(error);
     })
  })

  },

  //对比验证码
  checkRandomCode({ commit ,state},code) {
    return new Promise((resovle,reject) => {
      checkRandomCode(state.tempToken,code).then( res => {
          resolve();
        
       })
  
    })
  
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

