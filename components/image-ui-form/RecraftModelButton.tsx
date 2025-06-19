'use client';

import { useState } from 'react';
import useRecraftModalStore from '@/store/form/useRecraftModalStore';

import useRecraftModelsList from '@/hooks/translation/useRecraftModelsList';

import ButtonWithInteract from './ButtonWithInteract';
import RecraftModelDialog from './RecraftModelDialog';

export default function RecraftModelButton() {
  const recraftModelsList = useRecraftModelsList();
  const selectedModalId = useRecraftModalStore((state) => state.selectedModalId);
  const setSelectedModalId = useRecraftModalStore((state) => state.setSelectedModalId);

  const [open, setOpen] = useState(false);

  const modelName = recraftModelsList.find((item) => item.id === selectedModalId)?.name;

  const onChooseModel = (id: string) => {
    setSelectedModalId(id);
    setOpen(false);
  };

  return (
    <>
      <ButtonWithInteract value={modelName || ''} onClick={() => setOpen(true)} />
      <RecraftModelDialog open={open} setOpen={setOpen} onClick={onChooseModel} />
    </>
  );
}
