import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import React from 'react';

interface AlertSnackbarProps {
  open: boolean;
  onClose: (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => void;
  severity: Color;
  children?: React.ReactNode;
}

export default function AlertSnackbar({
  open,
  onClose,
  severity,
  children,
}: AlertSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
