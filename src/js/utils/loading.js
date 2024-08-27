import { querySelector } from "../helpers/selector";
let loader = querySelector(".loading");

const displayLoading = () => {
  loader.style.display = 'block';
};

const hideLoading = () => {
  loader.style.display = 'none';
};

export { displayLoading, hideLoading };
