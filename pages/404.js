import Link from 'next/link';

const Custom404ErrorPage = () => {
  return (
    <>
      <div className="">
        <p className="">404</p>
      </div>
      <div className="">
        <span className="">Take me back to &nbsp;</span>
        <Link href="/">
          <a className="">the grocery store</a>
        </Link>
      </div>
    </>
  );
};

export default Custom404ErrorPage;
