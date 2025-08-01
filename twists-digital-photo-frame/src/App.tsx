import './App.scss';

// Components
import GalleryBackground from './components/gallery-background/GalleryBackground';
import Gallery from './components/gallery/Gallery';
import SwitchArea from './components/switch-area/SwitchArea';

function App() {
  return (
    <div className="container-fluid">
      <div className="position-relative vh-100">
        <GalleryBackground />
        <Gallery />
        <SwitchArea />
      </div>
    </div>
  );
}

export default App;
