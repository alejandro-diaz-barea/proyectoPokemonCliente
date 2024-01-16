import  { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/userContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const LayoutPrivate = () => {

  const {user} = useContext(UserContext)

  return ( 
    <>
      <Navbar/>
      {user? <Outlet /> : <Navigate to ="/" />}
      <Footer/>
    </>
  )
}

export default LayoutPrivate