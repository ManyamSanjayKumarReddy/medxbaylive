import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/footer/footerrs'

const Defult = ({ children }) => {
  return (
    <>
    <Header/>
    <main>{children}</main>
    <Footer />
  </>
  )
}

export default Defult