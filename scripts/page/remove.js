const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
let pages = JSON.parse(fs.readFileSync('pages.json').toString());
const pageName = process.argv[2];
if (!pageName) {
    console.log('Укажите имя страницы');
    return;
}
const pageDir = path.join('src', 'pages', pageName);
if (!fs.existsSync(pageDir)) {
    console.log(`Страницы ${pageName} не существует`);
    return;
}
pages = pages.filter(componentData => componentData.name !== pageName);
fs.writeFileSync('pages.json', JSON.stringify(pages));
rimraf.sync(pageDir);

const commonJsFilePath = path.join('src', 'common', 'common.js');
let commonJsContent = fs.readFileSync(commonJsFilePath).toString();
commonJsContent = commonJsContent.replace(`import '../pages/${pageName}/animations';\n`, '');
commonJsContent = commonJsContent.replace(`import '../pages/${pageName}/${pageName}';\n`, '');
fs.writeFileSync(commonJsFilePath, commonJsContent);

console.log(`Страница ${pageName} удалена`);