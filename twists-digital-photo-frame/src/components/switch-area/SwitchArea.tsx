import PagingButton from '../gallery-paging-button/PagingButton';

function SwitchArea() {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
      <PagingButton />
    </div>
  );
}

export default SwitchArea;
