import { useRef, useState, useEffect } from 'react';
import {useAuth} from '../context/AuthProvider'; // Adjust the import path as necessary
import { Link, useNavigate, useLocation } from 'react-router-dom';




const Login = () => {
    const { logIn, currentUser } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (currentUser) {
            navigate('/',{ replace: true });
        }
        userRef.current.focus();
    }, [])


    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            await logIn(user, pwd);
            navigate( "/", { replace: true });
        } catch (err) {
        }
        setLoading(false);
    }


    return (
        <>
        <div className="bg-blue-400 mx-auto w-full relative flex flex-col sm:flex-row items-center h-full md:h-screen">
            <div className='w-full z-0 md:mt-0 mx-2 h-auto md:h-[100%] sm:flex sm:items-center my-auto'>
                <section className=' p-4 py-8 w-full h-full sm:h-auto md:w-84 mx-auto justify-center text-center text-gray-800 bg-white rounded-t-[70px] sm:rounded-[40px]'>
                    <h1 className='text-primary-dark-green font-bold italic text-2xl mb-6'>Bienvenido de nuevo</h1>

                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 text-primary-dark-gray'>
                        <div className='flex flex-col w-[90%] mx-auto'>
                            <input
                                className='rounded-lg p-2 bg-gray-200/60 placeholder:font-semibold placeholder:text-xs placeholder:italic'
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                placeholder="Usuario (email)"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required/>
                        </div>
                        <div className='flex flex-col w-[90%] mx-auto'>
                            <input
                                className='rounded-lg p-2 bg-gray-200/60 placeholder:font-semibold placeholder:text-xs placeholder:italic'
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>

                        <button disabled={loading} className='bg-blue-500 text-white rounded-2xl py-2 px-4'>Iniciar Sesión</button>
                    </form>
                    <p className='mt-4'>
                        ¿No tienes cuenta? 
                        <span className="line ml-2 text-blue-500 font-extrabold">
                            <Link to="/register">Registrate</Link>
                        </span>
                    </p>
                </section>
            </div>
        </div>

        </>

    )
}

export default Login