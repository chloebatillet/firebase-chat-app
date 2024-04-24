import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Userchat } from "../../@types";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "../../assets/cookies-config";
import { auth, provider, usersRef } from "../../firebase-config";
import { findUser } from "../../hooks/findUser";

interface UserState {
  uid: string;
  display_name: string;
  photo_url: string;
  userchats: Userchat[];
  isAuth: boolean;
}

export const initialState: UserState = {
  uid: "",
  display_name: "",
  photo_url: "",
  userchats: [],
  isAuth: cookies.get("auth-token"),
};

// export const createUser = createAsyncThunk("user/create-user", async (res) => {
//   try {
//     console.log("Creating new user...");

//     // Ajout dans la collection user avec un customId == uid
//     const docRef = doc(usersRef, res.user.uid);
//     const data = {
//       display_name: res.user.displayName,
//       photo_url: res.user.photoURL,
//       uid: res.user.uid,
//     };
//     setDoc(docRef, data);

//     const user = await findUser(res.user.uid);

//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.response.data.error);
//   }
// });

export const signInWithGoogle = createAsyncThunk(
  "user/sign-in-with-google",
  async () => {
    try {
      // Résultat de la connexion Google
      const res = await signInWithPopup(auth, provider);
      
      // Recherche de l'utilisateur dans le firestore
      let userExists = await findUser(res.user.uid);

      // S'il n'existe pas, on l'ajoute
      if (!userExists) {
        console.log("Creating new user...");

        // Ajout dans la collection user avec un customId == uid
        const docRef = doc(usersRef, res.user.uid);
        const data = {
          display_name: res.user.displayName,
          photo_url: res.user.photoURL,
          uid: res.user.uid,
        };
        setDoc(docRef, data);

        // Assignation à la variable
        //! Vérifier les données stockées
        userExists = await findUser(res.user.uid);
      }

      // Enregistrement dans les cookies
      cookies.set("auth-token", res.user.refreshToken);
      cookies.set("user", userExists);

      // Authentification effectuée
      return userExists;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

// exemple async
// export const fetchProducts = createAsyncThunk("products/fetch", async () => {
//   try {
//     const response = await fetch(
//       "https://elevatex-backoffice.vercel.app/products"
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error.response.data.error);
//   }
// });

export const logout = createAction("user/logout");

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isAuth = true;
        state.uid = action.payload?.uid;
        state.photo_url = action.payload?.photo_url;
        state.display_name = action.payload?.display_name;
      })
      .addCase(logout, (state) => {
        cookies.remove("auth-token");
        cookies.remove("user");
        state.isAuth = false;
      });
  },
});

export default userReducer.reducer;
