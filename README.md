# Duy Pham's website

Personal projects and interactive chemistry tools.

Open `index.html` in a browser, or serve this directory with any static web server. The homepage is a personal desktop with movable windows, notes, tasks, pets, Snake, a terminal, and trash jokes. It uses JavaScript and browser storage; the pixel font loads from Google Fonts.

## Projects

- [Personal Homepage](index.html): the desktop website itself.
- [Ideal Gas Law](simulations/ideal-gas-law/index.html): gas-law relationships, particle motion, and graphs.
- [Electron Configuration](simulations/electron-configuration/index.html): ground-state filling from hydrogen through calcium.
- [Build an Atom](simulations/build-an-atom/index.html): elements, isotopes, and ions from hydrogen through neon.

## Publishing

Pushing this repository does not publish a website. The included GitHub Pages workflow runs only when started manually. When ready to publish, set the repository's Pages source to **GitHub Actions**, then run **Publish website** from the Actions tab. It uploads only the homepage and the `simulations/` directory.

## Checks

With Node.js installed, run `node check.cjs` to check local links, representative atom actions, electron configurations, and gas-law relationships. Browser checks are also needed when changing layouts or controls.

## Attribution

The original educational content and interfaces in all three simulations use the shared [CC BY-NC-SA 4.0 license](simulations/LICENSE.md). The embedded font and icon notices in Electron Configuration retain their respective licenses. The simulation license does not apply to the rest of this repository.
