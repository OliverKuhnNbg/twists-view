import { usePhotoStore } from '../store/photoStore';
import { useEffect } from 'react';

export const Gallery = () => {
  // Hole den Zustand und die Aktionen aus dem Store
  const { imageUrls, currentIndex, nextImage } = usePhotoStore();

  // Effekt, um alle 5 Sekunden automatisch zum nächsten Bild zu wechseln
  useEffect(() => {
    // Starte einen Timer
    const timer = setInterval(() => {
      nextImage(); // Rufe die Aktion aus dem Store auf
    }, 5000); // 5000ms = 5 Sekunden

    // Aufräumfunktion: Stoppt den Timer, wenn die Komponente zerstört wird
    return () => clearInterval(timer);
  }, [nextImage]); // Führe den Effekt erneut aus, falls sich `nextImage` ändert

  // Falls keine Bilder vorhanden sind, zeige eine Lade-Meldung
  if (imageUrls.length === 0) {
    return <div>Lade Bilder...</div>;
  }

  // Hole die URL des aktuellen Bildes
  const currentImage = imageUrls[currentIndex];

  return (
    // image container
    <div className="container">
      <img
        src={currentImage}
        alt="Digital Photo Frame"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default Gallery;
