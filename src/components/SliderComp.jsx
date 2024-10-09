import { Link } from "react-router-dom";

// React Slick Css Files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import EastIcon from "@mui/icons-material/East";
// import { Button } from "@mui/material";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "#000", // Set background color
        top: "-20%",
        right: "15%",
      }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        top: "-20%",
        left: "80%",
        color: "#000",
      }}
      onClick={onClick}
    />
  );
}

export default function SliderComp({ products, btn }) {
  let settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5.5,
    slidesToScroll: 5,
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
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
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

          {btn && (
            <div className="add-to-cart">
              <Link
                to={`/products/${product.id}`}
                style={{
                  width: "100%",
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "2.4",
                  textAlign: "center",
                }}
              >
                Add To Cart
              </Link>
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

  return (
    <div className="slider-container">
      <Slider {...settings}>{renderedProducts}</Slider>
    </div>
  );
}
