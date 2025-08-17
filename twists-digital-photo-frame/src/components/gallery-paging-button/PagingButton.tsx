import type { ReactNode } from 'react';
import { usePhotoStore } from '../../store/photoStore';

import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

// TODO: Erstelle auch eine SCSS-Datei für das Styling der Punkte
// import './PagingButton.scss';

interface PagingButtonProps {
  direction: string;
}

// 2. Die Komponente empfängt nun die Props 'direction' und 'text'
export const PagingButton: React.FC<PagingButtonProps> = ({ direction }) => {
  /* load functions from store **/
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
  const circleDimensions: object = { width: '60px', height: '60px' };
  // btn text
  //const btnText: string = direction === 'left' ? 'Prev Image' : 'Next Image';
  const btnIcon: ReactNode =
    direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />;
  // btn align
  const leftDirCss: string =
    'btn btn-primary btn-lg position-absolute start-0 rounded-circle d-flex align-items-center justify-content-center';
  const rightDirCss: string =
    'btn btn-primary btn-lg position-absolute end-0 rounded-circle d-flex align-items-center justify-content-center';
  const btnCss: string = direction === 'left' ? leftDirCss : rightDirCss;

  return (
    <button className={btnCss} style={circleDimensions} onClick={handleClick}>
      {btnIcon}
    </button>
  );
};

export default PagingButton;
