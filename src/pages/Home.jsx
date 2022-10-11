import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import Modal from "../components/Modal/Modal";
import Profile from "../components/Profile/Profile";
const Home = () => {
  return (
    <div>
      
        <Header />
      
      <Profile />
      <section class="gallery min-vh-100">
        <div class="container-lg">
          <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
            <div class="col">
              <img
                src="./Image/mate1.png"
                class="gallery-item"
                alt="gallery"
                data-bs-toggle="modal"
                data-bs-target="#imageExample"
              ></img>
              <Modal />
            </div>
            <div class="col">
              <img
                src="./Image/mate2.png"
                class="gallery-item"
                alt="gallery"
              ></img>
            </div>
            <div class="col">
              <img
                src="./Image/mate3.png"
                class="gallery-item"
                alt="gallery"
              ></img>
            </div>
            <div class="col">
              <img
                src="./Image/mate4.png"
                class="gallery-item"
                alt="gallery"
              ></img>
            </div>
            <div class="col">
              <img
                src="./Image/mate5.png"
                class="gallery-item"
                alt="gallery"
              ></img>
            </div>
            <div class="col">
              <img
                src="./Image/mate6.png"
                class="gallery-item"
                alt="gallery"
              ></img>
            </div>
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
