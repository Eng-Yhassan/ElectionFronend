import { Navigate } from "react-router-dom";


function CandidateProtectRoute({ children }) {
    const candidate = localStorage.getItem("candidate");

    if (!candidate) {
        return <Navigate to="/login" replace />
    }
    return children
}


export default CandidateProtectRoute
