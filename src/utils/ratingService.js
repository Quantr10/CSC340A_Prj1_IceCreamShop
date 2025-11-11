const STORAGE_KEY = "ratings";

/**
 * Get all ratings from localStorage
 * @returns {Object} All ratings data
 */
export function getAllRatings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    console.error("Error reading ratings from localStorage:", error);
    return {};
  }
}

/**
 * Get rating data for a specific item
 * @param {string} itemName - Name of the ice cream item
 * @param {number} defaultRating - Default rating if no rating exists
 * @returns {Object} Rating data for the item
 */
export function getRating(itemName, defaultRating = 5) {
  const allRatings = getAllRatings();
  const itemRating = allRatings[itemName];
  
  if (!itemRating) {
    return {
      avg: defaultRating,
      count: 0,
      total: 0,
      reviews: [],
    };
  }
  
  return itemRating;
}

/**
 * Get the average rating for an item, or return default if not found
 * @param {string} itemName - Name of the ice cream item
 * @param {string|number} defaultRating - Default rating to return if no rating exists
 * @returns {string} Formatted rating (e.g., "4.5")
 */
export function getAverageRating(itemName, defaultRating = "5") {
  const rating = getRating(itemName, Number(defaultRating));
  return rating.avg ? rating.avg.toFixed(1) : String(defaultRating);
}

/**
 * Submit a new rating for an item
 * @param {string} itemName - Name of the ice cream item
 * @param {number} stars - Rating value (1-5)
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} reviewText - Review text
 */
export function submitRating(itemName, stars, firstName = "", lastName = "", reviewText = "") {
  if (stars === 0) {
    throw new Error("Rating must be greater than 0");
  }

  const allRatings = getAllRatings();
  const current = allRatings[itemName] || { total: 0, count: 0, reviews: [] };

  current.total += stars;
  current.count += 1;
  current.avg = current.total / current.count;
  
  if (reviewText || firstName || lastName) {
    current.reviews.push({
      user: `${firstName || "Anonymous"} ${lastName || ""}`.trim(),
      stars: stars,
      text: reviewText,
    });
  }

  allRatings[itemName] = current;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allRatings));
  } catch (error) {
    console.error("Error saving rating to localStorage:", error);
    throw new Error("Failed to save rating");
  }
}

