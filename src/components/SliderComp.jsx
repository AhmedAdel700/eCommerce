import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

// React Slick Css Files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick}></div>;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default function SliderComp({
  products,
  btn,
  slider,
  categories,
  sliderProduct,
}) {
  const [likes, setLikes] = useState({}); // Store the like state for each product

  let settings = {
    dots: false,
    infinite: categories ? true : false,
    slidesToShow: categories ? 6 : 5.5,
    slidesToScroll: categories ? 6 : 5,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: categories ? 1 : 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLikeClick = (productId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId], // Toggle like state for the clicked product
    }));
  };

  const renderedProducts = products?.products?.map((product) => {
    return (
      <div key={product.id} className="product">
        <div className="product-img">
          <div className="discount">
            {product.discount ? (
              <div className="discount-percentage">-{product.discount}%</div>
            ) : (
              "0%"
            )}
          </div>

          <div className="like">
            <Box
              tabIndex={0}
              onClick={() => handleLikeClick(product.id)} // Call function on click
            >
              {likes[product.id] ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Box>
            <Link to={`/products/${product.id}`}>
              <Box>
                <RemoveRedEyeOutlinedIcon />
              </Box>
            </Link>
          </div>

          {btn && (
            <div className="add-to-cart">
              <Button
                sx={{
                  width: "100%",
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  textAlign: "center",
                }}
              >
                Add To Cart
              </Button>
            </div>
          )}

          <img
            style={{ maxWidth: "100%" }}
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <h5 className="product-title">{product.title}</h5>
        <div className="price">
          {product.discount && (
            <p>${product.price - product.price * (product.discount / 100)}</p>
          )}
          <p className={product.discount ? "old-price" : ""}>
            ${product.price}
          </p>
        </div>
      </div>
    );
  });

  const renderedCategories = categories?.map((category) => {
    return (
      <Link to={`/category/${category.id}`} key={category.id}>
        <div className="category">
          {category.icon}
          <p>{category.name}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="slider-container">
      <Slider ref={slider} {...settings}>
        {renderedProducts}
        {renderedCategories}
      </Slider>
    </div>
  );
}
