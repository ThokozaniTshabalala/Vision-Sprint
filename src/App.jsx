import { useState } from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Banner from './components/Banner/Banner';
import DeviceDesign from './components/DeviceDesign/DeviceDesign';
import Services from './components/Services/Services';
import FooterBanner from './components/FooterBanner/FooterBanner'
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
  return (
    <div className="App"> 
    <div>
      <div className="white-gradient"/>
      <Banner />
      <Header/>
      <Hero />
      <DeviceDesign />
      <Services className="mb-0"/>
      <FooterBanner />
      <Footer />
    </div>
      
    </div>
  );
}


export default App
