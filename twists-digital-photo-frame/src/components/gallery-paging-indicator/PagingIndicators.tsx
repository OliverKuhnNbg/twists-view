import { usePhotoStore } from "../../store/photoStore";
import './pagingIndicators.scss';

export const PagingIndicators= () => {
  const imageUrls :string[] = usePhotoStore((state) => state.imageUrls);
  const currentImageIndex :number = usePhotoStore((state) => state.currentIndex);

  return (
    // wrapper for the GUI-Indicator elements
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center">
      <div className="container">
        <div className="row justify-content-center mt-5">
          {imageUrls.map((url, index) => (
            <div 
              key={index} // Wichtig für React: Index als Key verwenden, da die Reihenfolge stabil ist
              className={`col-1 text-center ${
                index === currentImageIndex ? 'bg-info' : 'bg-primary'
              }`}
              style={{ cursor: 'pointer', margin: '5px' }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        {/** additional number index will be removed later */ }
        <div className="row justify-content-center">
          {imageUrls.length} - {currentImageIndex + 1}
        </div>
      </div>
    </div>
  );
};

export default PagingIndicators;