window.addEventListener("DOMContentLoaded", (event) => {
  const datatablesSimple = document.getElementById(
    "datatablesSimple"
  ) as HTMLTableElement;
  if (datatablesSimple) {
    new simpleDatatables.DataTable(datatablesSimple);
  }
});
