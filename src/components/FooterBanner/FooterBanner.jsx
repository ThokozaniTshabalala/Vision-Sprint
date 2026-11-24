import { Link } from 'react-router-dom';
import './FooterBanner.css';

const FooterBanner = () => {
  const handleProjectLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative py-8 md:py-12">
      <div className="footer-banner-image-wrapper relative mx-auto flex justify-center items-center px-4">
        <picture>
          <source
            media="(max-width: 940px)"
            srcSet="/vision-sprint_footer-cta-stop-guessing-for-mobile-screens-web-version.png"
          />
          <img
            src="/vision-sprint_footer-cta-stop-guessing-web-version.png"
            alt="Stop guessing—start growing with Vision Sprint"
            className="banner-image"
          />
        </picture>
        <Link
          to="/discuss-project"
          className="footer-banner-project-link"
          onClick={handleProjectLinkClick}
        >
          Discuss a Project
        </Link>
      </div>
    </section>
  );
};

export default FooterBanner;
