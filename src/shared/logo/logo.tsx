import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';

const LogoLink = ({ className = '' }) => {
  return (
    <Link href="/" className={className}>
      <Logo />
    </Link>
  );
};

export default LogoLink;
