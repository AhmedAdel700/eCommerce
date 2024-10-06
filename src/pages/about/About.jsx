import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./about.css";

export default function About() {
  const arrayOfServices = [
    {
      img: "../../images/Services.png",
      num: "10.5k",
      type: "Sallers active our site",
    },
    {
      img: "../../images/Services (1).png",
      num: "33k",
      type: "Mopnthly Produduct Sale",
    },
    {
      img: "../../images/Services (2).png",
      num: "45.5k",
      type: "Customer active in our site",
    },
    {
      img: "../../images/Services (3).png",
      num: "25k",
      type: "Anual gross sale in our site",
    },
  ];

  const services = arrayOfServices.map((service) => {
    return (
      <div className="service" key={service.num}>
        <img loading="lazy" src={service.img} alt={service.type} />
        <h2>{service.num}</h2>
        <p>{service.type}</p>
      </div>
    );
  });

  const teamData = [
    {
      img: "../../images/Frame 874.png",
      name: "Tom Cruise",
      position: "Founder & Chairman",
      icon1: "../../images/Group.png",
      icon2: "../../images/Group (1).png",
      icon3: "../../images/Group (2).png",
    },
    {
      img: "../../images/Frame 875.png",
      name: "Emma Watson",
      position: "Managing Director",
      icon1: "../../images/Group.png",
      icon2: "../../images/Group (1).png",
      icon3: "../../images/Group (2).png",
    },
    {
      img: "../../images/Frame 876.png",
      name: "Will Smith",
      position: "Product Designer",
      icon1: "../../images/Group.png",
      icon2: "../../images/Group (1).png",
      icon3: "../../images/Group (2).png",
    },
  ];

  const team = teamData.map((memeber) => {
    return (
      <div key={memeber.name} className="memeber">
        <img src={memeber.img} alt={memeber.name} loading="lazy" />
        <h2>{memeber.name}</h2>
        <p>{memeber.position}</p>

        <div className="social-media">
          <img src={memeber.icon1} alt="X" />
          <img src={memeber.icon2} alt="Instagram" />
          <img src={memeber.icon3} alt="Linkedin" />
        </div>
      </div>
    );
  });

  const arrayOfBenefits = [
    {
      img: "../../images/Services (4).png",
      name: "FREE AND FAST DELIVERY",
      text: "Free delivery for all orders over $140",
    },
    {
      img: "../../images/Services (5).png",
      name: "24/7 CUSTOMER SERVICE",
      text: "Friendly 24/7 customer support",
    },
    {
      img: "../../images/Services (6).png",
      name: "MONEY BACK GUARANTEE",
      text: "We reurn money within 30 days",
    },
  ];

  const benefits = arrayOfBenefits.map((benefit) => {
    return (
      <div key={benefit.name} className="benefit">
        <img src={benefit.img} alt={benefit.name} loading="lazy" />
        <h2>{benefit.name}</h2>
        <p>{benefit.text}</p>
      </div>
    );
  });

  return (
    <section className="about">
      <Stack direction={"row"} alignItems={"center"} className="link">
        <Link
          to="/"
          style={{
            color: "var(--text-color)",
            marginRight: "10px",
          }}
        >
          Home
        </Link>
        / About
      </Stack>

      <Box className="contanier">
        <article>
          <h1>Our Story</h1>

          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region
          </p>

          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </article>

        <aside>
          <img loading="lazy" src="../../images/girls.png" alt="girls pic" />
        </aside>
      </Box>

      <Box className="services"> {services}</Box>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="team"
      >
        {team}
      </Stack>

      <Stack
        className="dots"
        direction={"row"}
        justifyContent={"center"}
        gap={2}
        sx={{ margin: "0 auto" }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Stack>

      <Stack direction={"row"} justifyContent={"center"}className="our-benefits">
        {benefits}
      </Stack>
    </section>
  );
}
