// npm can hide dependency lifecycle output. Never read stdin or write project
// files here: CI and package managers may run this without a terminal.
if (!process.env.CI && !process.env.DWI_HIDE_WELCOME) {
  console.log('\nDesign with Intent is ready.\nFrom your website project, run: npx design-with-intent setup\nChoose your agent, describe your product, and shape its design and motion.\nFor a visible install welcome: npm install -D design-with-intent --foreground-scripts\n');
}
