# Product Specifications

## Purpose

Faker Spotter is an interactive online toolkit that teaches students how to identify and protect themselves from fake news on the internet. A secondary school cyberwellness team built it for the National Cyberwellness Advocacy Challenge 2021, where it won a Silver award.

## Users

- Students learning to spot misinformation online.

## Core Features

- **Introduction**: The play page renders [`public/assets/intro.md`](public/assets/intro.md) and resumes the player at the first incomplete room.
- **Room 1**: Players decide whether a statement is a fact or an opinion. The room is worth up to 300 points over 10 questions.
- **Room 2**: Players judge whether a headline is true or fake. The room is worth up to 200 points over 5 questions.
- **Room 3**: Players judge whether a news article with an image is real or fake. The room is worth up to 500 points over 5 questions.
- **Scoring**: Each wrong answer deducts a random number of points from the room total. A room ends when the player answers enough questions correctly or the room total drops below 100, and the remaining points are added to the score.
- **Awards**: The finish page shows an award based on the total score, from Cyberwellness Novice to Cyberwellness Arcane Champion. See [`src/lib/awards.ts`](src/lib/awards.ts). Players can reset their progress and play again.
- **Tips**: Each room shows a random cyberwellness tip from [`public/database/tips.json`](public/database/tips.json).
- **About**: The about page renders [`public/assets/about.md`](public/assets/about.md).

## Scope

- The game runs entirely in the browser. Progress and score are stored in `localStorage` per device.
- There are no accounts, leaderboards, or server-side storage.
- Rooms must be completed in order, and each room can be completed only once per playthrough.
