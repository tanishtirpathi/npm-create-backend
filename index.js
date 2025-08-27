#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const projectName = args[0] || "my-backend-app";

console.log(`🚀 Creating backend project: ${projectName}`);

// Paths
const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.join(__dirname, "template", "base-js");

// Copy function with placeholder replacement
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      let content = fs.readFileSync(srcFile, "utf-8");
      content = content.replace(/{{projectName}}/g, projectName);
      fs.writeFileSync(destFile, content);
    }
  });
}

// Create target folder
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
} else {
  console.log("⚠️ Directory already exists, using it...");
}

// Copy template
copyRecursive(templateDir, targetDir);

console.log("✅ Backend boilerplate generated!");
console.log(`👉 Next steps:
   cd ${projectName}
   npm install
   npm run dev
`);
