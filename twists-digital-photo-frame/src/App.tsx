import { useEffect } from 'react';
import './App.scss';
import { usePhotoStore } from './store/photoStore';

// Components
import GalleryBackground from './components/gallery-background/GalleryBackground';
import Gallery from './components/gallery/Gallery';
import SwitchArea from './components/switch-area/SwitchArea';

function App() {
  const isHiden = usePhotoStore((state) => state.isHiden);
  const { guiTimerController, stopGuiTimer } = usePhotoStore.getState();

  useEffect(() => {
    console.log('\n\nTest call');
    guiTimerController();

    return () => {
      stopGuiTimer();
    };
  }, [guiTimerController, stopGuiTimer]);

  const handleMouseMove = () => {
    guiTimerController();
  };

  return (
    <div className="container-fluid">
      <div className="position-relative vh-100" onMouseMove={handleMouseMove}>
        <GalleryBackground />
        <Gallery />
        <SwitchArea isHiden={isHiden} />
      </div>
    </div>
  );
}

export default App;
