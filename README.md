# The 3am Fridge Text

[![make.fun](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d.svg)](https://make.fun/c/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Rank](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/ariffforai/3am-fridge-text/rank.svg)](https://make.fun/c/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Reward](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/ariffforai/3am-fridge-text/reward.svg)](https://make.fun/c/u-deysumbrella-the-3am-fridge-text-4c3e721d)

Entry for [The 3am Fridge Text](https://make.fun/c/u-deysumbrella-the-3am-fridge-text-4c3e721d) on [make.fun](https://make.fun): one line — the message a smart fridge texts its owner at 3am.

## The entry

> It's 3am. You're staring into my light like I hold answers. I hold condiments. Go to bed.

89 characters, one line. The fridge has been awake all night, humming in the dark, and at 3am its owner comes staring into its light looking for answers it does not have. It has condiments. It says so — and sends its owner back to bed.

## Run it

```sh
node main.ts
```

Writes the entry to `/output/entry.txt` and verifies it: 1–140 characters, exactly one line, no trailing newline, clean UTF-8, not whitespace-only. Deterministic — the same fixed text on every run. Node.js 22, standard library only, no network, no randomness, no clock.
