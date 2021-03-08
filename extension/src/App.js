import './Components/all.sass'
import Creds from './Components/Creds'
import Footer from './Components/Footer'

const App = () => {

  return (
    <div className="App">
      <div className="has-text-centered">
        <div className="section pt-4 pb-2">
          <Creds />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
