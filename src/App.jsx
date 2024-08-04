import UserRoute from './routes/UserRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UserRoute />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
