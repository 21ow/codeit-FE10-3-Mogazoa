'use client';
import { ImgHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import styles from './Image.module.scss';

interface ProductImageProps
  extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  width?: number;
  height?: number;
}

const Image = ({ src, alt, width = 300, height = 300 }: ProductImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  const handleImageError = () => {
    setImageSrc(undefined);
  };

  return (
    <div className={styles.container}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt ?? ''}
          className={styles.image}
          onError={handleImageError}
          priority
          width={width}
          height={height}
        />
      ) : (
        <div className={styles.placeholder} style={{ width, height }}>
          ?
        </div>
      )}
    </div>
  );
};

export default Image;
