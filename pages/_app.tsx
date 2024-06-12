import InitLayout from "@/components/initLayout"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout"
import Home from "@/pages/home"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return ( 
      <Layout pageTitle="Soporte">
        <Component {...pageProps} />
      </Layout>

      // <InitLayout>
      //   {/* <Component {...pageProps} /> */}
      //   <Home/>
      // </InitLayout>
  )
}
