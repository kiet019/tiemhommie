
import { auth, ggProvider } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { User } from "../../../package/model/user";
const userInit = {
  setUser: (user: User | null) => {},
  loginGoogle: () => {},
  registerFirebase: (email: any, password: any) => {},
  logout: () => {},
  createUser: (address: any, userName: any, phoneNumber: any) => {},
  user: null as any,
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const user = currentUser;
  const loginGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, ggProvider);
    } catch (error: any) {
      return error.message;
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
      router.push("/");
    } catch (error: any) {
      return error.message;
    }
  };
  const registerFirebase = async (email: any, password: any) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // router.push("/information");
    } catch (error: any) {
      return error.message;
    }
  };
  const createUser = async (address: any, userName: any, phoneNumber: any) => {
    const response = await createUserApi(
      auth.currentUser?.email,
      phoneNumber,
      address,
      auth.currentUser?.uid,
      userName
    );
    if (response) {
      setCurrentUser(auth.currentUser);
      router.push("/");
    } else {
    }
  };

  const handleChange = async (user: any) => {
    console.log(user)
  };
  const setUser = (user: User | null) => {
    setCurrentUser(user)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      handleChange(currentUser)
    })
    return () => {
      unSubscribe();
    };
  }, [currentUser]);
  return (
    <UserContext.Provider
      value={{ loginGoogle, logout, registerFirebase, createUser, setUser, user}}
    >
      {children}
    </UserContext.Provider>
  );
}

export const createUserApi = async (email : any, phoneNumber : any, address : any, userUid : any, userName: any) => {
    const response = await fetch('http://localhost:8080/api/user/createUser', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify({
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            userName: userName,
            userUid: userUid,
          })
    })
    return response.ok
}
