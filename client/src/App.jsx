import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Contact } from './pages/Contact';
import { Error } from './pages/Error';
import { Logout } from './pages/Logout';
import { Services} from './pages/Services'
import { AdminLayout } from './components/layouts/Admin-layout';
import { AdminContact } from './pages/Admin-Contact';
import { AdminUsers } from './pages/Admin-User';
import { UpdateUser } from './pages/Admin-update';
import Footer from './components/footer';
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
         <Route path="/services" element={<Services />}/>
         <Route path="/logout" element={<Logout />}/>
        
         <Route path='/admin' element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers />}/>
          <Route path="contact" element={<AdminContact />}/>
           <Route path="update/:id" element={<UpdateUser />}/>
         </Route>
         <Route path="*" element={<Error />}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
