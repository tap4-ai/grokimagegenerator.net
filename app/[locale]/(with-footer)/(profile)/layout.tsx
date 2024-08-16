import Sider from './components/Sider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative mx-auto flex w-full max-w-pc gap-2 px-3 lg:px-0 lg:py-5'>
      <Sider />
      {children}
    </div>
  );
}
