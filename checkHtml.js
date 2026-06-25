const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const tagRE = /<\s*\/??\s*([a-zA-Z0-9_-]+)([^>]*?)>/g;
const stack = [];
const issues = [];
let m;
while ((m = tagRE.exec(html)) !== null) {
  const full = m[0];
  const tag = m[1].toLowerCase();
  const isEnd = /^<\s*\//.test(full);
  const selfClose = /\/\s*>$/.test(full) || voids.has(tag);
  const pos = html.slice(0, m.index).split('\n').length;
  if (isEnd) {
    if (stack.length === 0) {
      issues.push(`unmatched close </${tag}> at line ${pos}`);
    } else {
      const top = stack[stack.length - 1];
      if (top.tag === tag) {
        stack.pop();
      } else {
        issues.push(`mismatch close </${tag}> at line ${pos}, top is <${top.tag}> opened at line ${top.line}`);
        let found = false;
        for (let i = stack.length - 2; i >= 0; i--) {
          if (stack[i].tag === tag) {
            stack.splice(i);
            found = true;
            break;
          }
        }
      }
    }
  } else if (!selfClose) {
    stack.push({ tag, line: pos });
  }
}
for (const item of stack.slice(0, 50)) {
  issues.push(`unclosed <${item.tag}> opened at line ${item.line}`);
}
issues.slice(0, 100).forEach((issue) => console.log(issue));
console.log('total', issues.length);
