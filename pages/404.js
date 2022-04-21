import Link from 'next/link';
import styles from '../styles/404.module.scss';

const Custom404ErrorPage = () => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>404</div>
        <div className={StyleSheet.small_text}>
          <span className="">Take me back to &nbsp;</span>
          <Link href="/">
            <a className="">store</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404ErrorPage;
