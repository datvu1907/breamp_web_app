import { collection } from "firebase/firestore";
import { database } from "../firebase";

export const nftCollectionRef = collection(database, "collectionNFT");
