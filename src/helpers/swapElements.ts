import { Amortization } from "../types";

export function swapElement(array : Amortization[], index1 : number, index2 : number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
