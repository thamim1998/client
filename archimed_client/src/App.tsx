import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Investor from './Investor/Investor'
import { CapitalList } from './CapitalList/CapitalList'
import Capital from './CapitalList/Capital'

function App() {

  return (
     <BrowserRouter>
     <div>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/investor/:id" element = {<Investor />} />
        <Route path="capital/:id" element = {<CapitalList />} />
        <Route path="capital/detail/:id" element = {<Capital />} />
      </Routes>
     </div>
     </BrowserRouter>
  )
}

export default App
