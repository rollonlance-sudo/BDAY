
import React, { useState, useEffect, useRef } from 'react';
import { Icons, COLORS } from './constants';
import { Wish, GalleryItem, Horoscope } from './types';
import { fetchHoroscope, generateGalleryQuotes } from './services/geminiService';

const HeroSection: React.FC = () => {
  const [letters, setLetters] = useState<Array<{ id: number; char: string; left: string; delay: string }>>([]);

  useEffect(() => {
    const chars = "MY LOVE ❤️ 🌸 💜 🌌 ✨".split("");
    const newLetters = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`
    }));
    setLetters(newLetters);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden watercolor-bg">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-20 left-20"><Icons.Constellation /></div>
        <div className="absolute bottom-40 right-40 rotate-45 scale-150"><Icons.Constellation /></div>
        <div className="absolute top-1/2 left-1/3 rotate-90 opacity-20"><Icons.Constellation /></div>
      </div>

      {letters.map((l) => (
        <div 
          key={l.id} 
          className="floating-letter text-purple-300 font-cursive text-2xl" 
          style={{ left: l.left, animationDelay: l.delay }}
        >
          {l.char}
        </div>
      ))}

      <div className="relative z-10 text-center px-4">
        <h1 className="font-header text-5xl md:text-7xl lg:text-9xl text-purple-800 mb-6 drop-shadow-sm leading-tight">
          Happy Birthday, <br />
          <span className="italic">My Brilliant Aquarius Star!</span>
        </h1>
        <p className="text-xl md:text-3xl text-purple-600 font-cursive max-w-2xl mx-auto">
          To the girl who carries the galaxy in her eyes...
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce text-pink-400">
        <Icons.Flower />
      </div>
    </section>
  );
};

const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="py-24 bg-white flex justify-center px-6">
      <div 
        className={`relative w-full max-w-lg cursor-pointer transition-all duration-700 transform ${isOpen ? 'scale-105' : 'hover:scale-102'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-[#FFF9F2] p-8 md:p-12 shadow-2xl border border-orange-100 rounded-lg relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center">
          {!isOpen ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center shadow-lg mb-4 text-white hover:animate-pulse">
                ❤️
              </div>
              <h3 className="font-header text-2xl text-orange-900 mb-2">A Private Note for Your 24th</h3>
              <p className="text-gray-400 font-cursive text-lg">Click to open the seal, baby</p>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500 text-left w-full">
              <h3 className="font-cursive text-4xl text-pink-600 mb-6 italic">Hi baby...</h3>
              <div className="text-gray-700 leading-relaxed font-serif text-lg space-y-4">
                <p>
                  Happy 24th Birthday! I hope you really enjoy your special day today with your family. I'm wishing you so many more birthdays to come, but most of all, I wish for your continuous good health.
                </p>
                <p>
                  I know how much you've been working towards your goals, and I truly hope you achieve that dream physique you've been wanting—to finally wear all those "bet" outfits you've been eyeing! I hope you reach that point where you're not feeling bloated anymore so you can just be happy and confident every day. 
                </p>
                <p>
                  I know you'll achieve those "Barbie arms" soon! Just remember that I'm here to support you in every goal you have, no matter how big or small. You're already perfect to me, but I'll always be your #1 cheerleader.
                </p>
                <p className="font-cursive text-3xl text-purple-500 pt-4 text-center">I love you so much! Happy Birthday!</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 right-4 opacity-10">
            <Icons.Constellation />
          </div>
        </div>
      </div>
    </section>
  );
};

const Countdown: React.FC = () => {
  const targetDate = new Date('February 9, 2026 00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="font-header text-2xl text-purple-400 uppercase tracking-widest mb-8">Until Your Next Big Day</h2>
      <div className="flex justify-center gap-4 md:gap-8">
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Minutes', value: minutes },
          { label: 'Seconds', value: seconds },
        ].map((item) => (
          <div key={item.label} className="w-20 md:w-32 py-4 rounded-3xl bg-pink-50 border border-pink-100 shadow-sm transition-transform hover:scale-105">
            <div className="text-3xl md:text-5xl font-header text-purple-600">{item.value}</div>
            <div className="text-xs uppercase text-pink-400 font-bold">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initData = async () => {
      // Fetch horoscope first
      const h = await fetchHoroscope();
      setHoroscope(h);

      // Batch fetch quotes to prevent 429 errors
      const topics = ['romance', 'intellect', 'stars', 'love', 'flowers', 'destiny'];
      const quotes = await generateGalleryQuotes(topics);
      
      const items: GalleryItem[] = topics.map((topic, i) => ({
        id: i.toString(),
        url: `https://picsum.photos/seed/aquarius-love-${i}/600/800`,
        quote: quotes[i] || "You are breathtakingly brilliant."
      }));
      setGallery(items);

      setWishes([
        { id: '1', name: 'Me (Your Guy)', message: 'You are the absolute light of my life. I love your brilliant mind and your beautiful heart. Happy Birthday, baby!', date: 'Today', color: 'bg-pink-100' },
        { id: '2', name: 'Bestie', message: 'HBD to the girl who keeps us all sane with her wisdom!', date: 'Feb 9', color: 'bg-purple-50' },
      ]);
    };
    initData();
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestMessage) return;
    const colors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-yellow-50'];
    const newWish: Wish = {
      id: Date.now().toString(),
      name: guestName,
      message: guestMessage,
      date: 'Just now',
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setWishes([newWish, ...wishes]);
    setGuestName('');
    setGuestMessage('');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser."));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen selection:bg-pink-200">
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />
      
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-pink-100 hover:scale-110 transition-transform flex items-center gap-2"
      >
        <span className="text-pink-600">{isPlaying ? '🔊' : '🔇'}</span>
        <span className="text-sm font-header text-pink-600 hidden md:block">
          {isPlaying ? 'Romantic Piano' : 'Play Music'}
        </span>
      </button>

      <HeroSection />
      <LoveLetter />
      <Countdown />

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 bg-pink-50/30 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-pink-200 opacity-40"><Icons.Constellation /></div>
            <img 
              src="https://picsum.photos/seed/aquarius-girl/600/600" 
              alt="My Girl" 
              className="rounded-full border-8 border-white shadow-2xl transition-transform hover:scale-105"
            />
            <div className="absolute -bottom-6 -right-6 p-6 bg-white rounded-2xl shadow-xl max-w-xs border border-pink-100">
              <h4 className="font-header text-pink-600 mb-2">My Radiant One</h4>
              <p className="text-sm text-gray-500 italic">"The most intelligent and beautiful soul I've ever known."</p>
            </div>
          </div>
          <div>
            <h2 className="font-header text-4xl md:text-6xl text-purple-800 mb-8">Why You're My Star</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <div className="flex gap-4 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">💜</span>
                <p><strong>Independent:</strong> You follow your own compass, and I'm so proud to walk beside you.</p>
              </div>
              <div className="flex gap-4 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">🌌</span>
                <p><strong>Intelligent:</strong> Your mind is a brilliant landscape I love exploring every single day.</p>
              </div>
              <div className="flex gap-4 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">🌸</span>
                <p><strong>Creative:</strong> You make life more colorful just by being in it.</p>
              </div>
              <div className="flex gap-4 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">🕊️</span>
                <p><strong>Warm:</strong> Behind that smart Aquarius edge is the kindest heart in the world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {horoscope && (
        <section className="py-16 px-6 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-4xl mx-auto text-center border-2 border-dashed border-pink-200 p-8 md:p-16 rounded-[3rem] relative overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Icons.Constellation /></div>
            <h2 className="font-header text-3xl text-pink-700 mb-6">Birthday Love Horoscope</h2>
            <p className="text-xl italic text-gray-700 mb-8 font-serif leading-relaxed">
              "{horoscope.prediction}"
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-pink-400 text-xs uppercase tracking-widest font-bold">Lucky Color</div>
                <div className="text-lg font-header text-pink-800">{horoscope.luckyColor}</div>
              </div>
              <div className="text-center">
                <div className="text-pink-400 text-xs uppercase tracking-widest font-bold">Lucky Number</div>
                <div className="text-lg font-header text-pink-800">{horoscope.luckyNumber}</div>
              </div>
              <div className="text-center">
                <div className="text-pink-400 text-xs uppercase tracking-widest font-bold">Current Mood</div>
                <div className="text-lg font-header text-pink-800">{horoscope.mood}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <h2 className="font-header text-4xl text-center text-purple-800 mb-16 italic">Moments with My Favorite Girl</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {gallery.map((item) => (
            <div key={item.id} className="group relative">
              <div className="relative overflow-hidden rounded-2xl border-4 border-pink-50 shadow-md">
                <img 
                  src={item.url} 
                  alt="Gallery" 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-center">
                  <p className="text-white font-cursive text-2xl drop-shadow-md w-full">
                    {item.quote}
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border border-pink-100 z-10 group-hover:rotate-12 transition-transform text-pink-400">
                <Icons.Flower />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites */}
      <section className="py-24 bg-pink-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-header text-4xl text-center text-purple-800 mb-16 italic underline decoration-pink-300">The Things You Love</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'Books & Manga', icon: '📚' },
              { name: 'Video Games', icon: '🎮' },
              { name: 'Pretty Stationery', icon: '✉️' },
              { name: 'Handwritten Letters', icon: '🖋️' },
              { name: 'The Moon', icon: '🌙' },
              { name: 'Good Food', icon: '🍰' },
              { name: 'Spoiling Loved Ones', icon: '🎁' },
              { name: 'Starry Nights', icon: '🌌' },
              { name: 'Warm Hugs', icon: '🫂' }
            ].map((fav) => (
              <div key={fav.name} className="bg-white p-8 rounded-[2rem] text-center shadow-sm border border-pink-100 transition-all hover:-translate-y-2 hover:shadow-md group">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{fav.icon}</div>
                <div className="font-header text-purple-700">{fav.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes Wall */}
      <section className="py-24 px-6 md:px-12 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-header text-4xl text-purple-800 mb-4 italic">Our Shared Notes</h2>
            <p className="text-gray-500 font-cursive text-xl">Heartfelt messages for my beautiful star.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {wishes.map((wish) => (
              <div key={wish.id} className={`${wish.color} p-8 rounded-tr-[3rem] shadow-sm border border-gray-100 relative group hover:shadow-lg transition-all`}>
                <div className="absolute top-4 right-4 text-pink-300 opacity-50"><Icons.Flower /></div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{wish.message}"</p>
                <div className="mt-auto border-t border-gray-200/50 pt-4 flex justify-between items-center">
                  <span className="font-header text-purple-600">{wish.name}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-tighter">{wish.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-pink-50 p-10 md:p-16 rounded-[4rem] border-4 border-white shadow-xl relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400">
              <Icons.Flower />
            </div>
            <h3 className="font-header text-2xl text-center text-purple-800 mb-8">Add a Memory</h3>
            <form onSubmit={handleAddWish} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name" 
                  className="w-full bg-white/80 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-pink-200 outline-none transition-all placeholder:text-gray-300"
                  required
                />
              </div>
              <div>
                <textarea 
                  rows={4}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Tell her something beautiful..." 
                  className="w-full bg-white/80 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-pink-200 outline-none transition-all placeholder:text-gray-300"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-pink-500 text-white font-header text-lg py-4 rounded-2xl hover:bg-pink-600 transition-colors shadow-lg"
              >
                Send to Her Heart
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-purple-900 text-white text-center">
        <div className="mb-6 flex justify-center gap-4">
          <Icons.Star /><Icons.Star /><Icons.Star />
        </div>
        <p className="font-header text-2xl mb-2 italic">For My Dearest Aquarius Star</p>
        <p className="text-pink-300 font-cursive text-xl">Always yours, forever brilliant.</p>
        <div className="mt-8 text-xs text-pink-400/50 uppercase tracking-widest">
          A Celebration of Your Unique Magic
        </div>
      </footer>
    </div>
  );
};

export default App;
