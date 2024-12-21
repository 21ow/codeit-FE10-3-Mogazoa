'use client';

import Button from '@/shared/button/Button';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={styles.buttonContain}>
      <Button
        label="Click me"
        onClick={() => console.log('안녕하세요')}
        className={styles.customButton}
      />
      <Button
        label="Click button"
        onClick={() => console.log('안녕하세요')}
        className={styles.customButton2}
      />
    </div>
  );
};

export default Page;
