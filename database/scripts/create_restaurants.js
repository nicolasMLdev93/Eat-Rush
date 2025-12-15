const { Restaurant } = require("../models");

const create_restaurants = async () => {
  try {
    await Restaurant.create({
      name: "Burger Express",
      description:
        "Hamburguesas gourmet artesanales con ingredientes frescos. Especialistas en smash burgers y papas fritas crujientes.",
      address: "Avenida Comida Rápida 123, Centro",
      phone: "555-1234",
      isActive: true,
    });

    await Restaurant.create({
      name: "Dragon Palace",
      description:
        "Auténtica comida china tradicional y moderna. Especialistas en chop suey, arroz frito y dim sum.",
      address: "Calle Dragón 456, Barrio Chino",
      phone: "555-5678",
      isActive: true,
    });

    await Restaurant.create({
      name: "Pizza Veloz",
      description:
        "Pizzas al horno de leña con masa artesanal. Entrega rápida en 30 minutos o menos.",
      address: "Plaza Italia 789, Zona Norte",
      phone: "555-9012",
      isActive: true,
      userId: 2,
    });

    await Restaurant.create({
      name: "Sweet Delight Bakery",
      description:
        "Pastelería artesanal francesa. Tortas personalizadas, cupcakes, macarons y postres gourmet.",
      address: "Calle Dulce 101, Distrito Gourmet",
      phone: "555-3456",
      isActive: true,
      userId: 1,
    });

    await Restaurant.create({
      name: "Bubble Bliss",
      description:
        "Bubble tea premium, smoothies naturales y café especial. Más de 50 sabores diferentes.",
      address: "Avenida Moderna 202, Zona Trendy",
      phone: "555-7890",
      isActive: true,
      userId: 2,
    });
  } catch (error) {
    console.error("Error al crear restaurantes:", error);
  }
};

create_restaurants();
