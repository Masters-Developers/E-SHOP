import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Login from './pages/Login'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import Registrar from './pages/Registrar'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='registrar' element={<Registrar />} />
        <Route path='olvide-password' element={<OlvidePassword />} />
        <Route path='olvide-password/:token' element={<NuevoPassword />} />
        <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
      </Route>
    </Routes>
  )
}

export default App
