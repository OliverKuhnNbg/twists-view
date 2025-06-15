import { create } from 'zustand';

// Definiere die Struktur des States und der Aktionen
interface PhotoState {
  // Eine Liste mit den Pfaden zu den lokalen Bildern
  imageUrls: string[];
  // Der Index des aktuell angezeigten Bildes in der Liste
  currentIndex: number;
  // Aktion, um zum nächsten Bild zu wechseln
  nextImage: () => void;
  // Aktion, um zum vorherigen Bild zu wechseln
  prevImage: () => void;
}

// Erstelle den Store mit dem initialen Zustand und den Aktionen
export const usePhotoStore = create<PhotoState>((set) => ({
  // Vorerst eine leere Liste. Wir füllen sie später.
  imageUrls: [
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png',
    '/images/image4.png',
    '/images/image5.png',
    '/images/image6.png',
  ],
  currentIndex: 0,

  // Die Logik für den Bildwechsel
  nextImage: () =>
    set((state) => ({
      // Gehe zum nächsten Index oder springe zum Anfang, wenn das Ende erreicht ist
      currentIndex: (state.currentIndex + 1) % state.imageUrls.length,
    })),

  prevImage: () =>
    set((state) => ({
      // Gehe zum vorherigen Index oder springe zum Ende, wenn der Anfang erreicht ist
      currentIndex:
        (state.currentIndex - 1 + state.imageUrls.length) %
        state.imageUrls.length,
    })),
}));
