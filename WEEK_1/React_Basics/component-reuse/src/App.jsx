import Cards from "./Cards";
import carImage from './assets/innova.jpg';
import carImage1 from './assets/honda.jpg';
import carImage2 from './assets/virtus.jpg';
import bikeImage from './assets/hondacb.jpg'
import bikeImage1 from './assets/tvsapache.jpg'
import bikeImage2 from './assets/ktmduke.jpg'

function App() {

  const cars = [
    {
      image: carImage,
      title: "Toyota Innova",
      para: "A reliable family MPV with comfort and power."
    },
    {
      image: carImage1,
      title: "Honda City",
      para: "A stylish sedan known for performance and mileage."
    },
    {
      image: carImage2,
      title: "VW Virtus",
      para: "A sporty sedan with solid build quality and performance."
    }
  ];

  const bikes = [
  {
    image: bikeImage,
    title: "Honda CB 350 H'ness",
    para: "A smooth and reliable street bike known for refinement and comfort."
  },
  {
    image: bikeImage1,
    title: "TVS Apache 310 RTR",
    para: "A performance-oriented bike with sharp handling and styling."
  },
  {
    image: bikeImage2,
    title: "KTM Duke 250",
    para: "A naked streetfighter delivering raw power and thrilling acceleration."
  }
];

  return (
    <>
      <h1>Cars</h1>
      {cars.map((car, index) => (
        <Cards
          key={index}
          carImage={car.image}
          title={car.title}
          para={car.para}
        />
      ))}
      <h1>Bikes</h1>
      {bikes.map((bike, index) => (
      <Cards
        key={index}
        carImage={bike.image}   // prop name stays the same
        title={bike.title}
        para={bike.para}
      />
    ))}
    </>
  );
}

export default App;
