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
  video: string;
  price: number;
  desc: string;
  category: DishCategory;
  macros: Macros;
}

export const DISHES: Dish[] = [
  {
    id: 'taco-birria',
    name: 'Taco de Birria',
    video: '/taco-birria-animation.mp4',
    price: 3,
    desc: 'Res 50g • Tortilla 20g • Res estofada lentamente en adobo de chiles. Carne que se deshace en tu boca. Res cocinada más de 6 horas en una infusión de ajíes secos y especias hasta que cada fibra cede al primer mordisco. Tortilla dorada en su propio consomé aromático, rellena de queso derretido y cilantro fresco. Proteína pura, sin culpas, puro placer.',
    category: 'tacos',
    macros: {
      calories: 179,
      protein: 18,
      carbs: 22,
      fat: 14,
    },
  },
  {
    id: 'taco-pollo',
    name: 'Taco de Pollo Copal',
    video: '/taco-pollo-animation.mp4',
    price: 3,
    desc: `Pollo 50g • Tortilla 20g • Pechuga jugosa marinada 24 horas en pasta de tomate fresca y una mezcla secreta de chiles y ajo. Sellada en la plancha hasta que los bordes crujientes atrapan toda la humedad. Desmenuzada en fibras tiernas que se deshacen con cada mordida. Tortilla de maíz tostada, coronada con pico de gallo ultra fresco. Ligero, balanceado, sin grasas añadidas. Tu proteína limpia de verdad.`,
    category: 'tacos',
    macros: {
      calories: 163,
      protein: 22,
      carbs: 18,
      fat: 10,
    },
  },
  {
    id: 'pizzas-margarita',
    name: 'Pizzas Margarita',
    video: '/pizza-margarita-animation.mp4',
    price: 7.5,
    desc: 'Pollo molido 150g • Mozzarella 24g • Salsa Napolitana 30g • La pizza que siempre quisiste comer sin culpa. Masa 100% de pechuga de pollo molida, horneada hasta quedar crujiente en los bordes y firme en el centro. Cero harinas. Cero gluten. Salsa pomodoro casera sin azúcar añadida, mozzarella bajo en grasa que se derrite en cada bocado. Tomate fresco y albahaca. Es proteína pura disfrazada de pizza. Macros perfectos, sabor impecable. El arma secreta para mantener el antojo bajo control sin romper el déficit.',
    category: 'pizzas',
    macros: {
      calories: 420,
      protein: 28,
      carbs: 12,
      fat: 28,
    },
  },
  {
    id: 'pizzas-primavera',
    name: 'Pizzas Primavera',
    video: '/pizza-primavera-animation.mp4',
    price: 7.5,
    desc: 'Pollo molido 150g • Mozzarella 24g • Salsa Napolitana 30g • Tocineta Ahumada 30g • Maíz enlatado 24g • Masa de pollo 100% proteína, sin harinas ni gluten. La versión más completa: tocineta ahumada que profundiza el sabor, maíz fresco que trae dulzura natural. Proteína doble, vegetales reales, macros perfectos. Cuando quieres más que la clásica.',
    category: 'pizzas',
    macros: {
      calories: 420,
      protein: 28,
      carbs: 12,
      fat: 28,
    },
  },
  {
    id: 'pizzas-funghi-pomodoro',
    name: 'Pizzas Funghi-Pomodoro',
    video: '/pizza-funghi-pomodoro-animation.mp4',
    price: 7.5,
    desc: 'Pollo molido 150g • Mozzarella 24g • Salsa Napolitana 30g • Vegetales 30g • La pizza que suena a restaurante italiano. Masa de pollo 100% proteína, sin harinas ni gluten. Champiñones salteados que aportan umami profundo, tomates secos concentrados en sabor, salsa pomodoro fresca. La prueba de que comer sano no significa comer aburrido.',
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
    name: 'Ceviche de Róbalo Peq.',
    video: '/ceviche-animation.mp4',
    price: 7,
    desc: 'Róbalo 180g • Casabe 30g • Róbalo blanco curado al momento en limón puro. Cebolla morada en plumas finas, cilantro fresco, un toque de ají. Proteína magra de digestión rápida, cero grasas añadidas. Refrescante, ligero, perfecto para recuperar post-entreno sin pesadez. Tu opción elegante cuando quieres algo diferente.',
    category: 'ceviches',
    macros: {
      calories: 445,
      protein: 26,
      carbs: 8,
      fat: 3,
    },
  },
  {
    id: 'ceviche-330',
    name: 'Ceviche de Róbalo Grd.',
    video: '/ceviche-animation.mp4',
    price: 12.5,
    desc: 'Róbalo 330g • Casabe 30g • La versión generosa del clásico. Doble porción de róbalo blanco curado en su punto exacto. Mismo frescor, mismo sabor limpio, más saciedad. El arma secreta para recuperación post-copa.',
    category: 'ceviches',
    macros: {
      calories: 649,
      protein: 48,
      carbs: 15,
      fat: 5,
    },
  },
];

export const DISH_IDS = DISHES.map((d) => d.id);
