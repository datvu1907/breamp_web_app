import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import Modal from "../components/Modal/Modal";
import Profile from "../components/Profile/Profile";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { nftCollectionRef } from "../api/firestore-collection";
import { database } from "../firebase";

const InitialState = {
  img: " ",
};

const Home = () => {
  const [nft, setNft] = useState([]);
  useEffect(() => {
    // console.log(user.id);

    const queryData = query(
      nftCollectionRef,
      where("owner", "==", "Kl1d3KB5YghEzKoUY7iW1IAuPw42")
    );
    const unsubscribe = onSnapshot(
      queryData,
      { includeMetadataChanges: true },
      (snapshot) => {
        console.log(snapshot.docs);
        setNft(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        console.log(nft[0].data.image);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Header />

      <Profile />
      <section class="gallery min-vh-100">
        <div class="container-lg">
          <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
            {nft.map((element) => (
              <div class="col" key={element.id}>
                <img
                  src={element.data.image}
                  class="gallery-item"
                  alt="gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#imageExample"
                ></img>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
