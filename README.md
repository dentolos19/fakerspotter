<img alt="Faker Spotter" src="banner.png">

---

Faker Spotter is an interactive toolkit that teaches students how to identify fake news and protect themselves from misinformation online. A secondary school cyberwellness team built it for the National Cyberwellness Advocacy Challenge 2021, where it won a Silver award.

Players work through three escape rooms in the browser, earning points for correct answers and an award at the end. All content is static, and progress is saved on the device, so there are no accounts or server state.

## Features

- **Fact or Opinion**: Decide whether a statement is a fact or an opinion in Room 1.
- **Fake Headlines**: Judge whether a headline is true or fake in Room 2.
- **Fake News**: Judge whether a news article with an image is real or fake in Room 3.
- **Scoring**: Lose points for wrong answers and carry each room's remaining points into the total.
- **Awards**: Earn an award from Cyberwellness Novice to Cyberwellness Arcane Champion based on the final score.
- **Tips**: Read a random cyberwellness tip in every room.

## Tech Stack

- [Vinext](https://github.com/cloudflare/vinext) for running the Next.js App Router on Vite.
- [React](https://react.dev) for the user interface.
- [React Bootstrap](https://react-bootstrap.github.io) and [Bootstrap](https://getbootstrap.com) for layout, components, and styling.
- [SWR](https://swr.vercel.app) for loading the quiz content.
- [React Markdown](https://github.com/remarkjs/react-markdown) for rendering page copy.
- [Cloudflare Workers](https://developers.cloudflare.com/workers) for hosting.
- [Bun](https://bun.sh) for dependencies, linting, formatting, type checking, and tests.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.4 or newer
- [Just](https://just.systems)

### Setup

1. Install dependencies.

   ```sh
   just setup
   ```

2. Start the development server and open http://localhost:3000.

   ```sh
   just start
   ```

## Documentation

- [Cloudflare Development](docs/guides/cloudflare.md)

## License

Licensed under the [MIT License](LICENSE).
