import Image from "next/image";

// app/components/Footer.tsx (or use in pages/_app.tsx layout)
export default function Footer() {
  return (
    <footer className="bg-[#f3f2ed] border-t border-gray-300">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        {/* Left Menu */}
        <div>
          <ul className=" text-left text-lg font-semibold text-black">
            <li className="text-[32px] cursor-pointer uppercase font-bold">Home</li>
            <li className="text-[32px] cursor-pointer uppercase font-bold">Events</li>
            <li className="text-[32px] cursor-pointer uppercase font-bold">Shop</li>
            <li className="text-[32px] cursor-pointer uppercase font-bold">Blog</li>
            <li className="text-[32px] cursor-pointer uppercase font-bold">Exhibits</li>
            <li className="text-[32px] cursor-pointer uppercase font-bold">Get Tickets</li>
          </ul>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-end">
          <div className="relative rounded-xl overflow-hidden shadow-lg ">
            <Image
              src={"/images/HomePage/footer.png"}
              alt="Concert crowd"
              height={270}
              width={520}
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white font-bold text-lg">Tune Into Creativity</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
