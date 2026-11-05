import { approvedCatalog, demoCatalog } from '../src/content/demo';
import { isPublishable, validateCatalog } from '../src/domain/passage';

const release = process.argv.includes('--release');
const catalog = release ? approvedCatalog : demoCatalog;
const errors = validateCatalog(catalog);
if (release) {
  if (catalog.length === 0) errors.push('Release catalog is empty');
  for (const passage of catalog) if (!isPublishable(passage)) errors.push(`${passage.id} is not publishable`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${catalog.length} ${release ? 'release' : 'demo'} passages validated`);
}
