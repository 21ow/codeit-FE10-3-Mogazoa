import Image from 'next/image';

type Props = {
  id: string;
};

const FileLabel = ({ id }: Props) => {
  return (
    <label htmlFor={id}>
      <Image
        src="/icon/ic-img-upload.svg"
        alt="이미지 업로드 버튼"
        width={34}
        height={34}
      />
    </label>
  );
};

export default FileLabel;
