// src/components/PagingButton.tsx

import { usePhotoStore } from '../../store/photoStore';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

export const PagingButton = () => {
  // Hole die nötigen Daten und die NEUE Funktion aus dem Store
  const { nextImage } = usePhotoStore();

  const handleClick = () => {
    nextImage();
  };

  return (
    <button className="btn btn-primary btn-lg ms-2" onClick={handleClick}>
      Zähler veringern
    </button>
  );
};

export default PagingButton;
