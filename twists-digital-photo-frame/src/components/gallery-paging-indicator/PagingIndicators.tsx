import { usePhotoStore } from "../../store/photoStore";

export const PagingIndicators= () => {
  const imageUrls :string[] = usePhotoStore((state) => state.imageUrls);
  const currentImageIndex :number = usePhotoStore((state) => state.currentIndex);

  return (
    // wrapper for the GUI-Indicator elements
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center mt-4">
      {imageUrls.length} - {currentImageIndex+1}
    </div>
  );
};

export default PagingIndicators;