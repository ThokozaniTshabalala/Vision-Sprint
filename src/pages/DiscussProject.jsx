import { MotionConfig } from 'framer-motion';
import Banner from '../components/Banner/Banner';
import Header from '../components/Header/Header';
import ProjectDiscussion from '../components/ProjectDiscussion/ProjectDiscussion';
import Footer from '../components/Footer/Footer';
import { LightLeaks, NoiseOverlay } from '../components/Glass/Atmosphere';
import '../App.css';

const DiscussProject = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="App isolate">
        <div>
          <LightLeaks />
          <NoiseOverlay />
          <div className="white-gradient"/>
          <Banner />
          <Header />
          <ProjectDiscussion />
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
};

export default DiscussProject;
