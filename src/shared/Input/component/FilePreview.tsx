import Image from 'next/image';
import styles from './FilePreview.module.scss';

type FilePreviewProps = {
  filePreviews: string[] | null;
  handleDeleteImg: (index: number) => void;
};

const FilePreview = ({
  filePreviews = [],
  handleDeleteImg,
}: FilePreviewProps) => {
  return (
    <div className={styles.filePreviewsContainer}>
      {filePreviews &&
        filePreviews.map((preview, index) => (
          <div className={styles.filePreviewsWrapper} key={index}>
            <Image
              src={preview}
              alt={`${index + 1}`}
              layout="fill"
              objectFit="cover"
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
                layout="fill"
                objectFit="cover"
                className={styles.deleteIcon}
              />
            </button>
          </div>
        ))}
    </div>
  );
};

export default FilePreview;
