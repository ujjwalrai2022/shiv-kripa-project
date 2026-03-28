import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import Footer from "../components/Footer";

function Home() {
  const [categories, setCategories] = useState([]);

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://shiv-kripa-project.onrender.com/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get("https://shiv-kripa-project.onrender.com/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <FloatButton.Group
        trigger="click"
        className="bg-black rounded-full"
        style={{ insetInlineEnd: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          onClick={() =>
            (window.location.href =
              "mailto:ujjwalrai702@gmail.com?subject=Regarding%20your%20Products&body=Hi%20Ujjwal,%20I%20visited%20your%20website...")
          }
          icon={<MailOutlined />}
        />
        <FloatButton
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=9103000643&text=I%20visited%20your%20website%2C%20I%20am%20interested%20in%20your%20product.",
            )
          }
          icon={<WhatsAppOutlined />}
        />
      </FloatButton.Group>
      <FloatButton.BackTop />
      <div className="md:sticky rounded-full top-4 backdrop-blur-lg  z-50">
        <Navbar />
      </div>

      {/* HERO */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-5xl text-gray-800 font-bold">
          Shiv Kripa Photo Framing
        </h1>

        <p className="mt-4 text-gray-500">Choose your category and explore</p>
      </div>

      <Carousel
        autoplay={{ dotDuration: true }}
        arrows
        infinite
        draggable
        className="cursor-pointer"
      >
        {items.map((item) => (
          <div key={item.id}>
            <div className="h-[300px] relative">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div className="justify-center items-center flex m-5">
        <h1 className="text-5xl font-bold ">Catalogue</h1>
      </div>
      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.slug}`)}
            className="cursor-pointer group relative overflow-hidden rounded-xl"
          >
            <img
              src={cat.image_url}
              className="w-full h-64 object-cover group-hover:scale-110 duration-300 ease-in-out transition"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
