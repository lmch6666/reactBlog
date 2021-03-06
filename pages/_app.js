import React,{ useState, useEffect} from 'react'
import { Layout } from '../Components/index'
import 'tailwindcss/tailwind.css'
import '../styles/global.css'
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
