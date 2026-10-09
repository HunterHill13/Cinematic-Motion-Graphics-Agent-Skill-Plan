#!/usr/bin/env node
import { AstMotionValidator } from './astMotionValidator';

const targetPath = process.argv[2];
if (!targetPath) {
  console.error('Usage: npx tsx src/motion/validation/runAstValidator.ts <path_to_tsx>');
  process.exit(1);
}

const report = new AstMotionValidator(targetPath).validate();
console.log('__JSON_REPORT_START__' + JSON.stringify(report) + '__JSON_REPORT_END__');
if (!report.passed) {
  process.exit(1);
} else {
  process.exit(0);
}
