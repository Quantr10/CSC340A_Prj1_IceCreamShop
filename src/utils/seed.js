import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const sampleFlavors = [
  {
    name: "Almond Sundae",
    price: 8.99,
    rating: 4.5,
    image: "almondSundae.png",
    description: "Rich almond flavor with a crunchy topping.",
  },
  {
    name: "Chocolate Fudge",
    price: 7.99,
    rating: 4.8,
    image: "chocoFudge.png",
    description: "Decadent chocolate fudge for the ultimate chocolate lover.",
  },
  {
    name: "Coconut Milk",
    price: 6.99,
    rating: 4.2,
    image: "coconutMilk.png",
    description: "Refreshing coconut milk ice cream, perfect for a hot day.",
  },
  {
    name: "Sorbet Delight",
    price: 5.99,
    rating: 4.0,
    image: "sorbet.png",
    description: "Fruity and icy sorbet to cleanse your palate.",
  },
  {
    name: "Dairy Free Classic",
    price: 7.49,
    rating: 4.3,
    image: "dairyFree.png",
    description: "Classic taste without the dairy. Smooth and creamy.",
  },
  {
    name: "Dairy Free Almond",
    price: 8.49,
    rating: 4.6,
    image: "dairyFreeAlmond.png",
    description: "Nutty almond goodness in a dairy-free base.",
  }
];

export async function seedFlavors() {
  const flavorsRef = collection(db, "flavors");
  
  // Check if flavors already exist to avoid duplicates
  const snapshot = await getDocs(flavorsRef);
  if (!snapshot.empty) {
    console.log("Database already has flavors. Skipping seed.");
    return;
  }

  console.log("Seeding database with flavors...");
  for (const flavor of sampleFlavors) {
    await addDoc(flavorsRef, flavor);
    console.log(`Added ${flavor.name}`);
  }
  console.log("Seeding complete!");
}
