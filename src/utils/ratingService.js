import { db } from '../firebase';
import { doc, getDoc, setDoc, increment, arrayUnion } from 'firebase/firestore';

/**
 * Get rating data for a specific item from Firestore
 * @param {string} itemName - Name of the ice cream item
 * @param {number} defaultRating - Default rating if no rating exists
 * @returns {Promise<Object>} Rating data for the item
 */
export async function getRating(itemName, defaultRating = 0) {
  try {
    const docRef = doc(db, "ratings", itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Calculate average dynamically since we update total/count atomically
      const total = data.total || 0;
      const count = data.count || 0;
      const avg = count > 0 ? total / count : defaultRating;
      
      return {
        ...data,
        avg,
        count,
        total
      };
    } else {
      return {
        avg: defaultRating,
        count: 0,
        total: 0,
        reviews: [],
      };
    }
  } catch (error) {
    console.error("Error fetching rating:", error);
    return {
      avg: defaultRating,
      count: 0,
      total: 0,
      reviews: [],
    };
  }
}

/**
 * Get the average rating for an item, or return default if not found
 * @param {string} itemName - Name of the ice cream item
 * @param {string|number} defaultRating - Default rating to return if no rating exists
 * @returns {Promise<string>} Formatted rating (e.g., "4.5")
 */
export async function getAverageRating(itemName, defaultRating = "0") {
  const rating = await getRating(itemName, Number(defaultRating));
  return (rating.avg !== undefined && rating.avg !== null) ? rating.avg.toFixed(1) : String(defaultRating);
}

/**
 * Submit a new rating for an item to Firestore
 * @param {string} itemName - Name of the ice cream item
 * @param {number} stars - Rating value (1-5)
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} reviewText - Review text
 */
export async function submitRating(itemName, stars, firstName = "", lastName = "", reviewText = "") {
  if (stars === 0) {
    throw new Error("Rating must be greater than 0");
  }

  try {
    const docRef = doc(db, "ratings", itemName);
    
    const newReview = {
      user: `${firstName || "Anonymous"} ${lastName || ""}`.trim(),
      stars: stars,
      text: reviewText || "",
      createdAt: new Date().toISOString()
    };

    // Use atomic updates to increment counters and add review
    // This works even if the client is offline (writes are queued)
    // and avoids the need to read the document first (which fails when offline)
    await setDoc(docRef, {
      total: increment(stars),
      count: increment(1),
      reviews: arrayUnion(newReview),
      // We don't store 'avg' anymore, it's calculated on read
    }, { merge: true });
    
  } catch (error) {
    console.error("Error saving rating to Firestore:", error);
    throw error;
  }
}
