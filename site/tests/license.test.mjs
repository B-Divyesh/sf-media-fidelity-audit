import test from 'node:test'; import assert from 'node:assert/strict';
import { isFresh, licenseFromUrl } from '../src/license.mjs';
test('reads checkout license from URL', () => assert.equal(licenseFromUrl('?license=abc&x=1'), 'abc'));
test('daily license cache expires after 24 hours', () => { const now=100000000; assert.equal(isFresh(now-86399999,now),true); assert.equal(isFresh(now-86400000,now),false); });
