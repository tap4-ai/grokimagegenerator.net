export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <div className='mx-auto max-w-pc'>{children}</div>
    </div>
  );
}
