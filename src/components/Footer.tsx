
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">🌮</span>
          </div>
          <h4 className="text-2xl font-bold">Fuego Tacos</h4>
        </div>
        <p className="text-gray-400 mb-4">Authentic Mexican cuisine delivered fresh and fast</p>
        <p className="text-sm text-gray-500">
          © 2024 Fuego Tacos. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
