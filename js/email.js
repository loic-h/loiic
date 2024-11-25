export default () => {
  const anchor = document.getElementById("contact");
  const email = "example@mail.com";
  anchor?.setAttribute("href", "mailto:".concat(window.atob(window.btoa(email))));
};
