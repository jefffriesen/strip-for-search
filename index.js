const {flow, trim, toLower, deburr, compact} = require('lodash')

/* Call with:
 * stripForSearch(textToStrip, additionalTextToAppend, moreText)
 *
 * TODO: get rid of some or all of Lodash functions
 * Be careful about the differences between _.toLower and .toLowerCase
 */

const punctuationToPad =
  '. , & - _ ( ) [ ] { } - / : ; % $ @ ! * | ? ~ = + " \\ \''

exports.stripForSearch = function(rawText, ...appendText) {
  const description = appendText
    ? [rawText, ...appendText].join(' - ')
    : rawText

  return flow(
    consistentHyphens,
    removeLineBreaks,
    padPunctuation,
    compactSpaces,
    trim,
    toLower,
    deburr
  )(description)
}

// Make sure there is at least one space on each side of punctuation, such as a period.
// This is to make sure that when a user adds a space at the end of a word, it matches
// the last word in a sentence.
// Make sure this is called first so we can strip out extra spaces later (compactSpaces).
function padPunctuation(description) {
  return punctuationToPad.split(' ').reduce((acc, punctuation) => {
    return String(acc).split(punctuation).join(` ${punctuation} `)
  }, description)
}

// compress all multiple spaces in a sentence into single spaces
function compactSpaces(description) {
  return compact(String(description).split(' ')).join(' ')
}

function removeLineBreaks(description) {
  return String(description).replace(/\r?\n|\r/g, ' ')
}

// Replace emdash, endash & hyphens with a hyphen for consistency on string matching
// Notice I'm checking for 3 different kinds of dashes below
function consistentHyphens(description) {
  const re = /[—–-]/g
  return String(description).replace(re, '-')
}
