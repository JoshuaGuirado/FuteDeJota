import fs from 'fs';

const data = fs.readFileSync('src/data/zeroToHundredData.ts', 'utf-8');

// We need to replace the items array in each theme to have 100 items.
// We can just append "Player X" to reach 100 items.

let newData = data.replace(/items: \[\s*([\s\S]*?)\s*\]/g, (match, p1) => {
  const items = p1.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s.length > 0);
  while (items.length < 100) {
    items.push(`Jogador ${items.length + 1}`);
  }
  const newItemsStr = items.map(i => `"${i}"`).join(', ');
  return `items: [${newItemsStr}]`;
});

fs.writeFileSync('src/data/zeroToHundredData.ts', newData);
console.log('Done');
