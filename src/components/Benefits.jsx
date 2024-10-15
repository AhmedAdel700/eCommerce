import { Stack } from "@mui/material";

export default function Benefits() {
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
    <Stack
      direction={"row"}
      justifyContent={"center"}
      className="our-benefits"
      data-aos="fade-right"
    >
      {benefits}
    </Stack>
  );
}
