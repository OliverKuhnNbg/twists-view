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
  // GUI Timer
  isHiden: boolean;
  guiTimerId: number | null;
  guiTimerController: () => void;
  stopGuiTimer: () => void;
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
  // Logic for image change
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
  // NEW action to control image timer
  startTimer: () => {
    // 1. Stoppe immer einen eventuell bereits laufenden Timer.
    //    That`s the "reset" key.
    if (get().timerId) {
      clearInterval(get().timerId as number);
    }

    const newTimerId = setInterval(() => {
      set((state) => ({
        currentIndex: (state.currentIndex + 1) % state.imageUrls.length,
      }));
    }, 5000); // 5000 ms => 5 sec
    // 3. set new timer ID of Zustand.
    set({ timerId: newTimerId });
  },
  stopTimer: () => {
    if (get().timerId) {
      clearInterval(get().timerId as number);
      set({ timerId: null });
    }
  },

  /** GUI Timer spezifications */
  guiTimerId: null as number | null,
  isHiden: false,
  // NEW action to control GUI timer
  // Diese Aktion wird bei jeder Mausbewegung aufgerufen.
  guiTimerController: () => {
    const { guiTimerId } = get();

    // 1. Zuerst den bestehenden Timer löschen, um ihn zurückzusetzen.
    // Das ist entscheidend, um zu verhindern, dass mehrere Timer gleichzeitig
    // laufen, was zu ineffizientem Verhalten und Memory Leaks führen würde.
    if (guiTimerId) {
      clearInterval(guiTimerId);
    }

    // 2. Das Element sofort als sichtbar markieren.
    set({ isHiden: false });

    // 3. Einen neuen Timer starten, der das Element nach 3 Sekunden ausblendet.
    const newGuiTimerId = setInterval(() => {
      set({ isHiden: true });
    }, 3000);

    // 4. Die ID des neuen Timers im Zustand speichern.
    set({ guiTimerId: newGuiTimerId });
  },
  // Diese Aktion stoppt den Timer vollständig, z.B. wenn die Komponente
  // zerstört wird.
  stopGuiTimer: () => {
    if (get().guiTimerId) {
      clearInterval(get().guiTimerId as number);
      set({ guiTimerId: null });
    }
  },
}));
