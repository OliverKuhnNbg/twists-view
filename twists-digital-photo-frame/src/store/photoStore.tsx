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
  // Image Timer
  timerId: number | null;
  startTimer: () => void;
  stopTimer: () => void;
}

// Erstelle den Store mit dem initialen Zustand und den Aktionen
export const usePhotoStore = create<PhotoState>((set, get) => ({
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
  nextImage: () => {
    set((state) => {
      const newIndex = (state.currentIndex + 1) % state.imageUrls.length;
      return { currentIndex: newIndex };
    });
    get().startTimer();
  },
  prevImage: () => {
    set((state) => ({
      // Gehe zum vorherigen Index oder springe zum Ende, wenn der Anfang erreicht ist
      currentIndex:
        (state.currentIndex - 1 + state.imageUrls.length) %
        state.imageUrls.length,
    }));
    get().startTimer();
  },

  /** Image Timer spezifications */
  timerId: null,
  // NEUE Aktionen zur Timer-Steuerung
  startTimer: () => {
    // 1. Stoppe immer einen eventuell bereits laufenden Timer.
    //    Das ist der Schlüssel zum "Zurücksetzen".
    if (get().timerId) {
      console.log('timer cleared- ' + get().timerId);
      clearInterval(get().timerId as number);
    }

    const newTimerId = setInterval(() => {
      set((state) => ({
        currentIndex: (state.currentIndex + 1) % state.imageUrls.length,
      }));
    }, 5000); // 5000 ms => 5 sec
    // 3. Speichere die ID des neuen Timers im Zustand.
    set({ timerId: newTimerId });
  },
  stopTimer: () => {
    if (get().timerId) {
      console.log('timer stoppd - ' + get().timerId);
      clearInterval(get().timerId as number);
      set({ timerId: null });
    }
  },
}));
