import { expect, test } from '@playwright/test'
import { attributes, common, login } from '../locales/ja'

test.use({ storageState: undefined })

test.describe.parallel("should see login form, if user doesn't login", () => {
  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('can see login form', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    const pageTitle = page.locator('.v-login__title')
    const identifierLabel = page.locator('data-test-id=login-identifier')
    const passwordLabel = page.locator('data-test-id=login-password')
    const loginBtn = page.locator('data-test-id=login-submit-btn')
    await expect(pageTitle).toHaveText(login.title)
    await expect(identifierLabel).toHaveText(attributes.identifier)
    await expect(passwordLabel).toHaveText(attributes.password)
    await expect(loginBtn).toHaveText(common.login)
  })
})
