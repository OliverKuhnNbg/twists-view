//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.scss';

// Components
import Gallery from './components/Gallery';
import SwitchArea from './components/switch-area/SwitchArea';

function App() {
  return (
    <div className="container-fluid">
      <div className="position-relative vh-100">
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <Gallery />
        </div>
        <SwitchArea />
      </div>
    </div>
  );
}

export default App;
