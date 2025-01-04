import Image from 'next/image';
import Button from '@/shared/button/Button';
import styles from './SocialSiginin.module.scss';

type SocialSigninProps = {
  src: string;
  social: string;
};

const SocialSignin = ({ src, social }: SocialSigninProps) => {
  return (
    <Button className={styles.socialButton}>
      <Image src={src} width={28} height={28} alt={`${social} 간편로그인`} />
    </Button>
  );
};

export default SocialSignin;
