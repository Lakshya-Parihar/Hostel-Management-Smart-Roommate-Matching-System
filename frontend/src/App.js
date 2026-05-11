import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./Main";
import Team from "./Pages/Team";

// User
import Login from "./Users/Login";
import Register from "./Users/Register";
import Home from "./Users/Home";
import Rooms from "./Users/Rooms";
import PreferenceForm from "./Users/PreferenceForm";
// import UserDashboard from "./Users/Recom";
import UserRecommendationsModal from "./Users/AutoRecommendations";
import RoommateMatches from "./Users/RoommateMatches";
import UserTeam from "./Users/UserTeam";

// Admin
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import AdminRooms from "./Admin/Rooms";
import AdminSidebar from "./Admin/Sidebar";
import ViewBookings from "./Admin/ViewBookings";
import AddRooms from "./Admin/AddRooms";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/team" element={<Team />} />

        {/* User routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedUserRoute>
              <Home />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/preference"
          element={
            <ProtectedUserRoute>
              <PreferenceForm />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedUserRoute>
              <RoommateMatches />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedUserRoute>
              <Rooms />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/user-team"
          element={
            <ProtectedUserRoute>
              <UserTeam />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedUserRoute>
              <UserRecommendationsModal />
            </ProtectedUserRoute>
          }
        />
 
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminSidebar />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-rooms"
          element={
            <ProtectedAdminRoute>
              <AdminRooms />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-bookings"
          element={
            <ProtectedAdminRoute>
              <ViewBookings />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
