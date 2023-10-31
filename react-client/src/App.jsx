// import CSS and components here
import { Routes, Route } from 'react-router-dom'
import Public from './components/Public'
import Login from './components/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route index element={<Public />} />
    </Routes>
  );
}

export default App;