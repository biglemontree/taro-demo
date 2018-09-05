/* eslint-disable */
const baseURL = process.env.NODE_ENV === 'development'
    // ? ''
    ? 'https://service.ddnsto.com'
    // ? 'http://oa.pc.yewifi.com'
    : process.env.NODE_ENV === 'testing'
    ? 'https://service.ddnsto.com' : 'https://service.ddnsto.com'

module.exports = baseURL

