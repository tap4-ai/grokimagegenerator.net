'use client';

import { useEffect } from 'react';
import type { ChatStatus, Message as MessageType, OnMessageSubmit, OnReferImage } from '@/network/image/client';
// import type { ChatState } from '@/store/chat/use-chat-store';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import useScrollToBottom from '@/hooks/use-scroll-to-bottom';

import Message from './message';
import MessageLoading from './message-loading';
import PromptList from './prompt-list';

export default function MessageList({
  // chatId,
  status,
  messages,
  // setMessages,
  onReferImage,
  onSubmit,
  className,
}: {
  // chatId: string;
  status: ChatStatus;
  messages: MessageType[];
  // setMessages: ChatState['setMessages'];
  onReferImage: OnReferImage;
  onSubmit: OnMessageSubmit;
  className?: string;
}) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  useEffect(() => {
    if (messages.length > 0) {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages.length, messagesContainerRef]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (messages.length > 0 && messagesContainerRef.current) {
      timer = setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current?.scrollHeight,
          behavior: 'auto',
        });
      }, 16);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={messagesContainerRef}
      className={cn('flex w-full flex-col gap-2 ', messages.length === 0 && 'items-center justify-center', className)}
    >
      {messages.length === 0 && (
        <PromptList
          // chatId={chatId}
          onSubmit={({ prompt, multiImages }) => onSubmit({ prompt, multiImages, model: '', ratio: '1:1' })}
        />
      )}
      {messages.map((message, idx) => (
        <Message
          lastIndex={messages.length - 1}
          // chatId={chatId}
          key={message.id}
          // status={status}
          index={idx}
          message={message}
          // setMessage={setMessages}
          onReferImage={onReferImage}
          // onSubmit={onSubmit}
        />
      ))}
      {status === 'submitted' && messages.length > 0 && <MessageLoading />}
      <motion.div
        ref={messagesEndRef}
        className={cn('min-h-[24px] min-w-[24px] shrink-0', status === 'ready' && 'hidden')}
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
}
