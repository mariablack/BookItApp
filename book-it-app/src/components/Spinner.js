import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '80px !important',
    width: '80px !important',
  },
  spinner: {
    display: 'block',
    margin: '10% auto',
    maxWidth: '1500px',
    textAlign: 'center',
  },
});

export default function CircularIndeterminate() {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress className={classes.root} color="primary" />
    </div>
  );
}
