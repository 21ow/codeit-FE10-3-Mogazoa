'use client';

import styles from './InfoMessage.module.scss';

export const INFO_MESSAGE = {
  nickname: '최대 10자 가능',
  password: '최소 8자 이상',
};

const InfoMessage = (id: string) => {
  const message = INFO_MESSAGE[id as keyof typeof INFO_MESSAGE];
  if (!message) return null;

  return <div className={styles.infoMessage}>{message}</div>;
};

export default InfoMessage;
