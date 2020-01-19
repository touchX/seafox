import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Escaped keywords', () => {
  for (const arg of [
    'n\\u0075ll',
    '(x === n\\u0075ll);',
    '(x === n\\u0075ll);',
    'var x = n\\u0075ll;',
    'var x = ({ w\\u0069th }) => {};',
    'var n\\u0075ll = 1;',
    'tr\\u0075e = 1;',
    '(x === f\\u0061lse);',
    '(x === n\\u0075ll);',
    'var x = f\\u0061lse;',
    'var f\\u0061lse = 1;',
    'var { f\\u0061lse } = {};',
    'f\\u0061lse = 1;',
    'switch (this.a) { c\\u0061se 6: break; }',
    'try { } c\\u0061tch (e) {}',
    'switch (this.a) { d\\u0065fault: break; }',
    'class C \\u0065xtends function B() {} {}',
    'for (var a i\\u006e this) {}',
    '(function() {for (let l\\u0065t in {}) {}})()',
    'cl\\u0061ss Foo {}',
    'export function br\\u0065ak() {}',
    '(n\\u0065w function f() {})',
    '(typ\\u0065of 123)',
    'const [l\\u0065t] = 1',
    'v\\u0061r',
    '({\\u0067et get(){}})',
    '({\\u0073et set(){}})',
    //'l\\u0065t\na',
    'class C { st\\u0061tic m() {} }',
    'var gen = async function *() { var yi\\u0065ld; };',
    'var obj = { *method() { void yi\\u0065ld; } };',
    'var gen = function *g() { yi\\u0065ld: ; };',
    '({ \\u0061sync* m(){}});',
    'var \\u{63}ase = 123;',
    'var \\u{63}atch = 123;',
    'var x = { \\u0066unction } = { function: 42 };',
    'var \\u{63}ontinue = 123;',
    'var fina\\u{6c}ly = 123;',
    'var \\u{64}\\u{6f} = 123;',
    'do { ; } wh\\u0069le (true) { }',
    '(function*() { return (n++, y\\u0069eld 1); })()',
    'var \\u0064elete = 123;',
    'var \\u{62}\\u{72}\\u{65}\\u{61}\\u{6b} = 123;',
    'var \\u0062\\u0072\\u0065\\u0061\\u006b = 123;;',
    'var \\u{65}\\u{6e}\\u{75}\\u{6d} = 123;',
    '(v\\u006fid 0)',
    'v\\u0061r a = true',
    'thi\\u0073 = 123;',
    'i\\u0066 (false) {}',
    'for (var i = 0; i < 100; ++i) { br\\u0065ak; }',
    'cl\\u0061ss Foo {}',
    '[th\\u{69}s] = []',
    'th\\u{69}s',
    '[f\\u0061lse] = []',
    'f\\u0061lse',
    '(function v\\u0061r() { })',
    '(function a(v\\u0061r) { })',
    '(function a({v\\u{0061}r}) { })',
    '(function a([{v\\u{0061}r}]) { })',
    '(function a([[v\\u{0061}r]]) { })',
    '(function a({ hello: [v\\u{0061}r]}) { })',
    '(function a({ 0: {var:v\\u{0061}r}}) { })',
    'a(1,2\\u0063onst foo = 1;',
    '\\u0063o { } while(0)',
    'cl\\u0061ss Foo {}',
    'var {var:v\\u0061r} = obj',
    '[v\\u{0061}r] = obj',
    'function a({var:v\\u{0061}r}) { }',
    'a(1,2\\u0063onst foo = 1;',
    'let l\\u0065t = 1',
    'const l\\u0065t = 1',
    'let l\\u0065t] = 1',
    'const l\\u0065t] = 1',
    'for (let l\\u0065t in {}) {}',
    '(typ\\u0065of 123)',
    '(x === f\\u0061lse);',
    'var x = f\\u0061lse;',
    '(async ()=>{\\u0061wait 100})()',
    '(async ()=>{var \\u0061wait = 100})()',
    '\\u0063o { } while(0)',
    'v\\u0061r',
    '({\\u0067et get(){}})',
    '({\\u0073et set(){}})',
    'class C { async *gen() { void \\u0061wait; }}',
    'async() => { void \\u0061wait; };',
    '{for(o i\\u006E {}){}}',
    //'class X { se\\u0074 x(value) {} }',
    'class X { st\\u0061tic y() {} }',
    '(function* () { y\\u0069eld 10 })',
    '({ \\u0061sync x() { await x } })',
    'class C { static async method() { void \\u0061wait; }}',
    'while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }',
    '(function a({ hello: {var:v\\u{0061}r}}) { })',
    '[v\\u{0061}r] = obj',
    't\\u0072y { true } catch (e) {}',
    'var x = typ\\u0065of "blah"',
    '({ def\\u{61}ult }) => 42;',
    '0, { def\\u{61}ult } = { default: 42 };',
    'var x = ({ bre\\u0061k }) => {};',
    'var x = ({ tr\\u0079 }) => {};',
    'var x = ({ typ\\u0065of }) => {};',
    'def\\u0061ult',
    'var gen = async function *g() { yi\\u0065ld: ; };',
    'function *gen() { yi\\u0065ld: ; }',
    '(function *gen() { yi\\u0065ld: ; })',
    'i\\u0066 (0)',
    'var i\\u0066',
    'for (a o\\u0066 b);',
    'class a { st\\u0061tic m(){} }',
    'var \\u{64}\\u{6f} = 123;',
    '(\\u0061sync function() { await x })',
    '(\\u0061sync () => { await x })',
    '\\u0061sync x => { await x }',
    'class X { \\u0061sync x() { await x } }',
    'class X { static \\u0061sync x() { await x } }',
    'for (x \\u006ff y) {}',
    'wh\\u0069le (true) { }',
    'n\\u0065w function f() {}',
    'async () => { aw\\u{61}it: x }',
    'async function f(){   (a\\u0077ait "string")   }',
    '(b\\u0072eak = "string")',
    '(c\\u0061se = "string")',
    '(c\\u0061tch = "string")',
    '(c\\u006fntinue = "string")',
    'f\\u006fr (var i = 0; i < 10; ++i);',
    'try { } catch (e) {} f\\u0069nally { }',
    'd\\u0065bugger;',
    'if (d\\u006f { true }) {}',
    '\\u{74}rue',
    'var \\u{64}\\u{6f} = 123;',
    'a\\u{0022}b=1',
    //'le\\u0074 x = 5',
    'class yi\\u0065ld {}',
    'class l\\u0065t {}',
    'class yi\\u0065ld {}',
    'class l\\u0065t {}',
    'class yi\\u0065ld {}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    'var int\\u0065rface = 1;',
    'var p\\u0072ivate;',
    'var prot\\u0065cted = 1;',
    'var y\\u0069eld = 1;',
    'var st\\u0061tic = 1;',
    'var prot\\u0065cted = 1;',
    'var p\\u0072ivate;',
    'var packa\\u0067e = 1;',
    'var { packa\\u0067e  } = {};',
    'var impl\\u0065ments = 1;',
    'var { impl\\u0065ments  } = {};',
    'var int\\u0065rface = 1;',
    'var { impl\\u0065ments  } = {};',
    '({ def\\u0061ult: 0 })',
    '({ def\\u{61}ult: 0 })',
    'var { p\\u0072ivate } = {};',
    'var { prot\\u0065cted  } = {};',
    'var st\\u0061tic = 1;',
    'var { st\\u0061tic } = {};',
    '(p\\u0061ckage = 1);',
    '(p\\u0072ivate = 1);',
    'class a {st\\u0061tic() {}}',
    'var { int\\u0065rface  } = {};',
    'var { p\\u0072ivate } = {};',
    'var { prot\\u0065cted  } = {};',
    'var publ\\u0069c = 1;',
    'var { publ\\u0069c } = {};',
    'var { st\\u0061tic } = {};',
    'var { y\\u0069eld } = {};',
    '0, { def\\u{61}ult: x } = { default: 42 };',
    '(\\u0069mplements = 1);',
    '(p\\u0072ivate = 1);',
    '(publ\\u0069c);',
    'var publ\\u0069c = 1;',
    'var { publ\\u0069c } = {};',
    '(st\\u0061tic);',
    'l\\u0065t\na',
    '(prot\\u0065cted);',
    '(\\u0069nterface = 1);',
    '(p\\u0061ckage = 1);',
    'var packa\\u0067e = 1;',
    'var { packa\\u0067e  } = {};',
    'var { int\\u0065rface  } = {};',
    'foo = {}; foo.def\\u{61}ult = 3;',
    'if (true) l\\u0065t: ;',
    'function l\\u0065t() { }',
    '(function l\\u0065t() { })',
    'async function l\\u0065t() { }',
    '(async function l\\u0065t() { })',
    '(class { get st\\u0061tic() {}})',
    '(class { set st\\u0061tic(x){}});',
    '(class { *st\\u0061tic() {}});',
    '(class { st\\u0061tic(){}});',
    '(class { static get st\\u0061tic(){}});',
    '(class { static set st\\u0061tic(x) {}});',
    'l\\u0065t => 42',
    '(\\u0061sync ())',
    'async l\\u0065t => 42',
    'function packag\\u0065() {}',
    'function impl\\u0065ments() {}',
    'function privat\\u0065() {}',
    '(y\\u0069eld);',
    '(\\u0069nterface = 1);',
    'var y = { c\\u0061se: x } = { case: 42 };',
    '(prot\\u0065cted);',
    '(publ\\u0069c);',
    'var C = class { get "def\\u{61}ult"() { return "get string"; } set "def\\u{61}ult"(param) { stringSet = param; } };',
    '(st\\u0061tic);',
    'class x{ st\\u0061tic() {} }',
    'class x{ st\\u0061tic() {} }',
    'class aw\\u0061it {}',
    'aw\\u0061it: 1;',
    'function *a(){({yi\\u0065ld: 0})}',
    //'\\u0061sync',
    'l\\u0065t\na',
    'l\\u0065t',
    'class x { static set st\\u0061tic(v) {}}',
    'class x { static get st\\u0061tic() {}}',
    'class x { set st\\u0061tic(v) {}}',
    'class x { get st\\u0061tic() {}}',
    'class x { st\\u0061tic() {}}',
    'class x { static *st\\u0061tic() {}}',
    '(l\\u0065t = "string")',
    '(e\\u0076al = "string")',
    '(p\\u0061ckage = "string")',
    '(p\\u0072otected = "string")',
    '(s\\u0074atic = "string")',
    '(p\\u0075blic = "string")',
    `function a() {
      \\u0061sync
      p => {}
    }`,
    `(function a() {
      \\u0061sync
      p => {}
    })`,
    `async function a() {
      \\u0061sync
      p => {}
    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
  // Test that identifiers which are both escaped and only reserved in the
  // strict mode are accepted in non-strict mode.
  for (const arg of [
    'function l\\u0065t() { }',
    '(function l\\u0065t() { })',
    'async function l\\u0065t() { }',
    '(async function l\\u0065t() { })',
    'l\\u0065t => 42',
    'var x = { interf\\u0061ce } = { interface: 42 };',
    //'async l\\u0065t => 42',
    'function packag\\u0065() {}',
    'function impl\\u0065ments() {}',
    'function privat\\u0065() {}',
    'function l\\u0065t() { }',
    'function l\\u0065t() { }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { impliedStrict: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    'export {a \\u0061s b} from "x";',
    'export default {a \\u0061s b} from "x";',
    'var C = class aw\\u0061it {};'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }
});
