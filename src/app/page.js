import Image from "next/image";
import Hero from "./components/Hero";
import PopularProduct from "./components/PopularProduct";
import Hero2 from "./components/Hero2";
import Feature from "./components/Feature";


export default async function Home() {
 
  return (
    <div>
      <Hero />
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">Popular Products</h1>
      <PopularProduct/>
      <Hero2 />
      <Feature/>
     
    </div>
  );
}
