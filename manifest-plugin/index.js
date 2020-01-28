const fs = require('fs');
const chalk = require('chalk');

class STMManifestPlugin {

  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {

    const {
      fileName = 'app.manifest',
    } = this.options;

    compiler.hooks.done.tap('Custom Manifest', stats => {

      const { assets, compiler: { outputPath } } = stats.compilation;

      const assetsManifest = Object.keys(assets)
        .map(name => name);

      try {
        const filePath = `${outputPath}/${fileName}`;
        fs.writeFileSync(filePath, assetsManifest.join('\n'));
        console.log(chalk.green.bold('Manifest generated', outputPath));
      } catch (error) {
        console.log(chalk.bold.bgRed('Exception:'), chalk.bold.red(error.message));
      }
    });
  }

}

module.exports = STMManifestPlugin;
