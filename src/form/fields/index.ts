export { Field } from "./field";
export { Boolean } from "./boolean";

export function create(id, type) {
  switch(type) {
    case "boolean":
      return new Boolean(id);
    default:
      return null;
  }
}
