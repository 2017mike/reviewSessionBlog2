import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import ThoughtPage from './pages/ThoughtPage'


function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/thought/:id' element={<ThoughtPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
