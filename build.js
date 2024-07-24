const fs = require('fs');
const handlebars = require('handlebars');

handlebars.registerHelper("toHex", color => Math.round(color * 255));


function render(filename, data)
{
  const source = fs.readFileSync(filename,'utf8').toString();
  const template = handlebars.compile(source, {noEscape: true});
  return template(data);
}

const colors = JSON.parse(fs.readFileSync("./src/colors.json", 'utf8'));
const css = fs.readFileSync("./src/style.css", 'utf8');

const result = render('./src/index.hbs', { colors, css });

if (!fs.existsSync('build')){
  fs.mkdirSync('build');
}
fs.writeFileSync('build/index.html', result);
fs.copyFileSync('./src/icon.svg', './build/icon.svg')
