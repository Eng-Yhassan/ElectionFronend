import { Navigate } from "react-router-dom";


function VoterProtectRoute({ children }) {
    const voter = localStorage.getItem("voter");

    if (!voter) {
        return <Navigate to="/login" replace />
    }
    return children
}


export default VoterProtectRoute
