import Image from 'next/image';
import Link from 'next/link';
export default function AppLogo(): React.ReactNode {
  return (
    <Link href='/' className='flex gap-2'>
      <Image src="logo-light.svg" alt="app-logo" width={24} height={24}></Image>
      <h1 className='uppercase text-lg font-bold text-white'>labubu nft</h1>
    </Link>
  )
}
