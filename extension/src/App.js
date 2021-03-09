import React, {useEffect} from 'react'
import './Components/all.sass'
import Creds from './Components/Creds'
import Footer from './Components/Footer'
import ReactGA from "react-ga";
import ApplicationConstants from './Enums/ApplicationConstants'

const App = () => {

  useEffect(()=>{
  }, [])

  return (
    <div className="App">
      <div className="section has-text-centered pt-4 pb-2" style={{display: 'grid', height: 'inherit'}}>
          <Creds />
          <div className="is-align-self-flex-end">
            <Footer />
          </div>
        </div>
    </div>
  );
}

export default App;
