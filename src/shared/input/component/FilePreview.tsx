'use client';

import Image from 'next/image';
import Button from '@/shared/button/Button';
import styles from './FilePreview.module.scss';
import { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';

type FilePreviewProps = {
  type: HTMLInputTypeAttribute;
  filePreviews: string[] | null;
  handleDeleteImg: (index: number) => void;
  multiple?: boolean;
};

const FilePreview = ({
  type,
  filePreviews = [],
  handleDeleteImg,
  multiple,
}: FilePreviewProps) => {
  const filePreviewClassName = classNames(styles.filePreviewsContainer, {
    [styles.singleFilePreview]: type === 'file' && !multiple,
  });
  return (
    type === 'file' && (
      <div className={filePreviewClassName}>
        {filePreviews &&
          filePreviews.map((preview, index) => (
            <div className={styles.filePreviewsWrapper} key={index}>
              <Image
                src={preview}
                alt={`${index + 1}`}
                fill
                className={styles.filePreviews}
              />
              <Button
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
              </Button>
            </div>
          ))}
      </div>
    )
  );
};

export default FilePreview;
