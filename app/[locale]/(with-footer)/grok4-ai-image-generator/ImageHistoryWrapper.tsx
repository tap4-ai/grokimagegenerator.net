'use client';

import { useGrok4AIImageStore } from '@/store/useGrok4AIImageStore';
import { useShallow } from 'zustand/react/shallow';

import ImageHistory from '@/components/common/ImageHistory';

export default function ImageHistoryWrapper({ className }: { className?: string }) {
  const { history } = useGrok4AIImageStore(useShallow((state) => ({ history: state.history })));
  const sortedHistory = history.sort((a, b) => b.createTimestamp - a.createTimestamp);
  const historyItems = sortedHistory.map((item) => {
    return {
      id: item.key,
      prompt: item.prompt,
      timestamp: new Date(item.createTimestamp).toLocaleString(),
      imageUrl: item.imageUrl || '',
      isGenerating: item.status === 'await',
    };
  });
  return <ImageHistory className={className} historyItems={historyItems} />;
}
