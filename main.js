import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
//Form gönderildiğinde  api'ye istek atip cevabi ekrana yazar
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); //sayfanın yenilenmesini engeller.
  const query = e.target[0].value; //Inputun  degerine ulasir
  //Inputa girilen değer boş ise fonksiyonu  durdurur
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!");
    return;
  }

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query);
});
//Sayfa yüklendiginde api'ye istek atıp popüler müzikleri getirir
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //müziğin urlini htmle aktarma
  elements.audioSource.src = url;
  //audio elementinin müzigi yüklenmesini saglar
  elements.audio.load();
  //audio elementinin müzigi oynatmasını saglar
  elements.audio.play();
};

//Listelere tiklaninca calisir
const handleClick = (e) => {
  console.log("tıklanıldı");
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");
    renderPlayingInfo(parent.dataset);
    console.log(parent.dataset);
    //Müzigi calar
    playMusic(parent.dataset.url);
  }
};
//Liste alanındaki tiklamalari izler
document.addEventListener("click", handleClick);

// Fotoyu dondurme
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};
// img  eklenen animate classını kaldirma
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
//Müzigi calma ve durdurma olaylarini izleme
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
