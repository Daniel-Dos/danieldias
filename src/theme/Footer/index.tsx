import React from 'react';
import Link from '@docusaurus/Link';
import Gear from '@site/src/components/Gear';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.gearWatermark} aria-hidden="true">
        <Gear id="footer-gear" size={260} teeth={20} spokes={6} hole={14} className={styles.gearSpin} />
      </div>

      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandName}>Daniel Dias</Link>
          <span className={styles.tagline}>
            Java · Go · Rust · Distributed Systems · Open Source
          </span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/blog"                           className={styles.link}>Blog</Link>
          <Link to="/docs/about-me"                  className={styles.link}>About</Link>
          <a href="https://github.com/daniel-dos"   target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href="https://www.apache.org"           target="_blank" rel="noopener noreferrer" className={styles.link}>Apache</a>
          <a href="https://www.linkedin.com/in/daniel-dias" target="_blank" rel="noopener noreferrer" className={styles.link}>Linkedin</a>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} Daniel Dias. Built with Docusaurus.
        </span>
        <span className={styles.plate}>⚙ forged with brass &amp; code</span>
      </div>
    </footer>
  );
}
