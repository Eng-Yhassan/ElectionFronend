import React from 'react'
import Header from './components/ui/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home/Home'
import About from './Pages/About/About'
import Candidates from './Pages/Candidates/Candidates'
import Login from './Pages/login/Login'
import Footer from './components/ui/Footer'
import CandidateHome from './Pages/dashboard/candidates/CondidateHome'
import CandidateHeader from './components/Canidate/CandidateHeader'
import SideBar from './Pages/dashboard/Admin/SideBar'
import Dashboard from './Pages/dashboard/Admin/dashboard'
import GetAllVoters from './Pages/dashboard/Admin/Get All/GetAllVoters'
import RegisterVoter from './Pages/dashboard/Admin/Register/RegisterVoter'
import GetAllCandidates from './Pages/dashboard/Admin/Get All/GetAllCandidates'
import RegisterCandidate from './Pages/dashboard/Admin/Register/RegisterCandidate'
import EditVoter from './Pages/dashboard/Admin/Edit/EditVoter'
import EditCandidate from './Pages/dashboard/Admin/Edit/EditCandidate'
import RegisterAdmin from './Pages/dashboard/Admin/Register/RegisterAdmin'
import GetAllAdmins from './Pages/dashboard/Admin/Get All/GetAllAdmins'
import EditAdmin from './Pages/dashboard/Admin/Edit/EditAdmin'
import AdminProtectRoute from './components/routes/AdminProtectRoute'
import VoterProtectRoute from './components/routes/VoterProtectRoute'
import CandidateProtectRoute from './components/routes/candidateProtectRoute'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'


// Qof kasta ayaa soo booqan kara Routes ka soo hoos gala function
function Mainlayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
// Candidate Dashboard
function Candidatelayout({ children }) {
  return (
    <div>
      <CandidateProtectRoute>
        <CandidateHeader />
        <div className=''>{children}</div>
        <Footer />
      </CandidateProtectRoute>
    </div>
  )
}

// Admin Dashboard
function AdminLayout({ children }) {
  return (
    <div className='flex justify-between'>
      <AdminProtectRoute>
        <SideBar />
        {/* Main content */}
        <main className="flex-1 md:ml-64 p-6 md:mt-0 mt-20">
          {children}
        </main>
      </AdminProtectRoute>
    </div>
  )
}


const App = () => {
  return (
    <div>
      <Routes>
        {/* User Main Layout */}
        {/* Home */}
        <Route path='/' element={
          <Mainlayout>
            <Home />
          </Mainlayout>
        } />
        {/* NotFoundPage  */}
        <Route path='*' element={
          <Mainlayout>
            <NotFoundPage />
          </Mainlayout>
        } />
        {/* About */}
        <Route path='/about' element={
          <Mainlayout>
            <About />
          </Mainlayout>
        } />
        {/* Candidates */}
        <Route path='/candidates' element={
          <VoterProtectRoute>
            <Mainlayout>
              <Candidates />
            </Mainlayout>
          </VoterProtectRoute>
        } />
        {/* Login */}
        <Route path='/login' element={
          <Mainlayout>
            <Login />
          </Mainlayout>
        } />

        {/* Canidate Dashboard */}
        <Route path='/candidateHome' element={
          <Candidatelayout>
            <CandidateHome />
          </Candidatelayout>
        } />


        {/* Admin Dashboard */}
        <Route path='/adminPanel' element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path='/allVoters' element={
          <AdminLayout>
            <GetAllVoters />
          </AdminLayout>
        } />
        <Route path='/registerVoters' element={
          <AdminLayout>
            <RegisterVoter />
          </AdminLayout>
        } />
        <Route path='/allCandidates' element={
          <AdminLayout>
            <GetAllCandidates />
          </AdminLayout>
        } />
        <Route path='/registerCandidate' element={
          <AdminLayout>
            <RegisterCandidate />
          </AdminLayout>
        } />

        <Route path='/editVoter/:id' element={
          <AdminLayout>
            <EditVoter />
          </AdminLayout>
        } />
        <Route path='/editCandidate/:id' element={
          <AdminLayout>
            <EditCandidate />
          </AdminLayout>
        } />
        <Route path='/registerAdmin' element={
          <AdminLayout>
            <RegisterAdmin />
          </AdminLayout>
        } />
        <Route path='/allAdmins' element={
          <AdminLayout>
            <GetAllAdmins />
          </AdminLayout>
        } />
        <Route path='/editAdmin/:id' element={
          <AdminLayout>
            <EditAdmin />
          </AdminLayout>
        } />
      </Routes>
    </div>
  )
}

export default App