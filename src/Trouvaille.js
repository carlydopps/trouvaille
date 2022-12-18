import { Route, Routes } from "react-router-dom"
import { Account } from "./components/account/Account"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { DestinationList } from "./components/destination/DestinationList"
import { ExperienceList } from "./components/experience/ExperienceList"
import { HomePage } from "./components/home/HomePage"
import { LandingPage } from "./components/home/LandingPage"
import { NavBar } from "./components/nav/NavBar"
import { Traveler } from "./components/traveler/Traveler"
import { TravelerList } from "./components/traveler/TravelerList"
import { CreateTripForm } from "./components/trip/CreateTripForm"
import { MyTrips } from "./components/trip/MyTrips"
import { Trip } from "./components/trip/Trip"
import { Authorized } from "./components/views/Authorized"

export const Trouvaille = () => {
    return <>
        <Routes>
            <Route element={<NavBar />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/trip/:tripId" element={<Trip />} />
                <Route path="/travelers" element={<TravelerList />} />
                <Route path="/destinations" element={<DestinationList />} />
                <Route path="/experiences" element={<ExperienceList />} />
                <Route element={<Authorized  />}>
                    <Route path="/account/:userId" element={<Account />} />
                    <Route path="/trips/create" element={<CreateTripForm />} />
                    <Route path="/my-trips" element={<MyTrips />} />
                    <Route path="/travelers/:travelerId" element={<Traveler />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </>
}
