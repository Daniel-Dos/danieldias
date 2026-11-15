import React from 'react';
import Gear from '@site/src/components/Gear';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: 'Real-World Technical Content',
    description:
      'Real experiences with Java, Go, Rust, and more — from the daily work of building distributed systems.',
  },
  {
    title: 'Focus on Best Practices',
    description:
      'Clean architecture, readable code, testing, and scalable solutions. Solid engineering foundations.',
  },
  {
    title: 'Open Source & Community',
    description:
      'Apache Foundation projects, distributed systems, and tools that drive technical growth beyond any single stack.',
  },
];

function FeatureCard({ title, description }: FeatureItem) {
  return (
    <div className={styles.card}>
      <div className={styles.cardMedallion}>
        <Gear id={`feature-${title.replace(/\W/g, '')}`} size={54} teeth={12} spokes={4} hole={5} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.rivets} aria-hidden="true" />
      <h2 className={styles.sectionTitle}>What you'll find here</h2>
      <p className={styles.sectionSub}>— the workshop of a software engineer —</p>
      <div className={styles.cards}>
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
