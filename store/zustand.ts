// import { costBlockSchema } from "@/lib/validationSchema";
// import * as z from "zod";
// import { create } from "zustand";

// // const items = [
// //   { name: "home_size", value: 21, description: "" },
// //   { name: "maintaince_cost", value: 193, description: "" },
// // ];

// type CostBlockStore = {
//   items: z.infer<typeof costBlockSchema>[];
//   add: (item: z.infer<typeof costBlockSchema>) => void;
//   remove: (itemName: string) => void;
//   removeAll: () => void;
//   setAll: (items: z.infer<typeof costBlockSchema>[]) => void;
// };

// export const useCostBlockStore = create<CostBlockStore>((set) => ({
//   items: [],
//   add: (item) => set((state) => ({ items: [...state.items, item] })),
//   remove: (itemName) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.name !== itemName),
//     })),
//   removeAll: () => set({ items: [] }),
//   setAll: (items) => set({ items }),
// }));
