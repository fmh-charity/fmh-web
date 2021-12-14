import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';

import useRepository from '../repository';

import styles from './style.module.css';

const ColorButton = withStyles(() => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    alignSelf: 'center',
    color: '#fff',
    width: '70px',
    height: '30px',
    backgroundColor: '#01A19F',
    '&:hover': {
      backgroundColor: '#01A19F',
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  margin: {
    marginTop: '10px'
  },
}));

export const AuthModal = ({
  isOpen = false,
}) => {
  const classes = useStyles();
  const [{ data, error }, methods] = useRepository();

  const logOn = () => {
    methods.login(data);
  }

  const onDataChange = (e) => {
    methods.fillValues({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      open={isOpen}
      hideBackdrop
      disableEnforceFocus
      keepMounted
      disableScrollLock
      disableRestoreFocus
      disableEscapeKeyDown
      disablePortal
      className={styles.modal}
    >
      <form className={styles.form}>
        <TextField 
          onChange={onDataChange}
          value={data.username}
          name="login"
          margin="dense"
          placeholder="example@example.com" 
          label="Логин" 
          variant="outlined" 
        />
        <TextField 
          onChange={onDataChange}
          name="password"
          value={data.password}
          type="password"
          margin="dense"
          label="Пароль" 
          variant="outlined" 
        />
        <ColorButton 
          onClick={logOn}
          variant="contained" 
          color="primary" 
          disableRipple 
          className={classes.margin}>
          Войти
        </ColorButton>
      </form>
    </Modal>
  );
}
