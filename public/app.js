function initFlashcards() {
  const stage = document.querySelector(".deck-stage");
  if (!stage) return;

  const cardsData = JSON.parse(stage.dataset.cards);
  let originalCards = cardsData.map(card => ({ ...card }));
  let cards = cardsData.map(card => ({ ...card }));
  let index = 0;
  let flipped = false;

  const cardEl = document.getElementById("card");
  const frontTextEl = document.getElementById("frontText");
  const backTextEl = document.getElementById("backText");
  const counterEl = document.getElementById("counter");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const flipBtn = document.getElementById("flipBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (!cardEl || !frontTextEl || !backTextEl || !counterEl) return;

  function render() {
    if (cards.length === 0) {
      frontTextEl.textContent = "No cards";
      backTextEl.textContent = "Add entries to this deck.";
      counterEl.textContent = "0 / 0";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      flipBtn.disabled = true;
      return;
    }

    const current = cards[index];
    frontTextEl.textContent = current.name;
    backTextEl.textContent = current.info;
    counterEl.textContent = `${index + 1} / ${cards.length}`;

    prevBtn.disabled = false;
    nextBtn.disabled = false;
    flipBtn.disabled = false;

    cardEl.classList.toggle("is-flipped", flipped);
  }

  function setFlipped(value) {
    flipped = value;
    cardEl.classList.toggle("is-flipped", flipped);
  }

  function flip() {
    setFlipped(!flipped);
  }

  function next() {
    index = (index + 1) % cards.length;
    setFlipped(false);
    render();
  }

  function prev() {
    index = (index - 1 + cards.length) % cards.length;
    setFlipped(false);
    render();
  }

  function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    index = 0;
    setFlipped(false);
    render();
  }

  function reset() {
    cards = originalCards.map(card => ({ ...card }));
    index = 0;
    setFlipped(false);
    render();
  }

  cardEl.addEventListener("click", flip);
  cardEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") flip();
  });

  flipBtn.addEventListener("click", flip);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  shuffleBtn.addEventListener("click", shuffle);
  resetBtn.addEventListener("click", reset);

  window.onkeydown = (e) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      flip();
    }
  };

  render();
}

document.addEventListener("DOMContentLoaded", initFlashcards);
document.body.addEventListener("htmx:afterSwap", initFlashcards);