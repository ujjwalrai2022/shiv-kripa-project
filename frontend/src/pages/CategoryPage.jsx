import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Space } from "antd";
import { Card } from "antd";
const { Meta } = Card;

function CategoryPage() {
  const { slug } = useParams();
  const [items, setItems] = useState([]);

  const formatTitle = (slug) => {
    return slug
      .split("-") // ["gem", "stone"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // "Gem Stone"
  };

  const CapitalLetter = formatTitle(slug);

  useEffect(() => {
    axios.get(`https://shiv-kripa-project.onrender.com/items`).then((res) => {
      const filtered = res.data.filter((item) => item.slug === slug);
      setItems(filtered);
    });
  }, [slug]);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center ">
      <h1 className="text-3xl font-bold mb-6 ">{CapitalLetter}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id}>
            <Card
              hoverable
              style={{ width: 400 }}
              cover={
                <Image
                  className="rounded-t-lg h-[250px] "
                  loading="lazy"
                  alt="basic"
                  src={item.image_url}
                />
              }
            >
              <Meta
                title={item.title}
                description={
                  <p className="text-sm break-words line-clamp-2">
                    {item.description}
                  </p>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
