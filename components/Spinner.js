import React from 'react';
import spinnerStyles from '../styles/Spinner.module.scss';

export default function Spinner() {
  return (
    <>
      <div className={spinnerStyles.spinner}>
        <div className={spinnerStyles.half_spinner}></div>
      </div>
    </>
  );
}
