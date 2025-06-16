//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.scss';

// Components
import CounterDisplay from './components/CounterDisplay';
import CounterButton from './components/CounterButton';
import Gallery from './components/Gallery';
import PagingButton from './components/gallery-paging-button/PagingButton';

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
        <div className="row col-12">
          <PagingButton />
        </div>
      </div>

      <hr />
    </>
  );
}

export default App;
