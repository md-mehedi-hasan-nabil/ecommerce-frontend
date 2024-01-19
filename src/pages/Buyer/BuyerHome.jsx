import { Helmet } from "react-helmet-async";
import Categories from "../../components/Buyer/Categories";
import Hero from "../../components/Buyer/Hero";
import Products from "../../components/Buyer/Products";
import SpecialOffer from "../../components/Buyer/SpecialOffer";
import FeaturedCategory from "../../components/Buyer/FeaturedCategory";
import ContactForm from "../../components/Buyer/ContactForm";
import FilterProductByCategory from "../../components/Buyer/FilterProductByCategory";
import bestProduct from "../../assets/best-selling-product.jpg";

export default function BuyerHome() {
  return (
    <>
      <Helmet>
        <title>Ecommerce | Dream Drops</title>
      </Helmet>
      <Hero />
      <Categories />
      <FeaturedCategory />
      <div className="grid grid-cols-12 gap-8 mt-5">
        <div className="col-span-12 md:col-span-4">
          <SpecialOffer />
        </div>
        <div className="col-span-12 md:col-span-8">
          <Products />
        </div>
      </div>
      <div
        className="flex items-center h-96 bg-cover bg-no-repeat my-8 rounded-lg"
        style={{ background: `url(${bestProduct})` }}
      >
        <div className="pl-12">
          <h3 className="text-slate-100 text-5xl font-semibold">
            Enhance Your Music <br /> Experience
          </h3>
        </div>
      </div>
      <FilterProductByCategory />
      <ContactForm />
    </>
  );
}
