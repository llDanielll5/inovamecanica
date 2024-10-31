import { v4 as uuidv4 } from "uuid";

export const OpenUrl = (url: string, target?: "_self" | "_blank") => {
  return window.open(url, target, "noopener,noreferrer");
};

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export function maskValue(value: string) {
  const val = value.replace(/[\D]+/g, "");
  var tmp = val + "";
  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  return tmp;
}

export const priceToBrl = (price: number) => {
  return price?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export function generateIdempotencyKey() {
  return uuidv4();
}
