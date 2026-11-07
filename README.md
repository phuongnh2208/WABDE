# Quiz Arena W-A-B-D-E

## Run locally with VS Code Go Live

The source `index.html` uses React and TypeScript, so it must be built before a static server such as Go Live can serve it.

1. Install dependencies with `npm install`.
2. Build the static app with `npm run build`.
3. Open the generated `dist` folder as a VS Code folder/workspace.
4. Open `dist/index.html` and select **Go Live**.

The build uses relative asset paths, so the generated files work when served from the `dist` folder.

For Vite development with hot reload, run `npm run dev` from the project folder instead.
