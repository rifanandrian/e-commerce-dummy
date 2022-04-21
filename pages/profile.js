import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import profileStyle from '../styles/Profile.module.scss';

export default function Profile() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  console.log(userInfo);

  return (
    <Layout>
      <div className={profileStyle.content}>
        <div className={profileStyle.title}>Profile</div>
        <div className={profileStyle.section}>
          <div className={profileStyle.picture_holder}></div>
          <div className={profileStyle.text_holder}>
            <div className="" id="username">
              {userInfo.username}
            </div>
            <div className="" id="name">
              {userInfo.name}
            </div>
            <div className="" id="email">
              {userInfo.email}
            </div>
            <div className="" id="address">
              {userInfo.address}
            </div>
            <div className="" id="city">
              {userInfo.city}
            </div>
            <div className="" id="country">
              {userInfo.country}
            </div>
            <div className="" id="zip_code">
              {userInfo.zip_code}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
