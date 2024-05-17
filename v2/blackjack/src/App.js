import logo from './logo.svg';
import './App.css';
import Game from './blackjack';

function App() {
  return (
    <div className="App">
      <Game/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
      </header>
    </div>
  );
}
export default App;
