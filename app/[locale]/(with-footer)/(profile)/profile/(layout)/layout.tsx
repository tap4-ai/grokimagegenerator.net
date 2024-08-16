export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='max-w-full flex-1 rounded-xl bg-card-black p-2'>{children}</div>;
}
