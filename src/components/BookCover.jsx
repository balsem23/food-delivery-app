export default function BookCover() {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        src="/videos/intro.mp4"
      />
      <div className="relative z-10 text-center text-white p-8">
        <h1 className="text-5xl font-serif font-bold text-yellow-400">🍕 Welcome to Pizzza</h1>
        <p className="mt-4 text-xl italic">Swipe or tap to explore our menu</p>
      </div>
    </div>
  );
}
