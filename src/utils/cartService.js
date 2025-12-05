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
import { getCurrentUser } from "./authService";

// ===============================
//  ADD TO CART (AUTO: FIREBASE OR LOCAL)
// ===============================
export async function addToCartService(cartItem) {
  // Wait for auth state to resolve
  const user = await getCurrentUser();

  if (user) {
    // ===============================
    //  MODE 1 — LOGGED IN → FIREBASE
    // ===============================
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
      // Item exists → update quantity
      const existing = snapshot.docs[0];
      await updateDoc(doc(db, "users", user.uid, "cart", existing.id), {
        quantity: existing.data().quantity + cartItem.quantity,
      });

      return { updated: true };
    }

    // New item
    await addDoc(cartRef, cartItem);
    return { created: true };
  } else {
    // ===============================
    //  MODE 2 — NOT LOGGED IN → LOCAL STORAGE
    // ===============================
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
  const user = await getCurrentUser();

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
      const { id, ...cleanItem } = item; // loại bỏ id localStorage

      await addDoc(cartRef, cleanItem);
    }
  }

  // Clear localStorage cart after migrating
  localStorage.removeItem("cart");
}
