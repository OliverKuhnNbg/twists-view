import { useEffect } from 'react';
import { usePhotoStore } from '../../store/photoStore';
import PagingButton from '../gallery-paging-button/PagingButton';

function SwitchArea() {
  const btnRightDir: string = 'right';
  const btnLeftDir: string = 'left';

  const isHidenState: boolean = usePhotoStore((state) => state.isHiden);

  // 2. Hole die Aktionen separat. Da sie sich nie ändern, verursachen sie keine Re-Renders.
  // Die Komponente rendert NICHT neu, wenn sich einer dieser Werte ändert.
  const { guiTimerController, stopGuiTimer } = usePhotoStore.getState();

  useEffect(() => {
    // 1. Timer starten, wenn die Komponente geladen wird.
    guiTimerController();

    // 2. Cleanup-Funktion zurückgeben. Diese wird ausgeführt,
    //    wenn die Komponente unmounted wird.
    return () => {
      stopGuiTimer();
    };
  }, [guiTimerController, stopGuiTimer]);

  const handleMouseMove = () => {
    // Die guiTimerController-Funktion deines Stores aufrufen.
    guiTimerController();
    console.log('Maus bewegt sich mit status: x gleich ' + isHidenState);
  };

  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      onMouseMove={handleMouseMove}
    >
      <div className={isHidenState ? 'd-none' : 'd-flex'}>
        <PagingButton direction={btnRightDir} />
        <PagingButton direction={btnLeftDir} />
      </div>
    </div>
  );
}

export default SwitchArea;
