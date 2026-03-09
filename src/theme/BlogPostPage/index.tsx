/**
 * Swizzled BlogPostPage — injects VisitorCounter into every blog post.
 * Place at: src/theme/BlogPostPage/index.tsx
 */
import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type { WrapperProps } from '@docusaurus/types';
import VisitorCounter from '@site/src/components/VisitorCounter';

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): React.ReactElement {
  return (
    <>
      <BlogPostPage {...props} />
      <VisitorCounterPortal />
    </>
  );
}

function VisitorCounterPortal() {
  // Only render on client side
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{
      maxWidth: '860px',
      margin: '-1rem auto 3rem',
      padding: '0 2rem',
    }}>
      <VisitorCounter />
    </div>
  );
}
