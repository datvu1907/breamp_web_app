import React, { useEffect, useState, useContext } from "react";
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
import { auth, AuthContext, signInWithTwitter } from "../firebase";

const InitialState = {
  img: " ",
};

const token = localStorage.getItem("token");

const Home = () => {
  const [status, checkStatus] = useState(auth.currentUser);
  const [nft, setNft] = useState([]);
  // const [currentUser] = useContext(AuthContext);
  // console.log("sdsdad" , currentUser);

  const handleOnClickLogin = () => {
    signInWithTwitter();
  };

  useEffect(() => {
    // console.log(user.id);
    console.log("AAAA", status);
    if (auth.currentUser != null) {
      const queryData = query(
        nftCollectionRef,
        where("owner", "==", status.uid)
      );
      const unsubscribe = onSnapshot(
        queryData,
        { includeMetadataChanges: true },
        (snapshot) => {
          snapshot.docs.sort((a, b) => b.data.createdOn - a.data.createdOn);

          // console.log(snapshot.docs);
          const temp = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          temp.sort((a, b) => b.data.createdOn - a.data.createdOn);

          setNft(temp);
          // console.log(nft[0].data.image);
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [status]);

  useEffect(() => {
    if (token !== undefined) {
      console.log(token);
    }
  }, [token]);

  return (
    <div>
      <Header handleOnClickLogin={handleOnClickLogin} />

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
