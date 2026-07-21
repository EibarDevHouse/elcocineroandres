export type DishCategory = 'tacos' | 'pizzas' | 'ceviches';

export interface Dish {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: DishCategory;
}

export const DISHES: Dish[] = [
  {
    id: 'taco-birria',
    name: 'Taco de Birria',
    price: 3,
    desc: 'Res estofada lentamente en adobo de chiles, sobre tortilla de maíz, con su consomé para mojar. Jugoso, profundo y reconfortante.',
    category: 'tacos',
  },
  {
    id: 'taco-pollo',
    name: 'Taco de Pollo Copal',
    price: 3,
    desc: 'Pollo marinado al estilo Copal, dorado y desmenuzado, con toques ahumados y vegetales frescos. Ligero y lleno de sabor.',
    category: 'tacos',
  },
  {
    id: 'mini-pizzas',
    name: 'Mini Pizzas Keto (3 und)',
    price: 8,
    desc: 'Tres mini pizzas con base baja en carbohidratos, queso fundido e ingredientes frescos. Todo el antojo, cero culpa.',
    category: 'pizzas',
  },
  {
    id: 'ceviche-180',
    name: 'Ceviche de Róbalo 180 g',
    price: 7,
    desc: 'Róbalo fresco curado en limón con cebolla morada, cilantro y ají. Porción personal, fresca y ligera.',
    category: 'ceviches',
  },
  {
    id: 'ceviche-330',
    name: 'Ceviche de Róbalo 330 g',
    price: 12.5,
    desc: 'Nuestra porción grande del clásico: róbalo fresco, cítricos y el punto exacto de picante. Ideal para compartir (o no).',
    category: 'ceviches',
  },
];

export const DISH_IDS = DISHES.map((d) => d.id);
