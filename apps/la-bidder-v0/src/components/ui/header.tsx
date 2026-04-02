import AppLogo from "@/components/ui/app-logo";
import Link from "next/link";

export default function Header(): React.ReactNode {
  return (
    <div className="flex gap-2 justify-between p-2">
      <AppLogo></AppLogo>
      <nav className="w-[552px] flex justify-around font-bold text-lg capitalize text-white">
        <Link href='/'>market</Link>
        <Link href='/'>features</Link>
        <Link href='/'>community</Link>
      </nav>
    </div>
  )
}
