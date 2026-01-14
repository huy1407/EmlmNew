import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export default function useResponsiveColumns(breakpoint = 768) {
  const calc = () => {
    const { width } = Dimensions.get("window");
    return width >= breakpoint ? 2 : 1;
  };

  const [columns, setColumns] = useState(calc());

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", () => {
      setColumns(calc());
    });

    return () => {
      if (sub?.remove) sub.remove();
    };
  }, [breakpoint]);

  return columns;
}
