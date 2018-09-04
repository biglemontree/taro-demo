import axios from 'axios'
// import appStore from '@/store'
import baseURL from './baseURL'
import { getIEVersion } from './util'

const service = axios.create({
    baseURL,
    method: 'post',
    timeout: 15000
})


// service.defaults.timeout = 10000

service.interceptors.request.use(options => {
    // console.log('request: ', options, appStore)
    const config = options
    // config.headers['TOKEN'] = 'token'
    const method = options.method.toUpperCase()
    if (method === 'GET') {
        config.params = {
            ...options.params,
            // token: appStore.token,
        }
    } else {
        config.data = Object.assign({}, {
            // token: appStore.token,
        }, options.data)
    }
    // appStore.spinning = true
    console.log('请求参数', config.data)

    // 由于IE9只支持XDomainRequest方式跨域，且它有许多的限制，如：不能加入自定义header，只支持text/plain格式报文等
    // 所以这里通过代理的方式处理跨域请求
    const ie = getIEVersion()
    if (ie > 0 && ie < 10) {
        config.baseURL = '/api'
    }

    return config
}, error => Promise.reject(error))

service.interceptors.response.use(
    response => {
        // appStore.spinning = false
        console.log('response: ', response.data)
        const { code } = response.data
        // Do something
        if (code === 9000) {
            return response.data
        }

        return Promise.reject(response.data)
    },
    error => Promise.reject(error)
)

/**
 * axios封装
 * @param  {Object} params      axios 的请求参数
 * @param  {Boolean} ignoreError 是否忽略错误，用来自己处理异常
 * @return {Promise}             返回一个Promise对象
 */
function request(params, ignoreError) {
    return service(params).catch(res => {
        console.log('request.error: ', res)
        const code = res.code

        // 9001 用户不存在, 9002 无权限, 9005 token不存在，9006 token失效
        if (code === 9001 || code === 9002 || code === 9005 || code === 9006) {
            // appStore.setToken(null)
            // // 跳转到没有权限页面
            // window.location = '/noauth'
            return false
        }

        // 接口如果需要在外边需要异常，需要设置ignoreError = true
        if (ignoreError !== true) {
            // appStore.setError(res)
        }
        // appStore.spinning = false
        return Promise.reject(res)
    })
}

export default request
