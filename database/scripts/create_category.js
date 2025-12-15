const { Category } = require("../models");

const create_category = async () => {
  try {
    const categories = [
      { name: "Hamburguesas", isActive: true },
      { name: "Pizzas", isActive: true },
      { name: "Comida Mexicana", isActive: true },
      { name: "Comida Asiática", isActive: true },
      { name: "Ensaladas y Saludable", isActive: true },
      { name: "Postres y Dulces", isActive: true },
      { name: "Bebidas", isActive: true },
    ];
    await Category.bulkCreate(categories);
  } catch (error) {
    console.error("Error al crear categorias de productos:", error);
  }
};

create_category();
