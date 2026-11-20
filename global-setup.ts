import fs from 'fs';
import path from 'path';

// Runs once before each test run: clears the previous run's Allure results so the report
// only shows the latest run (the trend across recent runs is kept by allurerc.mjs)
export default function globalSetup() {
  fs.rmSync(path.resolve(__dirname, 'allure-results'), { recursive: true, force: true });
}
