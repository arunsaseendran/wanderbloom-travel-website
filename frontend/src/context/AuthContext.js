// import {createContext, useEffect, useReducer} from 'react'

// const initial_state = {
//     user:null,
//     loading:false,
//     error:null
// }

// export const AuthContext = createContext(initial_state);

// const AuthReducer = (state,action)=>{
//     switch(action.type){
//         case 'LOGIN_START':
//             return{
//                 user:null,
//                 loading:true,
//                 error:null
//             };
//             case 'LOGIN_SUCCESS':
//             localStorage.setItem('user', JSON.stringify(action.payload));
//                 return{
//                     user:action.payload,
//                     loading:false,
//                     error:null
//                 };
//                 case 'LOGIN_FAILURE':
//                 return{
//                     user:null,
//                     loading:false,
//                     error:action.payload
//                 }
//                 case 'REGISTER_SUCCESS':
//                 return{
//                     user:null,
//                     loading:false,
//                     error:null
//                 }
//                 case 'LOGOUT':
//                 return{
//                     user:null,
//                     loading:false,
//                     error:null
//                 }


//             default :
//             return state;
//     }
// };


// export const AuthContextProvider =({children})=>{

//     const [state,dispatch] = useReducer(AuthReducer, initial_state)

//     useEffect(()=>{
//         localStorage.setItem('user',JSON.stringify(state.user))
//     },[state.user])

//     return <AuthContext.Provider value={{
//         user:state.user,
//         loading:state.loading,
//         dispatch,
//     }}>
//         {children}
//     </AuthContext.Provider>
// }


import { createContext, useEffect, useReducer } from "react";

const storedUser = localStorage.getItem("user");

const initial_state = {
  user: storedUser ? JSON.parse(storedUser) : null, // ✅ load from localStorage
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      localStorage.removeItem("user"); // ✅ clear from storage
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  // keep storage in sync
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};