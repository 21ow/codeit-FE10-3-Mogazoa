'use client';

import { InfoMessageType, INFO_MESSAGE } from '../constant/infoMessage';
import styles from './InfoMessage.module.scss';

type InfoMessageProps = {
  id: string;
};

const InfoMessage = ({ id }: InfoMessageProps) => {
  const message = INFO_MESSAGE[id as keyof InfoMessageType];
  if (!message) return null;

  return <div className={styles.infoMessage}>{message}</div>;
};

export default InfoMessage;
