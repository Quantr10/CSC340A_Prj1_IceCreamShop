import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

//  ADD TO CART
export async function addToCartService(cartItem) {
  const user = auth.currentUser;

  if (user) {
    // MODE 1 — LOGGED IN → FIREBASE
    const cartRef = collection(db, "users", user.uid, "cart");

    const q = query(
      cartRef,
      where("flavorId", "==", cartItem.flavorId),
      where("size", "==", cartItem.size),
      where("style", "==", cartItem.style),
      where("topping", "==", cartItem.topping)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existing = snapshot.docs[0];
      await updateDoc(doc(db, "users", user.uid, "cart", existing.id), {
        quantity: existing.data().quantity + cartItem.quantity,
      });

      return { updated: true };
    }

    await addDoc(cartRef, cartItem);
    return { created: true };
  } else {
    // MODE 2 — NOT LOGGED IN → LOCAL STORAGE
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];

    const found = localCart.find(
      (i) =>
        i.flavorId === cartItem.flavorId &&
        i.size === cartItem.size &&
        i.style === cartItem.style &&
        i.topping === cartItem.topping
    );

    if (found) {
      found.quantity += cartItem.quantity;
      localStorage.setItem("cart", JSON.stringify(localCart));
      return { updated: true };
    }

    // Add new item
    localCart.push({ ...cartItem, id: Date.now() });
    localStorage.setItem("cart", JSON.stringify(localCart));
    return { created: true };
  }
}

export async function mergeLocalCartToFirebase() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (localCart.length === 0) return;

  const cartRef = collection(db, "users", user.uid, "cart");

  for (const item of localCart) {
    const q = query(
      cartRef,
      where("flavorId", "==", item.flavorId),
      where("size", "==", item.size),
      where("style", "==", item.style),
      where("topping", "==", item.topping)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existing = snapshot.docs[0];
      await updateDoc(doc(db, "users", user.uid, "cart", existing.id), {
        quantity: existing.data().quantity + item.quantity,
      });
    } else {
      const { id, ...cleanItem } = item;

      await addDoc(cartRef, cleanItem);
    }
  }

  // Clear localStorage cart after merging
  localStorage.removeItem("cart");
}
