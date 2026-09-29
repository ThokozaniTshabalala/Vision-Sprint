// Run: npx tsx server/inquiry.check.ts
import assert from 'node:assert/strict';
import { escapeHtml, headerSafe, validateInquiry } from './inquiry.js';

const good = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  projectType: 'Web App Development',
  message: 'We need a customer portal for our logistics business.',
};

assert.equal(validateInquiry(good).ok, true);
assert.equal(validateInquiry({ ...good, website: 'http://spam' }).ok, 'spam');
assert.equal(validateInquiry({ ...good, email: 'x@y.com>, victim@z.com' }).ok, false);
assert.equal(validateInquiry({ ...good, message: 'too short' }).ok, false);
assert.equal(validateInquiry({ ...good, message: 'a'.repeat(2001) }).ok, false);
assert.equal(validateInquiry({ ...good, name: { $gt: '' } }).ok, false); // non-string coerced to '' → rejected
assert.equal(validateInquiry(null).ok, false);
assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
assert.equal(headerSafe('Jane\r\nBcc: victim@z.com'), 'Jane Bcc: victim@z.com');

console.log('inquiry checks passed');
