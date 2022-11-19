const fs = require('fs');
const chalk = require('chalk');
const lodash = require('lodash');

class STMManifestPlugin {

  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {

    const {
      fileName = 'app.manifest',
    } = this.options;

    compiler.hooks.done.tap('Custom Manifest', stats => {

      const {
        assets,
        compiler: { outputPath },
      } = stats.compilation;

      const assetsManifest = [
        'CACHE MANIFEST',
        '',
        'CACHE:',
        ...lodash.orderBy(Object.keys(assets)),
        '',
        'NETWORK:',
        '*',
        '',
        `# hash: ${(new Date()).toJSON()}`,
      ];

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
