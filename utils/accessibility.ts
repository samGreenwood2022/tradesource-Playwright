// utils/accessibility.ts
import { Page, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

// wcag levels every accessibility scan checks against
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// scans the current page with axe and reports the results, without failing on violations
// attaches the raw json and a readable html report to the playwright report,
// saves the html to accessibility-report/<reportName>-<project>.html,
// and adds each violation as an annotation on the test
export async function runAccessibilityScan(page: Page, testInfo: TestInfo, reportName: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  const htmlReport = createHtmlReport({
    results,
    options: {
      projectKey: reportName,
      outputDir: 'accessibility-report',
      reportFileName: `${reportName}-${testInfo.project.name}.html`,
    },
  });
  await testInfo.attach('accessibility-report', { body: htmlReport, contentType: 'text/html' });

  for (const violation of results.violations) {
    testInfo.annotations.push({
      type: `accessibility violation (${violation.impact})`,
      description: `${violation.id}: ${violation.help} (${violation.nodes.length} element(s))`,
    });
  }

  return results;
}
