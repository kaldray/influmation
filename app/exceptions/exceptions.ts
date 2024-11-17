import { Exception } from '@adonisjs/core/exceptions'

export default class StateMismatchException extends Exception {
  static status = 400
  static code = 'E_STATEMISMATCH'
}
