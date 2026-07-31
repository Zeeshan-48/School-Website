const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src', 'pages', 'admin');

function getFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, filesList);
    } else if (filePath.endsWith('.jsx')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

const allFiles = getFiles(pagesPath);

const replacements = {
  'bg-purple-950 text-purple-300 border-purple-800': 'bg-purple-50 text-purple-700 border-purple-200',
  'bg-purple-950': 'bg-purple-50',
  'text-purple-300': 'text-purple-700',
  'text-purple-400': 'text-purple-700',
  'border-purple-800/60': 'border-purple-200',
  'border-purple-800': 'border-purple-200',
  
  'bg-teal-950 text-teal-300 border-teal-800': 'bg-teal-50 text-teal-700 border-teal-200',
  'bg-teal-950': 'bg-teal-50',
  'text-teal-300': 'text-teal-700',
  'text-teal-400': 'text-teal-700',
  'border-teal-800/60': 'border-teal-200',
  'border-teal-800': 'border-teal-200',
  
  'bg-orange-950 text-orange-300 border-orange-800': 'bg-orange-50 text-orange-700 border-orange-200',
  'bg-orange-950': 'bg-orange-50',
  'text-orange-300': 'text-orange-700',
  'text-orange-400': 'text-orange-700',
  'border-orange-800/60': 'border-orange-200',
  'border-orange-800': 'border-orange-200',
};

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
