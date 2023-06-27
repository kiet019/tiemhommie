
import { auth } from "@/config/firebase";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { User } from "../../../package/model/user";
import { useAppDispatch } from "@/feature/Hooks";
const userInit = {
  setUser: (user: User | null) => {},
  logout: () => {},
  user: null as unknown as User | null,
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useAppDispatch()
  const user = currentUser;

  const handleChange = async () => {
    try {
    } catch(error : any) {

    } finally {
      console.log(user)
    }
  };
  const setUser = (user: User | null) => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser? handleChange() : null
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
