import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/home/Banner";
import BestSellers from "@/components/home/BestSellers";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WomenDupes from "@/components/home/WomenDupes";
import MenDupes from "@/components/home/MenDupes";
import FirstCopies from "@/components/home/FirstCopies";
import Makeup from "@/components/home/Makeup";
import Brumes from "@/components/home/Brumes";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <BestSellers />
      <FeaturedProducts />
      <WomenDupes />
      <MenDupes />
      <FirstCopies />
      <Makeup />
      <Brumes />
      <Footer />
    </div>
  );
}
