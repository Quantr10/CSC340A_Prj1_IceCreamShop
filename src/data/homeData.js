import almondSundaeImg from "@/images/almondSundae.png";
import coconutMilkImg from "@/images/coconutMilk.png";
import chocoFudgeImg from "@/images/chocoFudge.png";
import sorbetImg from "@/images/sorbet.png";
import dairyFreeImg from "@/images/dairyFree.png";
import dairyFreeAlmondImg from "@/images/dairyFreeAlmond.png";

export const heroImages = {
  main: almondSundaeImg,
  secondary: coconutMilkImg,
  scoops: chocoFudgeImg,
};

export const popularTreats = [
  {
    image: heroImages.main,
    name: "Almond Joy Sundae",
    price: "6.49",
    rating: "4.9",
  },
  {
    image: sorbetImg,
    name: "Berry Sorbet",
    price: "4.89",
    rating: "4.8",
  },
  {
    image: heroImages.secondary,
    name: "Coconut Milk Chocolate Chip",
    price: "5.99",
    rating: "4.9",
  },
];

export const bestSellers = [
  {
    image: dairyFreeImg,
    name: "Dairy Free Classic",
    price: "6.49",
    rating: "4.9",
  },
  {
    image: dairyFreeAlmondImg,
    name: "Dairy Free Almond",
    price: "4.89",
    rating: "4.8",
  },
  {
    image: heroImages.scoops,
    name: "Chocolate Fudge",
    price: "5.99",
    rating: "5.0",
  },
];

export const avatars = [
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/17.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
];

