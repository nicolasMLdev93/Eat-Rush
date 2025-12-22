import burger_express from "../images/burger_express.jpg";
import dragon_palace from "../images/dragon_palace.jpg";
import pizza_veloz from "../images/pizza_veloz.jpg";
import pasteleria from "../images/pasteleria.jpg";
import cafeteria from "../images/cafeteria.jpg";
import hamburguesa_clasica from "../images/hamburguesa_clasica.jpg";
import hamburguesa_doble from "../images/hamburguesa_doble.jpg";
import hamburguesa_triple from "../images/hamburguesa_triple.jpg";
import pizza_margarita from "../images/pizza_margarita.jpg";
import pizza_peperpni from "../images/pizza_peperoni.jpg";
import pizza_4quesos from "../images/pizza_cuatroquesos.jpg";
import pollo_kung_pao from "../images/pollo_kung_pao.jpg";
import cerdo_ag from "../images/cerdo_agridulce.jpg";
import wonton_soup from "../images/wonton_soup.jpg";
import chow_mein from "../images/chow_mein.jpg";
import tacos from "../images/tacos_alpastor.jpg";
import enchilados from "../images/enchilados_verdes.jpg";
import tiramisu from "../images/tiramisu.jpg";
import browmie from "../images/browmie_conhelado.jpg";
import c_cake from "../images/cheese_cake.jpg";
import cappuccino from "../images/cappuccino.jpg";
import cold_brew from "../images/cold_brew.jpg";
import smooothie from "../images/smoothie.jpg";
import hamburguesa_cat from "../images/hamburguesa_cat.jpg";
import pizzas_cat from "../images/pizza_cat.jpg";
import mexicana_cat from "../images/mexicana_cat.jpg";
import asiatica_cat from "../images/asiatica_cat.jpg";
import ensaladas_cat from "../images/ensalada_cat.jpg";
import postres_cat from "../images/postres_cat.jpg";
import bebidas_cat from "../images/bebidas_cat.jpg";

interface Rest_images {
  id: number;
  image: string;
}

interface Cat_icon {
  id: number;
  icon: string;
}

interface Cat_img {
  id: number;
  image: string;
}

interface Products_images {
  id: number;
  image: string;
}

const restaurants_images: Rest_images[] = [
  { id: 1, image: burger_express },
  { id: 2, image: dragon_palace },
  { id: 3, image: pizza_veloz },
  { id: 4, image: pasteleria },
  { id: 5, image: cafeteria },
];

const products_images: Products_images[] = [
  { id: 1, image: hamburguesa_clasica },
  { id: 2, image: hamburguesa_doble },
  { id: 3, image: hamburguesa_triple },
  { id: 4, image: pizza_margarita },
  { id: 5, image: pizza_peperpni },
  { id: 6, image: pizza_4quesos },
  { id: 7, image: pollo_kung_pao },
  { id: 8, image: cerdo_ag },
  { id: 9, image: wonton_soup },
  { id: 10, image: chow_mein },
  { id: 11, image: tacos },
  { id: 12, image: enchilados },
  { id: 13, image: tiramisu },
  { id: 14, image: browmie },
  { id: 15, image: c_cake },
  { id: 16, image: cappuccino },
  { id: 17, image: cold_brew },
  { id: 18, image: smooothie },
];

const categories_icons: Cat_icon[] = [
  { id: 1, icon: "🍔" },
  { id: 2, icon: "🍕" },
  { id: 3, icon: "🌮" },
  { id: 4, icon: "🍣" },
  { id: 5, icon: "🥗" },
  { id: 6, icon: "🍰" },
  { id: 7, icon: "🥤" },
];

const category_images: Cat_img[] = [
  { id: 1, image: hamburguesa_cat },
  { id: 2, image: pizzas_cat },
  { id: 3, image: mexicana_cat },
  { id: 4, image: asiatica_cat },
  { id: 5, image: ensaladas_cat },
  { id: 6, image: postres_cat },
  { id: 7, image: bebidas_cat },
];

export type { Rest_images, Cat_icon, Products_images };
export {
  restaurants_images,
  categories_icons,
  products_images,
  category_images,
};
