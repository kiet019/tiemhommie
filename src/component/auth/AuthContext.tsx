
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
  logout: () => {},
  user: null as any,
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const user = currentUser;

  const handleChange = async (user: any) => {
    console.log(user),
    console.log(currentUser)
  };
  const setUser = (user: User | null) => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
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
      value={{ logout, setUser, user}}
    >
      {children}
    </UserContext.Provider>
  );
}
