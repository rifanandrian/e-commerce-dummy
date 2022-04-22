import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import profileStyle from '../styles/Profile.module.scss';

export default function Profile() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    setUser(userInfo);
  }, [router, userInfo]);

  return (
    <Layout>
      <div className={profileStyle.content}>
        <div className={profileStyle.title}>Profile</div>
        <div className={profileStyle.section}>
          <div className={profileStyle.picture_holder}>
            <div className={profileStyle.picture}></div>
          </div>
          <div className={profileStyle.text_holder}>
            <div className="" id="username">
              {user.username}
            </div>
            <div className="" id="name">
              {user.name}
            </div>
            <div className="" id="email">
              {user.email}
            </div>
            <div className="" id="address">
              {user.address}
            </div>
            <div className="" id="city">
              {user.city}
            </div>
            <div className="" id="country">
              {user.country}
            </div>
            <div className="" id="zip_code">
              {user.zip_code}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
