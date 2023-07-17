import repeatGuesses from '../../../src/matcher/repeat/scoring'
import MatchOmni from '../../../src/Matching'
import { Options } from '../../../src/Options'
import { MatchExtended } from '../../../src/types'
import Scoring from '../../../src/scoring'

const zxcvbnOptions = new Options()
zxcvbnOptions.setOptions()

const omniMatch = new MatchOmni(zxcvbnOptions)
describe('scoring guesses repeated', () => {
  const data: [string, string, number][] = [
    ['aa', 'a', 2],
    ['999', '9', 3],
    ['$$$$', '$', 4],
    ['abab', 'ab', 2],
    ['batterystaplebatterystaplebatterystaple', 'batterystaple', 3],
  ]

  data.forEach(([token, baseToken, repeatCount]) => {
    const scoring = new Scoring(zxcvbnOptions, baseToken)
    const baseGuesses = scoring.mostGuessableMatchSequence(
      omniMatch.match(baseToken) as MatchExtended[],
    ).guesses
    const match = {
      token,
      baseToken,
      baseGuesses,
      repeatCount,
    }

    const expectedGuesses = baseGuesses * repeatCount
    const msg = `the repeat pattern '${token}' has guesses of ${expectedGuesses}`

    // eslint-disable-next-line jest/valid-title
    it(msg, () => {
      // @ts-ignore
      expect(repeatGuesses(match)).toEqual(expectedGuesses)
    })
  })
})
