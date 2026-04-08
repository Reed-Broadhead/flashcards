const express = require("express");
const path = require("path");
const app = express();

const decks = require("./data/decks");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const deckNames = Object.keys(decks);
  const activeDeck = deckNames[0];
  const cards = decks[activeDeck];

  res.render("index", {
    deckNames,
    activeDeck,
    cards
  });
});

app.get("/deck/:deckName", (req, res) => {
  const { deckName } = req.params;
  const cards = decks[deckName];

  if (!cards) {
    return res.status(404).send("<p>Deck not found.</p>");
  }

  res.render("partials/deck-stage", {
    activeDeck: deckName,
    cards
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});