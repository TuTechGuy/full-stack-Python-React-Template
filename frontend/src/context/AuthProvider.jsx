import { createContext, useState, useEffect, useContext,  } from "react";
import { auth } from "../firebase/firebase"; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider,
    signInWithRedirect,
    sendPasswordResetEmail
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext); 
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function logIn(email, password) {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const user = data.user;
        navigate("/", { replace: true });
        return data;
    }

    async function registro(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Registro realizado')
                return user;
            })
            .catch((error) => {
                console.error("Error al registrar el usuario:", error);
                const errorCode = error.code;
                const errorMessage = error.message;
                throw new Error(errorMessage);
            });
    }

    async function logOut() {
        return signOut(auth);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setCurrentUser(currentUser);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
        } else {
            setCurrentUser(null);
        }
    }, [currentUser]);

    const value = {
        currentUser,
        setCurrentUser,
        registro,
        logOut,
        logIn,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;