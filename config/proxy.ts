const pathRewrite = process.env.API_PREFIX as string

export const proxy = {
  [pathRewrite]: {
    target: process.env.API_URL,
    pathRewrite: {
      [`^${pathRewrite}`]: '',
    },
    ws: true,
  },
}
