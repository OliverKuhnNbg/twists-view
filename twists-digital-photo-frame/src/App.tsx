import './App.scss';

// Components
import Gallery from './components/Gallery';
import SwitchArea from './components/switch-area/SwitchArea';

function App() {
  return (
    <div className="container-fluid">
      <div className="position-relative vh-100">
        <Gallery />
        <SwitchArea />
      </div>
    </div>
  );
}

export default App;
