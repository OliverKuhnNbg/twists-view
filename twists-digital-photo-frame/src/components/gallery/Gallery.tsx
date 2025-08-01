import { usePhotoStore } from '../../store/photoStore';
import { useEffect } from 'react';

export const Gallery = () => {
  // Hole den Zustand und die Aktionen aus dem Store
  // 1. Selektiere nur die State-Werte, die für die Anzeige nötig sind.
  // Die Komponente rendert jetzt nur neu, wenn sich einer dieser Werte ändert.
  const imageUrls = usePhotoStore((state) => state.imageUrls);
  const currentIndex = usePhotoStore((state) => state.currentIndex);

  // 2. Hole die Aktionen separat. Da sie sich nie ändern, verursachen sie keine Re-Renders.
  // Die Komponente rendert NICHT neu, wenn sich einer dieser Werte ändert.
  const { startTimer, stopTimer } = usePhotoStore.getState();

  // Effekt, um alle 5 Sekunden automatisch zum nächsten Bild zu wechseln
  useEffect(() => {
    startTimer();

    // Die Aufräumfunktion ist SEHR WICHTIG!
    // Sie wird aufgerufen, wenn die Komponente zerstört wird.
    return () => {
      // Stoppe den Timer, um Speicherlecks und Fehler zu vermeiden.
      stopTimer();
    };
  }, [startTimer, stopTimer]); // Führe den Effekt erneut aus, falls sich `nextImage` ändert

  // Falls keine Bilder vorhanden sind, zeige eine Lade-Meldung
  if (imageUrls.length === 0) {
    return <div>Lade Bilder...</div>;
  }

  // Hole die URL des aktuellen Bildes
  const currentImage = imageUrls[currentIndex];

  return (
    // image container
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
      <img
        /** key={currentImage} // funzt an der Stelle nicht führt zu Jumping beim laden der Seite */
        src={currentImage}
        alt="Digital Photo Frame"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default Gallery;
