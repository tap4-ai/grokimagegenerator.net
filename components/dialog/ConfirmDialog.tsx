'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import BaseDialog from './BaseDialog';

export default function ConfirmDialog({
  disabled = false,
  open,
  setOpen,
  callback,
  titleText,
  cancelText,
  confirmText,
  children,
  cancelBtnClassName,
  okBtnClassName,
}: {
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: Function;
  titleText?: string;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
  cancelBtnClassName?: string;
  okBtnClassName?: string;
}) {
  const t = useTranslations('components.confirmDialog');

  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOk = async () => {
    setLoading(true);
    try {
      await callback();
      setOpen(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      disabled={disabled}
      loading={loading}
      title={titleText || t('title')}
      cancelText={cancelText || t('cancel')}
      cancelBtnClassName={cancelBtnClassName}
      onClose={onClose}
      okText={confirmText || t('confirm')}
      onOk={onOk}
      okBtnClassName={okBtnClassName}
    >
      {children}
    </BaseDialog>
  );
}
