import React from 'react';

import { getCookie } from '../../cookie-service';

import styles from './heed-auth.module.css';

export const NeedAuth = () => {
  const onClick = () => {
    window.location.replace('/login');
  };

  return !getCookie('accessToken') ? (
    <div className={`${styles['auth-required']}`}>
      <button 
        onClick={onClick}
        className={styles['auth-btn']}
      >
        Авторизация
      </button>
    </div>
  ) : null;
};
