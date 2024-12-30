'use client';

import Image from 'next/image';
import styles from './FilePreview.module.scss';
import { HTMLInputTypeAttribute } from 'react';

type FilePreviewProps = {
  type: HTMLInputTypeAttribute;
  filePreviews: string[] | null;
  handleDeleteImg: (index: number) => void;
};

const FilePreview = ({
  type,
  filePreviews = [],
  handleDeleteImg,
}: FilePreviewProps) => {
  return (
    type === 'file' && (
      <div className={styles.filePreviewsContainer}>
        {filePreviews &&
          filePreviews.map((preview, index) => (
            <div className={styles.filePreviewsWrapper} key={index}>
              <Image
                src={preview}
                alt={`${index + 1}`}
                fill
                className={styles.filePreviews}
              />
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDeleteImg(index)}
              >
                <Image
                  src={'/icon/ic-close.svg'}
                  alt="삭제 버튼"
                  fill
                  className={styles.deleteIcon}
                />
              </button>
            </div>
          ))}
      </div>
    )
  );
};

export default FilePreview;
