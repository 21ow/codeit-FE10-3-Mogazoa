import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  formError?: string | null;
  fileError?: string | null;
};

const ErrorMessage = ({ formError, fileError }: ErrorMessageProps) => {
  return (
    <>
      {formError && <div className={styles.errorMessage}>{formError}</div>}
      {fileError && <div className={styles.errorMessage}>{fileError}</div>}
    </>
  );
};

export default ErrorMessage;
