import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Interview Prep Tests',
  output: './allure-report',
  // Each generate adds the run to this file; the report's trend/history shows only the last 5 runs
  historyPath: './allure-history.jsonl',
  historyLimit: 5,
  plugins: {
    // The classic Allure 2 look (Overview, Suites, Graphs, Timeline, Behaviors, Packages)
    // instead of Allure 3's default "Awesome" report
    allure2: {
      options: {
        reportName: 'Interview Prep Tests',
      },
    },
  },
});
