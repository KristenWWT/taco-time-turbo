
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicyLevel?: number;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Beef Taco",
    description: "Seasoned ground beef with lettuce, tomato, cheese, and sour cream",
    price: 3.99,
    category: "Tacos",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    spicyLevel: 1
  },
  {
    id: "2", 
    name: "Carnitas Taco",
    description: "Slow-cooked pork with onions, cilantro, and lime",
    price: 4.49,
    category: "Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    spicyLevel: 2
  },
  {
    id: "3",
    name: "Fish Taco",
    description: "Grilled fish with cabbage slaw and chipotle mayo",
    price: 4.99,
    category: "Tacos", 
    image: "https://images.unsplash.com/photo-1615870216519-2f9fa775b0c4?w=400&h=300&fit=crop",
    spicyLevel: 1
  },
  {
    id: "4",
    name: "Chicken Burrito",
    description: "Grilled chicken, rice, beans, cheese, and salsa wrapped in a flour tortilla",
    price: 8.99,
    category: "Burritos",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    name: "Veggie Burrito", 
    description: "Black beans, rice, peppers, onions, and avocado",
    price: 7.99,
    category: "Burritos",
    image: "https://images.unsplash.com/photo-1574343071812-6beef259a999?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    name: "Guacamole & Chips",
    description: "Fresh made guacamole with tortilla chips",
    price: 5.99,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1541686445856-743348d24cdd?w=400&h=300&fit=crop"
  },
  {
    id: "7",
    name: "Mexican Street Corn",
    description: "Grilled corn with mayo, cheese, chili powder, and lime",
    price: 4.99,
    category: "Sides", 
    image: "https://images.unsplash.com/photo-1621961458348-f013d219b50c?w=400&h=300&fit=crop",
    spicyLevel: 2
  },
  {
    id: "8",
    name: "Horchata",
    description: "Traditional rice and cinnamon drink",
    price: 2.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop"
  }
];

export const categories = ["All", "Tacos", "Burritos", "Sides", "Drinks"];
