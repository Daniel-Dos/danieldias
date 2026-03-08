import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    icon: '⚡',
    title: 'Real-World Technical Content',
    description:
      'Real experiences with Java, Go, Rust, and more — from the daily work of building distributed systems.',
  },
  {
    icon: '🏗️',
    title: 'Focus on Best Practices',
    description:
      'Clean architecture, readable code, testing, and scalable solutions. Solid engineering foundations.',
  },
  {
    icon: '🌐',
    title: 'Open Source & Community',
    description:
      'Apache Foundation projects, distributed systems, and tools that drive technical growth beyond any single stack.',
  },
];

function FeatureCard({ icon, title, description }: FeatureItem) {
  return (
    <div className={styles.card}>
      <span className={styles.cardIcon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>What you'll find here</h2>
      <div className={styles.cards}>
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
