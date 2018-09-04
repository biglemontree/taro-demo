/* eslint-disable */
const baseURL = process.env.NODE_ENV === 'development'
    // ? ''
    ? 'http://api-oa-web.yewifi.com'
    // ? 'http://oa.pc.yewifi.com'
    : process.env.NODE_ENV === 'testing'
    ? 'http://api-oa-web.yewifi.com' : 'http://api-oa-web.fapiaoer.cn'

module.exports = baseURL

