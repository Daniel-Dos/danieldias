import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ZoomImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Imagem com zoom ao clicar (lightbox).
 * Usada automaticamente em todas as imagens Markdown/MDX do site
 * através do override do componente `img` em `src/theme/MDXComponents`.
 */
export default function ZoomImage({ style, ...props }: ZoomImageProps) {
  return (
    <Zoom>
      <img
        {...props}
        loading={props.loading ?? 'lazy'}
        decoding={props.decoding ?? 'async'}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          cursor: 'zoom-in',
          ...style,
        }}
      />
    </Zoom>
  );
}
