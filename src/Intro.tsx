import ProductList from './components/ProductList';
import FooterBasic from './components/Footer';
import Hero from './components/HeroBanner';

function Intro() {
  return (
    <div className="my-6 w-full m-auto">
      <Hero></Hero>
      <ProductList />
      <FooterBasic></FooterBasic>
    </div>
  );
}
export default Intro;
