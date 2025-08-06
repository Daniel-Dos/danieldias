import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Real-World Technical Content',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
        I share real experiences with Java, Go, and other technologies — straight from the daily work of a software engineer.
      </>
    ),
  },
  {
    title: 'Focus on Best Practices',
    Svg: require('@site/static/img/undraw_code-thinking.svg').default,
    description: (
      <>
        Clean architecture, readable code, testing, and scalable solutions. More than just tutorials — solid software engineering foundations.
      </>
    ),
  },
  {
    title: 'Continuous Learning and Exploration',
    Svg: require('@site/static/img/undraw_learning.svg').default,
    description: (
      <>
        This blog isn’t limited to specific stacks. It’s an open space to explore ideas, languages, and tools that drive technical growth.
      </>
    ),
  },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
