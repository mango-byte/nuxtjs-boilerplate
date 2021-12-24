import { writeFileSync } from 'fs'
import { chromium, FullConfig } from '@playwright/test'
import { collect } from 'collect.js'
import { findIndex } from 'lodash'
import { server } from './config'

async function globalSetup(_: FullConfig) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`http://${server.host}:${server.port}/login`)
  await page.fill('input[name="identifier"]', 'mango_one+admin@mango-byte.com')
  await page.fill('input[name="password"]', 'MB@12345678')
  await page.click('data-test-id=login-submit-btn')
  const state = await page.context().storageState({ path: 'storageState.json' })
  const cookieIndex = findIndex(state.cookies, ['name', 'auth._token.local'])
  const cookieToken = state.cookies[cookieIndex]
  const originToken = collect(collect(state.origins).first().localStorage)
    .where('name', 'auth._token.local')
    .first()
  cookieToken.value = originToken.value
  state.cookies[cookieIndex] = cookieToken
  writeFileSync('storageState.json', JSON.stringify(state, null, 2))
  await browser.close()
}

export default globalSetup
