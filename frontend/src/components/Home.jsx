import { useEffect, useState } from "react";
import { contentApi } from "./api/posts";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
    const [ticker, setTicker] = useState([]);
    const [precio, setPrecio] = useState(null);
    const [loading, setLoading] = useState(false);
    const { logOut, currentUser } = useAuth();

    const tabs = [
        { name: "Inicio", ref: "/" },
        { name: "Acciones", ref: "/acciones" },
        { name: "Perfil", ref: "/perfil" }
    ];

    const fetchTicker = async () => {
        if (!ticker) return;
        setLoading(true);
        await contentApi.get(`/cotizacion/${ticker}`).then((response) => {
            console.log(response.data);
            setPrecio(response.data.precio);
        });
        setLoading(false);
    }

    const handleLogout = async () => {
        try {
            await logOut();
        }
        catch (err) {
            console.error("Error al cerrar sesión:", err);
        }
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
                <div>
                    <div className="p-6 text-2xl font-bold border-b border-gray-700">
                        Nombre APP
                    </div>
                    <nav className="mt-6">
                        <ul>
                            {tabs.map(tab => (
                                <li key={tab.ref} className="px-6 py-2 hover:bg-gray-700 cursor-pointer">
                                    <a href={tab.ref}>{tab.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="p-6 border-t border-gray-700">
                    <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="p-4 w-full flex flex-col">
                <h1 className="text-3xl font-bold">Cotización de acciones</h1>
                <div className="flex mt-4 p-6 w-full mx-auto items-center">
                    <input 
                        type="text"
                        placeholder="Introduce el ticker (e.g., AAPL)"
                        className="border border-gray-300 rounded p-2 mr-2"
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    />
                    <button
                        onClick={() => fetchTicker()}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Obtener Precio
                    </button>
                </div>
                {precio && (
                    <div className="mt-4">
                        <h2 className="text-xl">Precio de {ticker}: ${precio}</h2>
                    </div>
                )}
            </main>
        </div>
    )
}
