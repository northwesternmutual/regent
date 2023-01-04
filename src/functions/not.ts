// import evaluateRule from '../private/evaluate-rule'
// import attachToJson from '../private/attach-to-json'
import { RegentFn } from '../interfaces'
import custom from './custom'

function not (bool: boolean): boolean {
  return !bool
}

export default custom(not, RegentFn.Rule, 'not')
