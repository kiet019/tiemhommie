import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { User } from "../../../package/model/user";
import { FetcherProps, fetcher } from "../../../package/fetcher";
import { ResponseBody } from "../../../package/model/api";
import { CartAndCartItemAndProduct } from "../../../package/model/cart/cart-and-cartItem-and-product";
const userInit = {
  user: null as unknown as User | null,
  setUser: (user: User | null) => {},
  logout: () => {},
  cart: null as unknown as CartAndCartItemAndProduct | null,
  setCart: (cart: CartAndCartItemAndProduct | null) => {}
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const user = currentUser;
  const setUser = (user: User | null) => {
    setCurrentUser(user);
  };
  const logout = async() => {
    await signOut(auth)
    setCurrentUser(null);
  };

  const [currentCart, setCurrentCart] = useState<CartAndCartItemAndProduct | null>(null)
  const cart = currentCart;
  const setCart = (cart: CartAndCartItemAndProduct | null) => {
    setCurrentCart(cart)
  }
  const handleChange = async (currentUser: any) => {
    try {
      if (user === null) {
        const Props: FetcherProps = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: {
            auth: currentUser.uid,
          },
        };
        const response: ResponseBody<User> = await fetcher(
          `/api/auth/login`,
          Props
        );
        if (response.data !== null) {
          setUser(response.data);
        }
      }
      if (cart === null) {
        const Props: FetcherProps = {
          method: "GET",
          options: {
            next: {
              revalidate: 60
            }
          }
        }
        const response: ResponseBody<CartAndCartItemAndProduct> = await fetcher(`/api/cart?userUid=${user?.userUid}`, Props)
        setCart(response.data)
      }
    } catch (error: any) {
      console.log(error)
    } 
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? handleChange(currentUser) : null;
    });
    return () => {
      unSubscribe();
    };
  }, [currentUser]);
  return (
    <UserContext.Provider value={{ logout, setUser, user , cart, setCart}}>
      {children}
    </UserContext.Provider>
  );
}
