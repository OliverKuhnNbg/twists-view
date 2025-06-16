//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.css';

// Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import CounterDisplay from './components/CounterDisplay';
import CounterButton from './components/CounterButton';
import Gallery from './components/Gallery';

function App() {
  return (
    <>
      <hr />

      <div className="container text-center mt-5 mb-5">
        <div className="card p-4">
          <div className="card-body">
            <CounterDisplay />
            <div className="mt-3">
              <CounterButton />
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5 mb-5">
        <Gallery />
      </div>

      <hr />
    </>
  );
}

export default App;
