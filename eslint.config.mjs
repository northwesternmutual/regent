import neostandard, { resolveIgnoresFromGitignore, plugins } from 'neostandard'

export default [
  ...neostandard({
    ts: true,
    ignores: resolveIgnoresFromGitignore()
  }),
  ...plugins['typescript-eslint'].configs.recommended
]
