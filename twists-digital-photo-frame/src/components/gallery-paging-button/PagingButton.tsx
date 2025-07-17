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
    <button
      className="btn btn-primary btn-lg position-absolute end-0"
      onClick={handleClick}
    >
      Next Image
    </button>
  );
};

export default PagingButton;
