import type { AppProps } from 'next/app'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CssBaseline } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/public/favicon/favicon.ico' />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Component {...pageProps} />
      </LocalizationProvider>
    </>
  )
}

export default MyApp
