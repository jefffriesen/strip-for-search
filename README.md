# strip-for-search
This is a very basic utility that converts strings of text to something that is easier to match words against. It creates a very consistent, predictable set of words that allow you to match a keyword or keywords against without minimal false positives or missing words.

1. All lowercase
2. Deburr (removing all diacritical marks)
3. Converting emdash and endash to dash (minus sign)
4. Adding padding around all punctuation. This allows you to match consistently:



| match phrase | sentence | stripped sentence | match? | Notes
| ------------ | -------- | ----------------- | ------ | -----
| "a / b test" | Let's do A/B testing. | let ' s do a / b testing . | true |
| "a / b test" | Let's do A / B testing. | let ' s do a / b testing . | true
| "a / b test" | Let's do a/b testing. | let ' s do a / b testing . | true
| "a / b test" | Let's do a / b testing. | let ' s do a / b testing . | true
| "a / b tester" | Let's do A/B testing. | let ' s do a / b testing . | false
| "french cafe" | French Café | french cafe | true
| "1-3pm" | 1-3pm | 1-3pm | true | endash
| "1-3pm" | 1—3pm | 1-3pm | true | emdash

This punctuation padding allows a lot fewer match phrases to match a lot more cases.


### TODO:
* Remove Lodash dependency. May have to watch out for difference between `_.toLower` and `.toLowerCase`. Some of these may limit the version of Node.js this module works with. Not sure if it's worth it.
* Allow opt-out of some of these transformations. Probably through an options object passed in, instead of function chaining. If you want that, you could use https://github.com/ajgamble-milner/text-cleaner
* Optionally convert any number into a specific character. `1:00 - 3:00pm` would be converted to `# : 00 - # : 00pm`
* Add more complicated examples in the tests
