import fs from 'fs';

async function run() {
  console.log("Fetching Framer site...");
  const res = await fetch('https://loginord.framer.website/');
  const html = await res.text();
  
  let report = "=== FRAMER DESIGN EXTRACT ===\n\n";

  // 1. Cores (Color Tokens)
  report += "--- TOKENS DE COR ---\n";
  const cssVarsMatch = html.match(/body\s*\{([^}]+)\}/);
  if (cssVarsMatch) {
    const tokens = cssVarsMatch[1].split(';').filter(t => t.includes('--token')).map(t => t.trim());
    report += tokens.join('\n') + "\n\n";
  }

  // 2. Paddings / Spacing
  report += "--- ESPAÇAMENTOS (PADDING) ---\n";
  const paddings = html.match(/padding:\s*([0-9a-z%.\s]+)/g) || [];
  const uniquePaddings = [...new Set(paddings)].filter(p => p.includes('px') || p.includes('rem')).sort();
  report += uniquePaddings.join('\n') + "\n\n";
  
  // 3. Border Radii
  report += "--- BORDER RADIUS ---\n";
  const radii = html.match(/border-radius:\s*([0-9a-z%.\s]+)/g) || [];
  const uniqueRadii = [...new Set(radii)].filter(p => !p.includes('inherit') && !p.includes('initial')).sort();
  report += uniqueRadii.join('\n') + "\n\n";

  // 4. Font Sizes
  report += "--- FONT SIZES ---\n";
  const fontSizes = html.match(/font-size:\s*([0-9a-z%.\s]+)/g) || [];
  const uniqueFontSizes = [...new Set(fontSizes)].filter(f => f.includes('px') || f.includes('rem')).sort();
  report += uniqueFontSizes.join('\n') + "\n\n";

  fs.writeFileSync('framer_extracted_tokens.txt', report);
  console.log("Extração salva em framer_extracted_tokens.txt");
}

run().catch(console.error);
