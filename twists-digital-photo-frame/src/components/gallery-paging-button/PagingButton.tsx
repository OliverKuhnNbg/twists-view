import { usePhotoStore } from '../../store/photoStore';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

export const PagingButton = () => {
  // get function from store
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
