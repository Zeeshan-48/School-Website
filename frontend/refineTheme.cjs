const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components', 'admin');
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

const allFiles = [...getFiles(directoryPath), ...getFiles(pagesPath)];

const replacements = {
  'divide-slate-700/60': 'divide-gray-200',
  'hover:bg-slate-750/60': 'hover:bg-gray-50',
  'hover:bg-slate-750': 'hover:bg-gray-50',
  'bg-amber-950 text-amber-300 border-amber-800': 'bg-amber-50 text-amber-700 border-amber-200',
  'bg-amber-950': 'bg-amber-50',
  'text-amber-300': 'text-amber-700',
  'border-amber-800': 'border-amber-200',
  'bg-rose-950 text-rose-300 border-rose-800': 'bg-rose-50 text-rose-700 border-rose-200',
  'bg-rose-950': 'bg-rose-50',
  'text-rose-300': 'text-rose-700',
  'border-rose-800': 'border-rose-200',
  'bg-blue-950 text-blue-300 border-blue-800': 'bg-blue-50 text-blue-700 border-blue-200',
  'bg-blue-950': 'bg-blue-50',
  'text-blue-300': 'text-blue-700',
  'text-blue-400': 'text-blue-700',
  'border-blue-800': 'border-blue-200',
  'hover:text-blue-400': 'hover:text-blue-700',
  'bg-gray-100 text-gray-600 hover:text-white': 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
  'bg-gray-100 text-gray-700 hover:text-white': 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900',
  'bg-surface/60': 'bg-white',
  'bg-surface border': 'bg-white border',
  'text-rose-400 hover:text-white': 'text-rose-600 hover:text-rose-700',
  'bg-rose-600': 'bg-rose-600', // fine
  'bg-rose-500/10': 'bg-rose-50',
  'border-rose-500/30': 'border-rose-200',
  'border-rose-500/40': 'border-rose-200',
  'bg-emerald-500/20': 'bg-green-100',
  'border-emerald-500/40': 'border-green-200',
  'hover:text-rose-400': 'hover:text-rose-600',
  'bg-rose-500/20': 'bg-rose-100',
  'text-rose-400': 'text-rose-600',
};

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace literal string matches
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
