const {stripForSearch} = require('./index')

test('Basic lowercasing', () => {
  expect(stripForSearch('This is this MADNESS')).toBe('this is this madness')
})

test('Padding punctuation', () => {
  expect(
    stripForSearch(
      'Why do this? It creates a more consistent text-pattern matching output.'
    )
  ).toBe(
    'why do this ? it creates a more consistent text - pattern matching output .'
  )
})

test('Deburr that cactus', () => {
  expect(
    stripForSearch(
      'Why you remove all élégance from my words? Because, mon chéri, pattern matchers are ruthless.'
    )
  ).toBe(
    'why you remove all elegance from my words ? because , mon cheri , pattern matchers are ruthless .'
  )
})

test('Remove multiple spaces and any line breaks. Trim ends', () => {
  expect(
    stripForSearch(
      `   Why
         hath
        you also
      removed poetry from my quiver?`
    )
  ).toBe('why hath you also removed poetry from my quiver ?')
})

test('Emdash, endash, hyphen, minus, oh my!', () => {
  expect(
    stripForSearch(
      'This is too much — only tick–laden beasts convert emdash and endash to hyphens(-). Or is that a minus?'
    )
  ).toBe(
    'this is too much - only tick - laden beasts convert emdash and endash to hyphens ( - ) . or is that a minus ?'
  )
})

test('Appending additional text at end', () => {
  expect(stripForSearch('I speak in incomplete', 'sentences')).toBe(
    'i speak in incomplete - sentences'
  )
})

test('Appending additional text at end, multiple additions', () => {
  expect(
    stripForSearch('I speak in incomplete', 'sentences', 'What to do?')
  ).toBe('i speak in incomplete - sentences - what to do ?')
})
