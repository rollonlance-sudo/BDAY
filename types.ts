
export interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  quote: string;
}

export interface Horoscope {
  prediction: string;
  luckyNumber: string;
  luckyColor: string;
  mood: string;
}
