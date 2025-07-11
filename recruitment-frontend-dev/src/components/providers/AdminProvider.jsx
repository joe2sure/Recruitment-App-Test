import { Provider } from "react-redux";
import { store } from "@/store";

const AdminProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AdminProvider;
