import { auth } from "@/config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { CartAndCartItemAndProduct } from "../../../package/model/cart/cart-and-cartItem-and-product";
import { UseLogin } from "../../../package/function/auth/use-login";
import { useRouter } from "next/router";
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user";
const userInit = {
  cart: null as unknown as CartAndCartItemAndProduct | null,
  setCart: (cart: CartAndCartItemAndProduct | null) => {}
};
export const UserContext = createContext(userInit);

export default function AuthProvider({ children }: any) {
  const [currentCart, setCurrentCart] = useState<CartAndCartItemAndProduct | null>(null)
  const router = useRouter()
  const cart = currentCart;
  const setCart = (cart: CartAndCartItemAndProduct | null) => {
    setCurrentCart(cart)
  }
  const handleChange = async (currentUser: User | null) => {
    try {
      if (currentUser !== null) {
        const user = await UseLogin({ userUid: currentUser.uid })
        if (user.data !== null) {
          const data = await UseGetCartUserUid({
            userUid: currentUser.uid
          })
          setCart(data.data)
        }
      } else {
        setCart(null)
      }
    } catch (error: any) {
      console.log(error)
    }
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      handleChange(currentUser)
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <UserContext.Provider value={{ cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
}
