'use client';
import { useState } from 'react';
import { postImagesUpload } from '@/api/ImageApi';
import Image from 'next/image';
import styles from './ImageContain.module.scss';

type ImageContainProps = {
  setImageUrl: (url: string | null) => void;
  showPreview?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

const ImageContain = ({
  setImageUrl,
  showPreview = true,
  width = 34,
  height = 34,
  className,
}: ImageContainProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && imageUrls.length < 2) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      setUploading(true);
      try {
        const response = await postImagesUpload({ file: selectedFile });
        const uploadedUrl = response.url;
        setImageUrls((prevUrls) => [...prevUrls, uploadedUrl]);
        setImageUrl(uploadedUrl);
        setUploading(false);
      } catch (error) {
        alert('이미지 업로드 실패. 다시 시도해주세요.');
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (url: string) => {
    setImageUrls((prevUrls) => prevUrls.filter((imgUrl) => imgUrl !== url));
  };

  return (
    <div className={styles.imageUploadContainer}>
      <label htmlFor="imageUpload" className={className || styles.fileLabel}>
        <input
          type="file"
          id="imageUpload"
          onChange={handleFileChange}
          accept="image/*"
          className={styles.fileInput}
          disabled={imageUrls.length >= 1}
        />
        <Image
          src="/icon/ic-img-upload.svg"
          alt="이미지 업로드 버튼"
          width={width}
          height={height}
        />
      </label>

      {showPreview && (
        <div className={styles.imagePreviewContainer}>
          {imageUrls.map((url, index) => (
            <div key={index} className={styles.imagePreview}>
              <Image
                src={url}
                alt={`업로드된 이미지 ${index + 1}`}
                width={165}
                height={165}
              />
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveImage(url)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageContain;
