/**
 * @format
 * @flow
 */

import { REQUEST_TIMEOUT } from '@/constants'

import config from './config'

export default class APIRequest {
  constructor(uri = '/', method, authToken) {
    this.uri = uri
    this._options = { method }
    this._defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
    }
    if (authToken) {
      this._defaultHeaders.Authorization = 'Bearer ' + authToken
    }
  }

  _request = async (uri, options) => {
    if (uri) {
      this.uri = uri
    }
    const { params } = options
    const url = new URL(this._url)
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
    }
    console.log(`\x1B[35mStarted \x1B[30m${uri}:\x1B[32m ${new Date().getTime()}`)
    return new Promise((resolve, reject) => {
      let controller = new AbortController()
      // let timer = setTimeout(() => {
      //   controller.abort()
      //   reject({ success: false, data: { data: [] }, message: 'Request timeout' })
      //   clearTimeout(timer)
      // }, REQUEST_TIMEOUT)
      this._options = {
        ...this._options,
        ...options,
        signal: controller.signal,
      }
      fetch(url, this._options)
        .then(
          async (res) => {
            // clearTimeout(timer)
            let data
            try {
              data = await res.json()
              console.log(
                `\x1B[36mSuccessfully ended \x1B[30m${uri}:\x1B[34m ${new Date().getTime()} \x1B[32m${JSON.stringify(
                  data,
                  null,
                  4,
                )}`,
              )
              resolve({
                status: res.status,
                data,
                success: (data?.success && res.status < 300) || res.status === 200,
                message: data?.message,
              })
            } catch (err) {
              if (err.message?.includes('Unauthorized')) {
                global.signOut()
              }
              resolve({ success: false, data: { data: [] }, message: err.message })
            }
          },
          (err) => {
            resolve({ success: false, data: { data: [] }, message: err.message })
          },
        )
        .finally(() => {
          console.log(`\x1B[32mEnded \x1B[30m${uri}:\x1B[31m ${new Date().getTime()}`)
        })
    })
  }

  set authToken(authToken) {
    this._defaultHeaders.Authorization = 'Bearer ' + authToken
  }

  get authToken() {
    return this._defaultHeaders.Authorization
  }

  set uri(uri) {
    this._url = config.apiURL + (uri[0] === '/' ? uri.slice(1) : uri)
  }

  set url(url) {
    this._url = url
  }

  proceed = (options) => {
    return this._request({ ...options })
  }

  get = (uri, params, headers) => {
    delete this._options.body
    return this._request(uri, {
      params,
      headers: { ...headers, ...this._defaultHeaders },
      method: 'GET',
    })
  }

  post = (uri, body, headers) => {
    return this._request(uri, {
      body: JSON.stringify(body || {}),
      headers: { ...headers, ...this._defaultHeaders },
      method: 'POST',
    })
  }

  put = (uri, body, headers) => {
    return this._request(uri, {
      body: JSON.stringify(body),
      headers: { ...headers, ...this._defaultHeaders },
      method: 'PUT',
    })
  }

  patch = (uri, body, headers) => {
    return this._request(uri, {
      body: JSON.stringify(body),
      headers: { ...headers, ...this._defaultHeaders },
      method: 'PATCH',
    })
  }

  delete = (uri, params, headers, body) => {
    return this._request(uri, {
      params,
      body: JSON.stringify(body),
      headers: { ...headers, ...this._defaultHeaders },
      method: 'DELETE',
    })
  }
}
