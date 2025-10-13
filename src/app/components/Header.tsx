import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#0A1C56] py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-fastif-white.png"
            alt="FastIF Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
