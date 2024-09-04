import { querySelector } from "../helpers/selector";
let loader: Element | null = querySelector(".loading");

const displayLoading = (): { error?: string } | void => {
  if (!loader) {
    return { error: "Element loader not found" };
  }
  (loader as HTMLElement).style.display = "block";
};

const hideLoading = () => {
  if (!loader) {
    return { error: "Element loader not found" };
  }
  (loader as HTMLElement).style.display = "none";
};

export { displayLoading, hideLoading };
