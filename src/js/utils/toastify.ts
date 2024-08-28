import Toastify from "toastify-js";
import 'toastify-js/src/toastify.css';

const showSuccess = ({text}) => {
  showToastify(text, "toastify-success");
};

const showError = ({text}) => {
  showToastify(text, "toastify-danger");
};

const showToastify = (text, state, duration = 2000) => {
  Toastify({
    text: text,
    duration: duration,
    newWindow: true,
    gravity: "center",
    position: "right",
    stopOnFocus: true,
    className: state,
  }).showToast();
};

export { showSuccess, showError };
