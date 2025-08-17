import PagingButton from '../gallery-paging-button/PagingButton';

interface SwitchAreaProps {
  isHiden: boolean;
}

function SwitchArea({ isHiden }: SwitchAreaProps) {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center pe-none">
      {/* The pe-auto class ensures that the buttons inside this container are clickable,
          while the parent container (with pe-none) does not capture mouse events. */}
      <div className={`${isHiden ? 'd-none' : 'd-flex'} pe-auto`}>
        <PagingButton direction="right" />
        <PagingButton direction="left" />
      </div>
    </div>
  );
}

export default SwitchArea;
