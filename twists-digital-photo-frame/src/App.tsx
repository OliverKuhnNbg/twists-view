import { useEffect } from 'react';
import './App.scss';
// data store
import { usePhotoStore } from './store/photoStore';

// Components
import GalleryBackground from './components/gallery-background/GalleryBackground';
import Gallery from './components/gallery/Gallery';
import SwitchArea from './components/switch-area/SwitchArea';

function App() {
  // store data loaded for the GUI-Blend-In & -Out options
  // 1. blend-in/blend-out state
  // 2. blend-in/blend-out functions which controlls the blend-in/blend-out state
  const isHiden = usePhotoStore((state) => state.isHiden);
  const { guiTimerController, stopGuiTimer } = usePhotoStore.getState();

  // init function - takes care about GUI-Timer
  // START GUI-Timer if compnent is added to DOM.
  // STOP GUI-Timer if compnent will be destroyed or will be removed from DOM.
  useEffect(() => {
    guiTimerController();

    return () => {
      stopGuiTimer();
    };
  }, [guiTimerController, stopGuiTimer]);

  // onMouseMove-function:
  // cursor movement handling
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
