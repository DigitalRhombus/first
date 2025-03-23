import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Img1 from "../assets/about_img1.jfif";
import Img2 from "../assets/about_img2.jfif";
import Img3 from "../assets/about_img3.jfif";
import HImg from "../assets/about_heading_img.jfif";

const About = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HImg})` ,zIndex:1}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg">The Essence of Timeless Luxury</h1>
          <p className="text-lg max-w-2xl mt-2">
            Experience the art of fine jewellery, crafted to perfection with elegance and grace.
          </p>
          <Button variant="light" className="mt-4 px-4 py-2 text-lg font-semibold rounded-full">
            Explore Collection
          </Button>
        </div>
      </div>

      {/* About Us Section */}
      <Container className="py-20 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">Our Story</h2>
        <p className="text-lg text-gray-600 mt-4 mx-auto max-w-2xl">
          At <span className="font-bold text-gray-900">Royal Gems</span>, we blend artistry and tradition 
          to create exquisite pieces that transcend time. Our commitment to excellence ensures every 
          piece is crafted with precision and passion.
        </p>
      </Container>

      {/* Why Choose Us Section */}
      <Container className="py-10">
        <Row className="" style={{display:"flex", justifyContent:"center",flexDirection:"row",flexWrap:"wrap"}}>
          {[
            { title: "Exquisite Craftsmanship", img: Img1 },
            { title: "Certified Authenticity", img: Img2 },
            { title: "Exclusive Custom Designs", img: Img3 },
          ].map((item, index) => (
            <Col key={index} md={4} sm={6} className="d-flex justify-content-center">
              <Card className="shadow-lg rounded-lg overflow-hidden border-0 text-center" style={{ maxWidth: "350px" }}>
                <Card.Img variant="top" src={item.img} style={{ height: "300px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title className="text-xl font-bold text-gray-800">{item.title}</Card.Title>
                  <Card.Text className="text-gray-600">
                    Our artisans bring their decades of expertise to create luxurious jewellery that is truly one of a kind.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Customer Trust Section */}
      <div className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl font-semibold">Trusted by Thousands</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Our commitment to quality and customer satisfaction has earned us the trust of connoisseurs worldwide.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-6">
          {[
            { text: "💎 10,000+ Happy Clients" },
            { text: "🌍 Global Shipping" },
            { text: "🏆 Award-Winning Designs" },
          ].map((item, index) => (
            <div key={index} className="text-2xl font-bold">{item.text}</div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Container className="py-20 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="text-lg text-gray-600 mt-4 mx-auto max-w-2xl">
          Have questions? Our experts are here to assist you with any inquiries.
        </p>
        <Button variant="dark" className="mt-6 px-5 py-2 text-lg font-semibold rounded-full">
          Contact Us
        </Button>
      </Container>
    </div>
  );
};

export default About;
