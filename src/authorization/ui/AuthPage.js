import React from 'react';

import { AuthModal } from './AuthModal';

import styles from './style.module.css';

export const AuthPage = () => {
  return (
    <div className={styles['auth-page']}>
      <AuthModal isOpen={true} />
    </div>
  );
};
