import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(filePath));
        } else { 
            if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) results.push(filePath);
        }
    });
    return results;
}

const files = walk('app/components')
  .concat(walk('app/sobre'))
  .concat(walk('app/servicos'))
  .concat(walk('app/contato'));

console.log(`Processing ${files.length} UI files...`);

files.forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    
    // Replace Paddings strictly
    code = code.replace(/py-24 md:py-32/g, 'py-[120px] md:py-[160px]');
    code = code.replace(/py-24 md:py-40/g, 'py-[120px] md:py-[160px]');
    code = code.replace(/py-24/g, 'py-[120px]');
    code = code.replace(/px-6 md:px-12/g, 'px-[16px] md:px-[40px]');
    code = code.replace(/px-6/g, 'px-[16px]');
    
    // Replace border radii strictly
    code = code.replace(/rounded-2xl/g, 'rounded-[16px]');
    code = code.replace(/rounded-full/g, 'rounded-[56px]');
    
    // Replace Font specific hardcodeds
    code = code.replace(/font-figtree/g, 'font-urbanist');

    // Replace Framer Motion easeOuts with Spring Physics
    // We target strings like: transition={{ duration: 0.8, ease: "easeOut" }}
    // and turn them into logic like: transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
    code = code.replace(/duration:\s*0\.8[,\s]*ease:\s*"easeOut"/g, 'type: "spring", bounce: 0.25, duration: 0.8');
    code = code.replace(/duration:\s*0\.6[,\s]*ease:\s*"easeOut"/g, 'type: "spring", bounce: 0.25, duration: 0.6');
    code = code.replace(/duration:\s*0\.5[,\s]*ease:\s*"easeOut"/g, 'type: "spring", bounce: 0.25, duration: 0.5');
    code = code.replace(/ease:\s*"easeOut"/g, 'type: "spring", bounce: 0.25');
    
    // Fix double types just in case
    code = code.replace(/type:\s*"spring",\s*bounce:\s*([0-9.]+),\s*type:\s*"spring",\s*bounce:\s*([0-9.]+)/g, 'type: "spring", bounce: $1');

    fs.writeFileSync(file, code);
});

console.log("Framer Token Injection complete.");
