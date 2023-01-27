export const showToast = (Toastify, message, dispatch) => {
  Toastify({
    text: message,
    className: "info",
    gravity: "bottom",
    position: "left",
    style: {
      background: `white`,
      boxShadow: "none",
      color: "black",
    },
  }).showToast();
  dispatch({ type: "clearMessage" });
  dispatch({ type: "clearErrors" });
};
