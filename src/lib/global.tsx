import { CarTaxiFront, Container, ShoppingBag } from "lucide-react";

export const EMPTY_TABLE_DATA = [
  {
    id: "Product",
    title: "No purchased products",
    description: "This customer hasn't purchased any products yet.",
    icon: <ShoppingBag size={44} />,
    actionButton: {
      label: "Add New Asset",
      location: "/assets/add-asset",
    },
  },
  {
    id: "Applications",
    title: "No applications available",
    description: "There are no applications available at the moment.",
    icon: <Container size={44} />,
  },
  {
    id: "Agents",
    title: "No agents found",
    description: "There are no agents available at the moment.",
    icon: <Container size={44} />,
  },
];
