import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Home from './Home/Home'

function App() {

  return (
     <BrowserRouter>
     <div>
      <Routes>
        <Route path="/" element = {<Home />} />
      </Routes>
     </div>
     </BrowserRouter>
  )
}

export default App
