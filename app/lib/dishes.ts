export type DishCategory = 'tacos' | 'pizzas' | 'ceviches';

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: DishCategory;
  macros: Macros;
}

export const DISHES: Dish[] = [
  {
    id: 'taco-birria',
    name: 'Taco de Birria',
    price: 3,
    desc: 'Res 80g • Tortilla 25g • Res estofada lentamente en adobo de chiles, con su consomé para mojar. Jugoso, profundo y reconfortante.',
    category: 'tacos',
    macros: {
      calories: 285,
      protein: 18,
      carbs: 22,
      fat: 14,
    },
  },
  {
    id: 'taco-pollo',
    name: 'Taco de Pollo Copal',
    price: 3,
    desc: 'Pollo 75g • Tortilla 25g • Pollo marinado al estilo Copal, dorado y desmenuzado, con toques ahumados y vegetales frescos.',
    category: 'tacos',
    macros: {
      calories: 245,
      protein: 22,
      carbs: 18,
      fat: 10,
    },
  },
  {
    id: 'mini-pizzas',
    name: 'Mini Pizzas Keto (3 und)',
    price: 8,
    desc: 'Tres mini pizzas con base baja en carbohidratos, queso fundido e ingredientes frescos. Todo el antojo, cero culpa.',
    category: 'pizzas',
    macros: {
      calories: 420,
      protein: 28,
      carbs: 12,
      fat: 28,
    },
  },
  {
    id: 'ceviche-180',
    name: 'Ceviche de Róbalo 180 g',
    price: 7,
    desc: 'Róbalo 180g • Róbalo fresco curado en limón con cebolla morada, cilantro y ají. Porción personal, fresca y ligera.',
    category: 'ceviches',
    macros: {
      calories: 165,
      protein: 26,
      carbs: 8,
      fat: 3,
    },
  },
  {
    id: 'ceviche-330',
    name: 'Ceviche de Róbalo 330 g',
    price: 12.5,
    desc: 'Róbalo 330g • Róbalo fresco, cítricos y el punto exacto de picante. Ideal para compartir (o no).',
    category: 'ceviches',
    macros: {
      calories: 305,
      protein: 48,
      carbs: 15,
      fat: 5,
    },
  },
];

export const DISH_IDS = DISHES.map((d) => d.id);
