import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.customFooter}>
      <div className={styles.footerContent}>
        {/* Esquerda: Texto */}
        <div className={styles.leftSection}>
          <span>© {new Date().getFullYear()} danieldias.dev</span>
        </div>

        {/* Centro: Imagem */}
        <div className={styles.centerSection}>
          <img
            src="/danieldias/img/footer.png"
            alt="Logo danieldias.dev"
            className={styles.logo}
          />
        </div>

        {/* Direita: Links */}
        <div className={styles.rightSection}>
          <a href="/blog">Blog</a>
          <a href="https://github.com/daniel-dos" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href='https://hub.docker.com/u/danieldiasjava' target="_blank" rel="noopener noreferrer">
            Docker Hub
          </a>
        </div>
      </div>
    </footer>
  );
}
