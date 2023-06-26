
import { auth, ggProvider } from "@/config/firebase";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
const userInit = {
  loginGoogle: () => {},
  registerFirebase: (email: any, password: any) => {},
  login: (email: any, password: any) => {},
  logout: () => {},
  createUser: (address: any, userName: any, phoneNumber: any) => {},
  user: null as any,
  userBackend: null as any
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentUserBackend, setCurrentUserBackend] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null);
  const userBackend = currentUserBackend
  const user = currentUser;
  const loginGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, ggProvider);
    } catch (error: any) {
      return error.message;
    }
  };
  const login = async (email: any, password: any) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      dispatch(
        setOpen({
          open: true,
          message: "Wrong email or password",
          severity: "error",
        })
      );
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

  const getUserBackend = async (userUid: any) => {
    const userBackend = await getUserBackendApi(userUid);
    if (userBackend !== null) {
      dispatch(
        setOpen({
          open: true,
          message: "Login success",
          severity: "success",
        })
      );
      if (userBackend.userRole === 1) {
        router.push("/admin");
      } else {
        router.push("/");
      }
      setCurrentUser(auth.currentUser);
      setCurrentUserBackend(userBackend);
    } else {
      // router.push("/information");
    }
  };
  useEffect(() => {
    console.log(currentUser);
    console.log(currentUserBackend)
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        getUserBackend(currentUser.uid);
      } else {
        setCurrentUser(null);
        setCurrentUserBackend(null)
        // router.push("/");
      }
    });
    return () => {
      unSubscribe();
    };
  }, [currentUser]);
  return (
    <UserContext.Provider
      value={{ loginGoogle, login, logout, registerFirebase, createUser, user, userBackend }}
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
export const getUserBackendApi =async (userUid: any) => {
    const response = await fetch(`http://localhost:8080/api/user/getUserByUserUid?userUid=${userUid}`)
    if (response.ok) {
        const userBackend : any = await response.json()
        return userBackend
    } else {
        return null
    }
}
