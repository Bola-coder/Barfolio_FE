import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/chakra";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthContext";
import Nav from "./components/Nav";
import "./App.css";
import CreateCollection from "./pages/CreateCollection";
import CollectionProvider from "./contexts/CollectionContext";
import CollectionDetails from "./pages/CollectionDetails";
import EditCollection from "./pages/EditCollection";
import PublicCollectionDetails from "./pages/PublicCollectionDetails";
import LandingPage from "./pages/LandingPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfileDetails from "./pages/ProfileDetails";
import UserProvider from "./contexts/UserContext";

function App() {
  document.title = "Barfolio";
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <UserProvider>
            <CollectionProvider>
              <Nav />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protected routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/collections" element={<Home />} />
                  <Route path="/create" element={<CreateCollection />} />
                  <Route
                    path="/collection/public/:id"
                    element={<PublicCollectionDetails />}
                  />
                  <Route
                    path="/collection/:id"
                    element={<CollectionDetails />}
                  />
                  <Route
                    path="/collection/:id/edit"
                    element={<EditCollection />}
                  />
                  <Route path="/profile" element={<ProfileDetails />} />
                </Route>
              </Routes>
            </CollectionProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
