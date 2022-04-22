import jsCookie from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { Store } from '../utils/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faCartShopping,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [cartItems, setCartItems] = useState([]);
  const [userInformation, setUserInformation] = useState();
  const [display, setDisplay] = useState('none');
  const [sidbarVisible, setSidebarVisible] = useState(false);
  const [query, setQuery] = useState('');

  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    router.push('/');
  };

  function toogleDropdown() {
    if (display == 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }

  const sidebarOpenHandler = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitSearchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?search=${query}`);
  };

  useEffect(() => {
    setCartItems(cart.cartItems);
    setUserInformation(userInfo);
  }, [cart.cartItems, userInfo]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{title ? `${title}` : 'E-Commerence dummy'}</title>
          {description && (
            <meta name="description" content={description}></meta>
          )}
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat&display=optional"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <div className={styles.header_text}>
            <FontAwesomeIcon
              onClick={sidebarOpenHandler}
              className={styles.menu_icon}
              icon={faBars}
            />{' '}
            <NextLink href="/" passHref>
              <div>E-Commerce</div>
            </NextLink>
          </div>

          <div className={styles.search}>
            <input
              onChange={queryChangeHandler}
              placeholder="Search products"
              type="text"
            />
            <button onClick={(e) => submitSearchHandler(e)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
            </button>
          </div>
          <div>
            <NextLink href="/cart" passHref>
              <div className={styles.badge_container}>
                <FontAwesomeIcon
                  className={styles.cart_icon}
                  icon={faCartShopping}
                />
                {cartItems.length !== 0 ? (
                  <span className={styles.badge}>{cartItems.length}</span>
                ) : (
                  ''
                )}
              </div>
            </NextLink>
            {userInformation ? (
              <div className={styles.custom_dropdown}>
                <div className={styles.dropdown_input} onClick={toogleDropdown}>
                  <FontAwesomeIcon
                    className={styles.avatar_icon}
                    icon={faUser}
                  />{' '}
                </div>
                <div
                  className={styles.dropdown_option}
                  style={{ display: display }}
                >
                  <div className={styles.list_option}>
                    <NextLink href="/profile" passHref>
                      Profile
                    </NextLink>
                  </div>
                  <div className={styles.list_option}>
                    <NextLink href="/order-history" passHref>
                      Order History
                    </NextLink>
                  </div>
                  <div
                    className={styles.list_option}
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <NextLink href="/login" passHref>
                <div className={styles.login_text}>Login</div>
              </NextLink>
            )}
          </div>
        </header>
        <Drawer
          open={sidbarVisible}
          onClose={sidebarOpenHandler}
          direction="left"
          size={250}
        >
          <div className={styles.drawer_content}>
            <div className={styles.drawer_head}>
              <NextLink href="/" passHref>
                <div>E-Commerce</div>
              </NextLink>
            </div>
            {userInformation ? (
              <div className={styles.drawer_body}>
                <div className="">
                  <div className={styles.drawer_profile}>
                    <NextLink href="/profile" passHref>
                      <div>Profile</div>
                    </NextLink>
                  </div>
                  <div className={styles.drawer_history}>
                    <NextLink href="/order-history" passHref>
                      <div>Order History</div>
                    </NextLink>
                  </div>
                </div>
                <div
                  className={styles.drawer_logout}
                  onClick={logoutClickHandler}
                >
                  Logout{' '}
                  <FontAwesomeIcon
                    className={styles.icon_logout}
                    icon={faPowerOff}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.drawer_body}>
                <div className="">
                  <div className={styles.drawer_profile}>
                    <NextLink href="/login" passHref>
                      <div>Login</div>
                    </NextLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Drawer>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.text_footer}>
            All rights reserved. E-commerce dummy.
          </div>
        </footer>
      </div>
    </>
  );
}
