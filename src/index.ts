import ReportGenerator from './ReportGenerator';

import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  try {
    const token = getRequiredInputValue('token');

    var baseUrl = core.getInput('baseUrl');

    const generator = new ReportGenerator({
      repository: getRequiredInputValue('repository'),
      
      octokit: new Octokit({
        auth: token,
        baseUrl: baseUrl
      }),

      sarifReportDirectory: getRequiredInputValue('sarifReportDir'),
      outputDirectory: getRequiredInputValue('outputDir'),

      templating: {
        name: 'summary'
      }
    });

    const file = await generator.run();
    console.log(file);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();

function getRequiredInputValue(key: string): string {
  return core.getInput(key, {required: true});
}
