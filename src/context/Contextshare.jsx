import React, { createContext, useState } from 'react'


export const addResponseContext = createContext({})
export const editResponseContesxt = createContext({})
export const loginResponseContext = createContext({})




function Contextshare({children}) {
    const [addresponse, setAddResponse] = useState([])
    const [editresponse,setEditResponse] = useState([])
    const [loginrespose,setLoginResponse] = useState(true)
    return (
        <>
            <addResponseContext.Provider value={{addresponse,setAddResponse}}>
               <editResponseContesxt.Provider value={{editresponse,setEditResponse}}>
                <loginResponseContext.Provider value={{loginrespose,setLoginResponse}}>
                     {children}
                </loginResponseContext.Provider>
                 </editResponseContesxt.Provider>
            </addResponseContext.Provider>

        </>
    )
}

export default Contextshare