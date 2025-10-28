import React from 'react';
import Banner from '../components/Banner/Banner';
import Header from '../components/Header/Header';
import ProjectDiscussion from '../components/ProjectDiscussion/ProjectDiscussion';
import Footer from '../components/Footer/Footer';
import '../App.css';

const DiscussProject = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"/>
        <Banner />
        <Header />
        <ProjectDiscussion />
        <Footer />
      </div>
    </div>
  );
};

export default DiscussProject;

