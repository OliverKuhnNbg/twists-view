import { usePhotoStore } from '../../store/photoStore';
import './GalleryBackgroundComponent.scss';

export const Gallery = () => {
  // Holt den Zustand bzw. die State-Werte aus dem Store und setzt
  // Über die Werte wir ddas das aktuelle Bild Selektiert.
  // Die Komponente rendert jetzt nur neu, wenn sich dieser Wert ändert.
  const currentImage: string = usePhotoStore(
    (state) => state.imageUrls[state.currentIndex],
  );

  return (
    // background image container
    <div
      className="background-image-container"
      // Das Bild wird als Inline-Style gesetzt, da es sich dynamisch ändert
      style={{ backgroundImage: `url(${currentImage})` }}
    />
  );
};

export default Gallery;
