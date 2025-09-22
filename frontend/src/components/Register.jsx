import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";


const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,24}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { registro } = useAuth();
    console.log(registro)

    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        console.log('Registering')
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        try {
            setErrMsg("");
            setLoading(true);
            console.log(typeof registro)
            const data = await registro(user, pwd);
            console.log('Registrado', data)
            setSuccess(true);
            navigate("/");      
        } catch (err) {
            console.log('ERROR', err)
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            // errRef.current.focus();
        }
        setLoading(false);
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidUser(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd, nombre, apellido, telefono]);

    const inputClass =
        "rounded-lg p-2 bg-gray-200/60 placeholder:font-semibold placeholder:text-xs placeholder:italic";  
    const buttonClass =
        "rounded-xl px-4 py-2 bg-blue-500 text-white font-bold mt-4 hover:bg-primary-dark transition disabled:opacity-50";

    return (
        <>
            {success ? (
                <section className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 text-center">
                    <h1 className="text-2xl font-bold mb-4">¡Registro exitoso!</h1>
                    <p>
                        <Link to="/login" className="text-primary font-bold">
                            Inicia sesión
                        </Link>
                    </p>
                </section>
            ) : (
                <>
                <div className="bg-blue-400 mx-auto w-full relative flex flex-col sm:flex-row items-center h-full md:h-screen">
                    <div className='w-full z-0 md:mt-0 mx-2 h-auto md:h-[100%] sm:flex sm:items-center my-auto'>
                        <section className=' p-4 py-8 w-full h-full sm:h-auto md:w-84 mx-auto justify-center text-center text-gray-800 bg-white rounded-t-[70px] sm:rounded-[40px]'>
                            <h1 className='text-primary-dark-green font-bold italic text-2xl'>Registro</h1>
                            <span className='text-primary-orange text-xs italic mt-2 mb-4 inline-block font-bold'>¡Comienza hoy mismo!</span>

                            <form
                                onSubmit={handleRegister}
                                className='flex flex-col space-y-4 mt-2 text-primary-dark-gray'
                                autoComplete="off"
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        id="nombre"
                                        className={inputClass}
                                        value={nombre}
                                        placeholder="Nombre"
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        autoComplete="given-name"
                                    />
                                    <input
                                        type="text"
                                        id="apellido"
                                        className={inputClass}
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                        autoComplete="family-name"
                                        placeholder="Apellido"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="tel"
                                        id="telefono"
                                        className={inputClass}
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value.replace(/\D/, ""))}
                                        required
                                        autoComplete="tel"
                                        placeholder="Teléfono"
                                        pattern="[0-9]{6,15}"
                                    />
                                    <input
                                        type="email"
                                        id="username"
                                        ref={userRef}
                                        className={inputClass}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                        aria-invalid={validUser ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                                    
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    className={inputClass}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    placeholder="Contraseña"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p
                                    id="pwdnote"
                                    className={
                                        pwdFocus && pwd && !validPwd
                                            ? "instructions text-sm text-gray-500 mb-2"
                                            : "hidden"
                                    }
                                >
                                    8 a 24 caracteres. Debe incluir mayúsculas, minúsculas, un número y un carácter especial.
                                </p>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    className={inputClass}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    placeholder="Confirmar contraseña"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p
                                    id="confirmnote"
                                    className={
                                        matchFocus && !validMatch
                                            ? "instructions text-sm text-gray-500 mb-2"
                                            : "hidden"
                                    }
                                >
                                    Debe coincidir con la contraseña.
                                </p>

                                <button
                                    className={buttonClass}
                                    disabled={
                                        !validUser ||
                                        !validPwd ||
                                        !validMatch ||
                                        !nombre ||
                                        !apellido ||
                                        !telefono ||
                                        loading
                                    }
                                >
                                    {loading ? "Registrando..." : "Registrarme"}
                                </button>
                            </form>
                            <p className="text-center text-gray-400 mt-4">
                                ¿Ya tienes una cuenta?{" "}
                                <Link to="/login" className="text-blue-500 font-extrabold">
                                    Inicia sesión
                                </Link>
                            </p>
                            <nav className='flex justify-center mt-4 text-primary-dark-green'>
                                <ul className='flex space-x-4 justify-center items-center'>
                                    <li>
                                        <Link to="/">Privacidad</Link>
                                    </li>
                                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                    <li>
                                        <Link to="/editor">Legal</Link>
                                    </li>
                                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                    <li>
                                        <Link to="/admin">Cookies</Link>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
            </div>
                
            </>
                
            )}
        </>
    );
}

export default Register;