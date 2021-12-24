import { PlaywrightTestConfig, devices } from '@playwright/test'
import { server } from './config'

const { CI } = process.env
const port = (server.port as number) || 8000

const config: PlaywrightTestConfig = {
  webServer: {
    port,
    timeout: 120 * 5000,
    reuseExistingServer: !CI,
    command: 'yarn generate:ci && yarn start:ci',
  },
  forbidOnly: !!CI,
  retries: CI ? 2 : 1,
  testMatch: /.*\.e2e-spec\.ts/,
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: `http://localhost:${port}/`,
    trace: 'retain-on-failure',
    storageState: 'storageState.json',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
}
export default config
