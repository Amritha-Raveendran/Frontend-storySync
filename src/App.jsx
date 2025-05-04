import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import TrendingStories from './components/TrendingStories'
import PleaseLogin from './components/PleaseLogin'
import Login from './components/Login'
import Register from './components/Register'
import Pagenotfound from './components/Pagenotfound'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Collaborate from './components/Collaborate'
import JoinOurTeam from './components/JoinOurTeam'
import Profile from './user/Profile'
import UserNavbar from './pages/UserNavbar'
import AdminDashboard from './admin/Admin/AdminDashboard'
import AdminAuth from './admin/Admin/AdminAuth'
import PendingStories from './admin/PendingStories'
import AllStories from './admin/AllStories'
import Usermanagement from './admin/Admin/Usermanagement'
import AddStory from './user/AddStory'
import Contact from './components/Contact'
import HelpCenter from './components/HelpCenter'
import ViewStoryOfUser from './user/ViewStoryOfUser'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/trendingStories' element={<TrendingStories />}></Route>
        <Route path='/pleaselog' element={<PleaseLogin />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/*' element={<Pagenotfound/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/collaborate' element={<Collaborate/>}></Route>
        <Route path='/teampage' element={<JoinOurTeam/>}></Route>
       
        <Route path ='/userProfile' element={<Profile/>}></Route>
        <Route path ='/usernav' element={<UserNavbar/>}></Route>

        <Route path ='/viewstory/:id' element={<ViewStoryOfUser/>}></Route>
        
        <Route path ='/admin-dashboard' element={<AdminDashboard/>}></Route>

        <Route path ='/admin-login' element={<AdminAuth/>}></Route>
        <Route path ='/admin-register' element={<AdminAuth adminRegister={true}/>}></Route>
        <Route path ='/pendingstories' element={<PendingStories/>}></Route>


        <Route path ='/allStories' element={<AllStories/>}></Route>
        <Route path ='/usermanagement' element={<Usermanagement/>}></Route>
        <Route path ='/write' element={<AddStory />}></Route>
        <Route path ='/contact' element={<Contact/>}></Route>
        
        <Route path ='/helpcenter' element={<HelpCenter/>}></Route>

      </Routes>
    </>
  )
}

export default App
