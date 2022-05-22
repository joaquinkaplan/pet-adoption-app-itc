import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Error,
  ProtectedRoute,
  ProtectedAdminRoute,
  SearchPage,
} from "./pages";
import { MyPets, AllPets, Profile, SharedLayout, Welcome } from "./pages/Home";
import { AddPet, ListOfUsersAndPets, AdminLayout } from "./pages/Dashboard";
import { useAppContext } from "./context/appContext";
import { PetMoreInfo } from "./components";

function App() {
  const { _id } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Welcome />} /> */}
          <Route index element={<AllPets />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/my-pets" element={<MyPets />}></Route>
        </Route>

        {/* DIVISOR */}
        <Route
          path="/add-pet"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AddPet />}></Route>
          <Route path="users-and-pets" element={<ListOfUsersAndPets />}></Route>
        </Route>

        <Route path="/pet-info" element={<PetMoreInfo />}></Route>
        <Route path="/landing/search-page" element={<SearchPage />}></Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
