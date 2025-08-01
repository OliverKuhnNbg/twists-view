import { usePhotoStore } from '../../store/photoStore';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

interface PagingButtonProps {
  direction: string;
}

// 2. Die Komponente empfängt nun die Props 'direction' und 'text'
export const PagingButton: React.FC<PagingButtonProps> = ({ direction }) => {
  // get function from store
  const { nextImage } = usePhotoStore();

  const handleClick = () => {
    nextImage();
  };

  const circleDimensions = { width: '60px', height: '60px' };
  const btnText = direction === 'left' ? 'Next Image' : 'Prev Image';

  return (
    <button
      className="btn btn-primary btn-lg position-absolute end-0 rounded-circle d-flex align-items-center justify-content-center"
      style={circleDimensions}
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default PagingButton;
