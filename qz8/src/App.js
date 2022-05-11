import logo from './logo.svg';
import './App.css';
import MultiButton from  './MultiButton';
import HelloCGU from './HelloCGU';

function App() {
  return (
    <div className="App">
      <div>
        {HelloCGU()}
      </div>
      <div>
        {MultiButton(10)}
      </div>
    </div>
  );
}

export default App;
