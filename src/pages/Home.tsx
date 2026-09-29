import { MotionConfig } from 'framer-motion';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Banner from '../components/Banner/Banner';
import DeviceDesign from '../components/DeviceDesign/DeviceDesign';
import Services from '../components/Services/Services';
import FooterBanner from '../components/FooterBanner/FooterBanner';
import Footer from '../components/Footer/Footer';
import { Constellation, LightLeaks, NoiseOverlay, Telemetry, VelocitySkew } from '../components/Glass/Atmosphere';
import '../App.css';

function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="App isolate">
        <div>
          {/* Fixed layers live outside VelocitySkew: a transformed ancestor would break position: fixed. */}
          <LightLeaks />
          <Constellation />
          <NoiseOverlay />
          <Telemetry />
          <div className="white-gradient" />
          <Banner />
          <Header />
          <VelocitySkew>
            <Hero />
            <DeviceDesign />
            <Services />
            <FooterBanner />
            <Footer />
          </VelocitySkew>
        </div>
      </div>
    </MotionConfig>
  );
}

export default Home;
