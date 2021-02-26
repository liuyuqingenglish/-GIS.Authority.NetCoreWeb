import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'Login/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/Login/LoginOut',
    method: 'get'
  })
}

export function getRandomCode(ssToken)
{
return request({ 
url:'/Login/GetRandomCode',
method:'get',
params:{ssToken}
})

}

export function checkRandomCode(ssToken,code)
{
return request({
url:'/Login/GetRandomCode',
method:'get',
params:{ssToken,code}
})

}
