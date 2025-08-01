import { usePhotoStore } from '../../store/photoStore';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

interface PagingButtonProps {
  direction: string;
}

// 2. Die Komponente empfängt nun die Props 'direction' und 'text'
export const PagingButton: React.FC<PagingButtonProps> = ({ direction }) => {
  // get function from store
  const { nextImage, prevImage } = usePhotoStore();

  /* onClick()-Handler **/
  const handleClick: () => void = () => {
    if (direction === 'left') {
      prevImage();
    } else {
      nextImage();
    }
  };

  /* Btn Appearance **/
  // btn size
  const circleDimensions = { width: '60px', height: '60px' };
  // btn text
  const btnText = direction === 'left' ? 'Prev Image' : 'Next Image';
  // btn align
  const leftDir: string =
    'btn btn-primary btn-lg position-absolute start-0 rounded-circle d-flex align-items-center justify-content-center';
  const rightDir: string =
    'btn btn-primary btn-lg position-absolute end-0 rounded-circle d-flex align-items-center justify-content-center';
  const btnCss = direction === 'left' ? leftDir : rightDir;

  return (
    <button className={btnCss} style={circleDimensions} onClick={handleClick}>
      {btnText}
    </button>
  );
};

export default PagingButton;
