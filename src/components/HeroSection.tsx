
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
          Authentic Mexican Flavors
        </h2>
        <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
          Fresh ingredients, traditional recipes, and bold flavors delivered fast. 
          Experience the taste of Mexico with every bite.
        </p>
        <Button 
          size="lg"
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3"
        >
          Order Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
