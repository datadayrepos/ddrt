# NPM Publication

`pnpm run pack:release` retains `build:lib`, including type checks and the stylesheet build, and verifies a minimal local archive of lib plus required legal notices. Raw source publication is blocked. The existing explicit `push` script now routes through this archive boundary; despite its historical name, it remains a human-controlled npm release operation and must not be used for testing.

README, docs/plans/agent instructions and maps are excluded. Public entrypoints, styles, versions and dependency selections are preserved.

The inherited semantic-release workflow/configuration remains master-based and still retains the upstream npm plugin and all auth/version/changelog/GitHub checks. A first verifyConditions guard explicitly blocks that route before prepare/version/changelog/Git actions, rather than failing only after a partial release. Branch-policy alignment and exact-archive plugin integration require a separate approved decision. Push-triggered gh-pages deployment is also unchanged; do not treat a packaging-only push as deployment-free.
