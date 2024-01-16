import AuthContextProvider, { AuthContext} from "../store/auth-context";
import { useContext} from "react";


export const useAuthContext = () => {
    return useContext(AuthContext);
}
