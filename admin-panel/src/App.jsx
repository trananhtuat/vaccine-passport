import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, AppLayout, Dashboard, User, UserCreate, UserDetail, Vaccine, VaccineDetail, Place, PlaceDetail, QRScan } from './pages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="" element={<AppLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='/user' element={<User/>}/>
                    <Route path='/user/create' element={<UserCreate/>}/>
                    <Route path='/user/:id' element={<UserDetail/>}/>
                    <Route path='/vaccine' element={<Vaccine/>}/>
                    <Route path='/vaccine/:id' element={<VaccineDetail/>}/>
                    <Route path='/place' element={<Place/>}/>
                    <Route path='/place/:id' element={<PlaceDetail/>}/>
                    <Route path='/qr-scan' element={<QRScan/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
