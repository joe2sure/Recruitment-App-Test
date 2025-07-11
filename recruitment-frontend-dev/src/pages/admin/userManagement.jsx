import UserManagementMainPage from "@/components/adminPanel/userManagement/UserManagementMainPage";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockUsers = Array.from({ length: 45 }, (_, i) => ({
  id: `D${1900 + i}`,
  fullName: ["Darlene Robertson", "John Doe", "Jane Smith"][i % 3],
  accountType: ["Candidate", "Employer", "Admin"][i % 3],
  status: ["Active", "Suspended", "Pending Verification"][i % 3],
  regDate: "31/12/25",
  lastLogin: `${getRandomInteger(1, 12)} months ago`,
}));

const usersSlice = createSlice({
  name: "users",
  initialState: { list: mockUsers },
  reducers: {},
});

const store = configureStore({ reducer: { users: usersSlice.reducer } });

const UserMangement = () => {
  return (
    <Provider store={store}>
      <UserManagementMainPage />
    </Provider>
  );
};

export default UserMangement;
