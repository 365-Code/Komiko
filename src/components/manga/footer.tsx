import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-fit bg-gray-100 text-gray-600">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/komiko.jpg" 
                alt="KOMIKO Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-gray-800">KOMIKO</span>
            </Link>
          </div>
          <p className="text-sm">
            Your gateway to the world of manga, manhwa, and manhua. Discover,
            read, and immerse yourself in captivating stories and artwork from
            around the globe.
          </p>
        </div>
        <div className="border-t border-gray-200 py-4">
          <p className="text-center text-sm">
            &copy; 2024 KOMIKO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
