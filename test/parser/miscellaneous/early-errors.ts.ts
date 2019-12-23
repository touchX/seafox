import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Literal', () => {
  for (const arg of [
    `{ a = 0 });`,
    `(...a)`,
    `(a, ...b)`,
    `(((...a))`,
    '(((a, ...b)))',
    '0++',
    '({a: 0} = 0);',
    `({a(b){}} = 0)`,
    '"use strict"; ({arguments = 1} = 2);',
    `[0] = 0;`,
    `0 = 0;`,
    `({a}) = 0;`,
    `([a]) = 0;`,
    `({a} += 0);`,
    `[a] *= 0;`,
    `0 /= 0;`,
    `[...{a: 0}] = 0;`,
    `[...[0]] = 0;`,
    `[...0] = 0;`,
    'a\\u{0}',
    'a\\u0000',
    '\\u{0}',
    '[...new a] = 0;',
    'for(([0]) of 0);',
    'for((0) of 0);',
    `/./\\u{69}`,
    "'use strict'; +implements;",
    "'use strict'; let:0;",
    "'use strict'; +yield;",
    "!{ get a() { 'use strict'; +let; } }",
    'class let {}',
    'class l\\u{65}t {}',
    '(class yield {})',
    '({ a(){ super(); } });',
    '"use strict"; ([yield] = a)',
    'class a extends b { constructor() { !{*constructor() { super(); }}; } }',
    // '"use strict"; !function* arguments(){}',
    "'use strict'; delete ((a));",
    '!function(a){ super.b }',
    `async function a(b = await (0)) {}`,
    '(async function(b = await (0)) {})',
    '({ async a(b = await (0)) {} })',
    '(class { async constructor(){} })',
    '\\u0000',
    '\\u{0}',
    'a\\u0000',
    '\\u{110000}',
    '\\u{FFFFFFF}',
    'function f(a = super.b){}',
    '!function f(a = super[0]){}',
    '!function(a = super.b){}',
    'function f(a){ super.b }',
    // 'class a { b(eval){} };',
    '!{ a() { function* f(){ super.b(); } } };',
    'class A { constructor() { {{ (( super() )); }} } }',
    'class A { constructor() { super(); } }',
    'class A { *constructor(){} }',
    // 'class A extends B { static prototype(){} }',
    'class A extends B { static set prototype(a) {} }',
    "function a([]){'use strict';}",
    '({ a = 0 });',
    '(...a)',
    '(a, ...b)',
    '(((...a)))',
    '(((a, ...b)))',
    '0++',
    '0--',
    '++0',
    '--0',
    '({a: 0} = 0);',
    '({get a(){}} = 0)',
    '({set a(b){}} = 0)',
    '({a(b){}} = 0)',
    '[0] = 0;',
    '0 = 0;',
    '"use strict"; +yield;',
    '"use strict"; yield:;',
    '"use strict"; +protected:0;',
    '"use strict"; +yield:0;',
    // '"use strict"; +async:0;',
    '"use strict"; function a([yield]){}',
    '"use strict"; function a({yield}){}',
    '"use strict";  function a({yield=0}){}',
    '"use strict"; function a({a:yield}){}',
    '"use strict"; function a([yield,...a]){}',
    // '"use strict"; class A {set a(yield){}}',
    'const a;',
    "const a, b = 0;'",
    'const a = 0, b;',
    '{ const a; }',
    'function f(){ const a; }',
    'for(const a;;);',
    'for(const a = 0, b;;);',
    'for(const let in 0);',
    'for(let let of 0);',
    'for(const let of 0);',
    '{ continue; }',
    'continue',
    'if(0) continue;',
    'while(1) !function(){ break; };',
    'while(1) !function(){ continue; };',
    '({ a(){ super(); } });',
    'for(const a = 1, b;;);',
    'for([0] of 0);',
    '[a] *= 0;',
    'let a, b, c, let;',
    '"use strict"; +yield',
    '/[a-z]/z',
    `var af = x
            => x;`,
    'async function a(k = super.prop) { }',
    '(async function(k = super.prop) {})',
    '(async function a(k = super.prop) {})',
    'async function a() { super.prop(); }',
    '(async function a() { super.prop(); })',
    '(async function a(k = super()) {})',
    '(async function a() { super(); })',
    '(async function a(k = await 3) {})',
    'async function a(k = await 3) {}',
    '"use strict" var af = (yield) => 1;',
    '({set a(b){}} = 0)',
    'for(const a;;);',
    `"use strict"; var af = package => 1;`,
    // 'function a() { "use strict"; var implements; }',
    "function a([yield,...a]){ 'use strict'; }",
    'function* a(){ function* b({c = yield}){} }',
    "function a() { 'use strict'; let = 1; }",
    'class a extends b { c() { function d(c = super.e()){} } }',
    ` /./ii`,
    `(a, ...b)`,
    ' for(const a = 1, let = 2;;);',
    ` function a() { "use strict"; private = 1; }`,
    '({ a(){ super(); } });',
    'for(const a;;);',
    `"use strict"; for (a in let) {}`,
    'for({a: 0} of 0);',
    'b: break a;',
    'let a, let = 0;',
    'let a, let;',
    'for(let a, let;;);',
    '"use strict"; +static:0;',
    '"use strict"; +protected;',
    '"use strict"; +public;',
    '"use strict"; +yield;',
    '"use strict"; +implements:0;',
    '"use strict"; +interface:0;',
    '"use strict"; +let:0;',
    '"use strict"; +package:0;',
    '"use strict"; +private:0;',
    // '"use strict"; +await:0;',
    // 'for(const a = 1;;) c: function b(){}',
    '!{ a() { function* b(a = super.c()){} } };',
    '({a(b){}} = 0)',
    '({a}) = 0;',
    'class A { constructor(){} constructor(){} }',
    'class A { constructor(){} "constructor"(){} }',
    '!class A { constructor(){} constructor(){} }',
    '!class A { constructor(){} "constructor"(){} }',
    'class A extends B { static get prototype(){} }',
    'new.target',
    '(class {[super.a](){}});',
    '(class {[super()](){}});',
    '!{ __proto__: null, __proto__: null, };',
    '!{ a() { !function* (a = super.b()){} } };',
    'class A extends B { a() { function* f(a = super.b()){} } }',
    'class A extends B { a() { !function* (a = super.b()){} } }'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });

    it(`var ${arg}`, () => {
      t.throws(() => {
        parseScript(`var ${arg}`);
      });
    });

    it(`function () { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`function () { ${arg} }`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }
});