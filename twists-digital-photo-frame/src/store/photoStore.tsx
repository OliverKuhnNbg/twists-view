import { create } from 'zustand';
import { buildPhotoUrl, fetchPhotoNames } from '../api/photoApi';

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
  isHidden: boolean;
  guiTimerId: number | null;
  guiTimerController: () => void;
  stopGuiTimer: () => void;
  // NEU: Funktion zum Laden der Bilder deklarieren
  loadBackendPhotos: () => Promise<void>;
}

// Erstelle den Store mit dem initialen Zustand und den Aktionen
export const usePhotoStore = create<PhotoState>((set, get) => ({
  // Vorerst eine leere Liste. Wir füllen sie später.
  imageUrls: [],
  currentIndex: 0,
  // Logic for image change
  nextImage: () => {
    set((state) => {
      if (state.imageUrls.length === 0) return state; // Mini-Sicherheitscheck
      const newIndex = (state.currentIndex + 1) % state.imageUrls.length;
      return { currentIndex: newIndex };
    });
    get().startTimer();
  },
  prevImage: () => {
    set((state) => {
      if (state.imageUrls.length === 0) return state; // Mini-Sicherheitscheck
      return {
        currentIndex:
          (state.currentIndex - 1 + state.imageUrls.length) %
          state.imageUrls.length,
      };
    });
    get().startTimer();
  },

  /** Image Timer spezifications */
  timerId: null as number | null,
  // NEW action to control image timer
  startTimer: () => {
    // 1. Stoppe immer einen eventuell bereits laufenden Timer.
    //    That`s the "reset" key.
    if (get().timerId) {
      clearTimeout(get().timerId as number);
    }

    const newTimerId = window.setInterval(() => {
      set((state) => ({
        currentIndex: (state.currentIndex + 1) % state.imageUrls.length,
      }));
    }, 5000); // 5000 ms => 5 sec
    // 3. set new timer ID of Zustand.
    set({ timerId: newTimerId });
  },
  stopTimer: () => {
    if (get().timerId) {
      clearTimeout(get().timerId as number);
      set({ timerId: null });
    }
  },

  /** GUI Timer spezifications */
  guiTimerId: null as number | null,
  isHidden: false,
  // NEW action to control GUI timer
  // Diese Aktion wird bei jeder Mausbewegung aufgerufen.
  guiTimerController: () => {
    const { guiTimerId } = get();

    // 1. Zuerst den bestehenden Timer löschen, um ihn zurückzusetzen.
    // Das ist entscheidend, um zu verhindern, dass mehrere Timer gleichzeitig
    // laufen, was zu ineffizientem Verhalten und Memory Leaks führen würde.
    if (guiTimerId) {
      clearTimeout(guiTimerId);
    }

    // 2. Das Element sofort als sichtbar markieren.
    set({ isHidden: false });

    // 3. Einen neuen Timer starten, der das Element nach 3 Sekunden ausblendet.
    const newGuiTimerId = window.setTimeout(() => {
      set({ isHidden: true });
    }, 3000);

    // 4. Die ID des neuen Timers im Zustand speichern.
    set({ guiTimerId: newGuiTimerId });
  },
  // Diese Aktion stoppt den Timer vollständig, z.B. wenn die Komponente
  // zerstört wird.
  stopGuiTimer: () => {
    if (get().guiTimerId) {
      clearTimeout(get().guiTimerId as number);
      set({ guiTimerId: null });
    }
  },

  // --- NEU: Die Fetch-Logik einbauen ---
  loadBackendPhotos: async () => {
    try {
      console.log('Lade Bilder vom lokalen Spring Boot Backend...');

      // 1. Namen aus der API holen
      const fileNames = await fetchPhotoNames();

      // 2. Namen in fertige URLs umwandeln
      const fullUrls = fileNames.map((fileName) => buildPhotoUrl(fileName));

      // 3. State aktualisieren (SMART UPDATE)
      set((state) => {
        // Welches Bild schaut der Nutzer sich exakt in diesem Moment an?
        const currentImageUrl = state.imageUrls[state.currentIndex];

        // Suchen wir dieses Bild in der frisch geladenen Liste vom Server
        const newIndex = fullUrls.indexOf(currentImageUrl);

        let finalIndex = 0;

        if (newIndex !== -1) {
          // Das Bild existiert noch! Wir springen auf seinen (evtl. neuen) Platz
          finalIndex = newIndex;
        } else if (state.currentIndex < fullUrls.length) {
          // Das Bild wurde gelöscht, aber der alte Index liegt noch im Rahmen
          finalIndex = state.currentIndex;
        } else {
          // Das Bild wurde gelöscht UND die Liste ist jetzt kürzer (Fallback auf 0)
          finalIndex = 0;
        }

        return { imageUrls: fullUrls, currentIndex: finalIndex };
      });

      console.log(`${fullUrls.length} Bilder erfolgreich geladen.`);
    } catch (error) {
      console.error('Fehler beim Abrufen der Bilder:', error);
    }
  },
}));
