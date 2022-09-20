import { createContext, useContext, useState } from "react"

const ErrorContext = createContext()
const SetErrorContext = createContext()

export const useError = () =>{
    return useContext(ErrorContext)
}

export const useSetError = () =>{
    return useContext(SetErrorContext)
}

export const ErrorProvider = ({ value, children}) =>{
    const [ error, setError] = useState(value)
    return (
        <ErrorContext.Provider value={error}>
            <SetErrorContext.Provider value={setError}>
                {children}
            </SetErrorContext.Provider>
        </ErrorContext.Provider>
    )
}

export default ErrorProvider