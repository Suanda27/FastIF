import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1C56] leading-tight">
              FASILITAS SURAT INFORMATIKA
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Kelola pengajuan dan status surat mahasiswa dengan cepat, mudah, dan terintegrasi..
            </p>
            <Link
              href="/login"
              className="inline-block bg-[#0A1C56] hover:bg-[#00aeff] text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Masuk
            </Link>
          </div>

          <div className="flex justify-center">
            <Image
              src="/banner-homepage.png"
              alt="FastIF Banner"
              width={600}
              height={450}
              className="w-full h-auto max-w-lg rounded-lg"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
