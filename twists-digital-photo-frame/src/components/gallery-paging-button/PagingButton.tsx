import { usePhotoStore } from '../../store/photoStore';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

export const PagingButton = () => {
  // get function from store
  const { nextImage } = usePhotoStore();

  const handleClick = () => {
    nextImage();
  };

  const circleDimensions = { width: '60px', height: '60px' };

  return (
    <button
      className="btn btn-primary btn-lg position-absolute end-0 rounded-circle d-flex align-items-center justify-content-center"
      style={circleDimensions}
      onClick={handleClick}
    >
      Next Image
    </button>
  );
};

export default PagingButton;
