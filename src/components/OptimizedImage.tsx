import type { ImgHTMLAttributes } from 'react';
import { cn, publicUrl } from '@/lib/utils';

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /** Caminho canônico em `public/`, ex. `/img/slim.webp` (800w). */
  src: string;
  alt: string;
  /** Prioridade alta (LCP). Desativa lazy automaticamente. */
  priority?: boolean;
  /**
   * Gera `srcSet` 400w/800w a partir de `*-400.webp` + canônico.
   * Desative se o asset não tiver variante.
   */
  responsive?: boolean;
};

/** `/img/slim.webp` → `/img/slim-400.webp` */
export function productImageSrc400(src: string): string {
  return src.replace(/\.webp$/i, '-400.webp');
}

/**
 * Imagem pública com lazy/async por padrão, srcSet 400/800 e suporte a `priority`.
 * Paths via `publicUrl` para respeitar `BASE_URL` (GitHub Pages).
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  responsive = true,
  className,
  loading,
  decoding,
  fetchPriority,
  srcSet,
  sizes,
  ...rest
}: OptimizedImageProps) {
  const resolvedSrc = publicUrl(src);
  const resolvedSrcSet =
    srcSet ??
    (responsive && /\.webp$/i.test(src)
      ? `${publicUrl(productImageSrc400(src))} 400w, ${resolvedSrc} 800w`
      : undefined);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      srcSet={resolvedSrcSet}
      sizes={sizes ?? (resolvedSrcSet ? '220px' : undefined)}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding ?? (priority ? 'sync' : 'async')}
      fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
      className={cn(className)}
      {...rest}
    />
  );
}
