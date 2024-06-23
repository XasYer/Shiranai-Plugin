import { load } from 'cheerio'
import { getTime } from '#models'

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded'
}

async function fetchRequest (method, id, options = {}) {
  const url = `https://shindanmaker.com/${id}`
  const response = await fetch(url, {
    method,
    headers,
    ...options
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response
}

function get (id, options = {}) {
  return fetchRequest('GET', id, options)
}

function post (id, data, options = {}) {
  return fetchRequest('POST', id, { body: typeof data === 'object' ? JSON.stringify(data) : data, ...options })
}

export async function getShindanTitle (id) {
  const response = await get(id)
  const html = await response.text()
  const $ = load(html)
  const title = $('#shindanTitle').text().trim()
  return title
}

export async function makeShindan (id, name) {
  const seed = getTime()
  const response = await get(id)
  headers.cookie = response.headers.getSetCookie().join('; ')
  const html = await response.text()
  const $ = load(html)
  const form = $('#shindanForm')
  const _token = form.find('input[name="_token"]').val()
  const shindan_token = form.find('input[name="shindan_token"]').val()
  const hiddenName = form.find('input[name="hiddenName"]').val()
  const payload = `_token=${_token}&shindanName=${encodeURIComponent(name + seed)}&hiddenName=${encodeURIComponent(hiddenName)}&type=name&shindan_token=${shindan_token}`
  const resultResponse = await post(id, payload)
  const resultHtml = await resultResponse.text()
  const result$ = load(resultHtml)
  const titleAndResult = result$('#title_and_result').html().replace(new RegExp(seed, 'g'), '')
  const resultJS = '<script>' + result$('script:contains("savedShindanResult")').html() + '</script>'
  const hasChart = resultHtml.includes('chart.js')
  return {
    resultJS,
    hasChart,
    titleAndResult
  }
}
