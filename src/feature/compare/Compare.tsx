import styles from './Compare.module.scss';
import Inputs from './inputs/Inputs';
import Result from './result/Result';

const Compare = () => {
  return (
    <div className={styles.container}>
      <Inputs />
      <Result />
    </div>
  );
};

export default Compare;
