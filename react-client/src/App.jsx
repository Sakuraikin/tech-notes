// import CSS and components here
import { Routes, Route } from 'react-router-dom'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route index element={<Public />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dash' element={<DashLayout />} 
        // ToDo: Components for protected routes go here
      />
    </Routes>
  );
}

export default App;