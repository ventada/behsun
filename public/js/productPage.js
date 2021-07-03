const desc = document.querySelector("#desc");
const specs = document.querySelector("#specs");
const detail = document.querySelector("#detail");
const descDiv = document.querySelector(".desc");
const specsDiv = document.querySelector(".specs");
const detailDiv = document.querySelector(".detail");

desc.addEventListener("change", (e) => {
  descDiv.style.display = "block";
  specsDiv.style.display = "none";
  detailDiv.style.display = "none";
});
specs.addEventListener("change", (e) => {
  descDiv.style.display = "none";
  specsDiv.style.display = "block";
  detailDiv.style.display = "none";
});
detail.addEventListener("change", (e) => {
  descDiv.style.display = "none";
  specsDiv.style.display = "none";
  detailDiv.style.display = "block";
});
