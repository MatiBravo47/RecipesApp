import Pages from "./pages/Pages";
import Category from "./components/Category.jsx"
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Category/>
      <Pages/>
      </BrowserRouter>
    </div>
  );
}

export default App;
