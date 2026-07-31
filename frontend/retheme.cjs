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
  'bg-slate-900': 'bg-surface',
  'bg-slate-800/90': 'glass-nav',
  'bg-slate-800/95': 'bg-white',
  'bg-slate-800/80': 'glass-card',
  'bg-slate-800': 'bg-white',
  'text-slate-100': 'text-gray-800',
  'text-slate-200': 'text-gray-700',
  'text-slate-300': 'text-gray-600',
  'text-slate-400': 'text-gray-500',
  'text-slate-500': 'text-gray-400',
  'border-slate-700/80': 'border-gray-200',
  'border-slate-700/60': 'border-gray-200',
  'border-slate-700/50': 'border-gray-100',
  'border-slate-700': 'border-gray-200',
  'border-slate-600': 'border-gray-300',
  'bg-emerald-950': 'bg-[#f0fdf4]',
  'bg-emerald-950/80': 'bg-[#f0fdf4]',
  'text-emerald-400': 'text-[#166534]',
  'text-emerald-300': 'text-[#15803d]',
  'border-emerald-800': 'border-green-200',
  'border-emerald-800/60': 'border-green-200',
  'border-emerald-800/80': 'border-green-200',
  'bg-emerald-600': 'bg-[#166534]',
  'hover:bg-emerald-600': 'hover:bg-[#15803d]',
  'hover:bg-slate-700/60': 'hover:bg-gray-100',
  'hover:border-slate-600': 'hover:border-gray-300',
  'bg-slate-700/60': 'bg-gray-100',
  'bg-slate-900/60': 'bg-slate-50',
  'bg-slate-900/80': 'bg-white',
  'bg-slate-700': 'bg-gray-100',
  'shadow-emerald-950/40': 'shadow-green-900/20',
  'shadow-emerald-950/50': 'shadow-green-900/20',
};

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace class attributes
  content = content.replace(/className="([^"]+)"/g, (match, classString) => {
    let classes = classString.split(/\s+/);
    classes = classes.map(cls => {
      if (replacements[cls]) return replacements[cls];
      return cls;
    });

    if (classes.includes('text-white') && !classes.some(c => 
        c.includes('bg-[#166534]') || 
        c.includes('bg-rose') || 
        c.includes('bg-blue-500') || 
        c.includes('bg-amber-500') || 
        c.includes('bg-emerald-500') || 
        c.includes('bg-emerald-600') || 
        c.includes('text-white') && c.includes('bg-')
    )) {
        classes = classes.map(c => c === 'text-white' ? 'text-gray-900' : c);
    }
    return `className="${classes.join(' ')}"`;
  });

  // Replace template literals
  content = content.replace(/className=\{`([^`]+)`\}/g, (match, classString) => {
      let newStr = classString;
      for (const [key, value] of Object.entries(replacements)) {
          const regex = new RegExp(`(?<![a-zA-Z0-9_-])${key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?![a-zA-Z0-9_-])`, 'g');
          newStr = newStr.replace(regex, value);
      }
      
      // Basic text-white replacement in template strings, risky but necessary
      newStr = newStr.replace(/(?<![a-zA-Z0-9_-])text-white(?![a-zA-Z0-9_-])/g, 'text-gray-900');
      
      // Fix instances where it got replaced wrongly (e.g. active nav button)
      // We know in AdminLayout we have `isActive ? 'text-white' : 'text-slate-400'`
      newStr = newStr.replace(/isActive \? 'text-gray-900' : 'text-gray-500'/g, `isActive ? 'text-white' : 'text-gray-500'`);
      return `className={\`${newStr}\`}`;
  });
  
  // Specific fix for AdminDashboard gradient background which might not look good with surface colors
  content = content.replace('bg-gradient-to-r from-emerald-950 via-slate-800 to-slate-900', 'bg-gradient-to-r from-green-50 via-white to-green-50');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
