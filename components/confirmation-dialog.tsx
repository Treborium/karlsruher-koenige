import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@material-ui/core';

export interface ConfirmationDialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onClickCancel: React.MouseEventHandler<any>;
  onClickConfirm: React.MouseEventHandler<any>;
  open: boolean;
  setInput: any;
  children?: React.ReactNode;
}

export default function ConfirmationDialog({
  onClose,
  open,
  onClickCancel,
  onClickConfirm,
  setInput,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Kasten Registrierung</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hiermit registrierst du verbindlich, dass du einen Kasten zum nächsten
          Training mitbringst. Dein Name wird unten auf der Seite angezeigt:
        </DialogContentText>
        <Input
          autoFocus
          placeholder='Dein Name'
          margin='dense'
          id='name'
          type='text'
          fullWidth
          onChange={(event) => setInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCancel} color='primary'>
          Abbruch
        </Button>
        <Button onClick={onClickConfirm} color='primary'>
          Abschicken
        </Button>
      </DialogActions>
    </Dialog>
  );
}
