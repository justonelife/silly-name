export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <div className="bg-red h-svh w-screen">{children}</div>
    </div>
  );
}
