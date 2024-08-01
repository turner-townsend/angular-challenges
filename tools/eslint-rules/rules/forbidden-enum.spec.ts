import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`type Foo = 'A' | 'B' | 'C';`],
  invalid: [
    {
      code: `enum Foo { A, B, C }`,
      errors: [
        {
          messageId: 'forbidden-enum',
        },
      ],
    },
  ],
});
