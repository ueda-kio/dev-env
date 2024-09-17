const fs = require('fs');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const getTemplate = (str) => `import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const page = \`
${str}
\`;

export default page;`;

const result = {
  error: [],
  success: []
};

/**
 * Escape backQuotation.
 * @param {string} text text to escape
 */
const escape = (text) => {
  return text
    .replaceAll(/(?<=\\)`/g, '\\\\`') // '\`' => '\\\`'
    .replaceAll(/(?<!\\)`/g, '\\`') // '`' => '\`'
    .replaceAll(/`\$\{/g, '`\\$\\{'); // '`${' => '`\$\{'
};

/**
 * Convert html files to tsx files.
 * @param {string} filepath filename with relative path
 */
const ConvertFile = (filepath) => {
  return new Promise((resolve) => {
    const dirAndFile = filepath.split(/(.*)\//).filter(t => t !== '');
    const dir = dirAndFile[0];
    const fileName = dirAndFile[1].replace('.html', '');

    const isExistSameNameFile = fs.existsSync(`src/${dir}/${fileName}.tsx`);
    if (isExistSameNameFile) {
      console.error(`\x1b[31m${fileName}.html: A tsx file with the same name exists in the same directory.`);
      result.error.push(`${fileName}.html`);
      return resolve();
    }

    const text = fs.readFileSync(`src/${filepath}`, 'utf-8');
    const escaped = escape(text);
    const temp = getTemplate(escaped);
    fs.writeFile(`src/${dir}/${fileName}.tsx`, temp, (error) => {
      if (error) {
        console.error(`\x1b[31m${fileName}.html: File creation failed.`);
        result.error.push(`${fileName}.html`);
        return resolve();
      }
      result.success.push(`${fileName}.html`);
      fs.unlink(`src/${filepath}`, (err) => {
        if (err) {
          console.error(err);
        }
        resolve();
      });
    })
  })
};

(async () => {
  // Make new files trackable.
  await exec('git add -N .');
  const res = await exec('git diff --name-only --relative=src');
  if (res.stderr) {
    console.error(`exec error: ${res.stderr}`);
    return;
  }

  const files = res.stdout.split(/\n/).filter((fileName) => /.html$/.test(fileName));
  if (files.length === 0) {
    console.log('No new files to be added.');
    return;
  }

  await Promise.all(files.map((file) => ConvertFile(file)));
  result.success.length && console.log(`\x1b[32mSuccessfully converted to tsx file!: ${result.success}`);
  result.error.length && console.error(`\x1b[31mFailed to converted to tsx file!: ${result.error}`);

  await exec('git add .');
  await exec('git reset HEAD');
})();