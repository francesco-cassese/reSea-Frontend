import { useState } from "react";
import { createContext, useContext } from "react";




const AppContext = createContext();

function AppProvider({ children }) {
    const [search, setSearch] = useState("");
    return (
        <AppContext.Provider value={{ search, setSearch }}>
            {children}
        </AppContext.Provider>
    );
}
function useAppContext() {

    return useContext(AppContext);
}

export {
    useAppContext,
    AppProvider
};