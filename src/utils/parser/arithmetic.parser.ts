import * as ohm from 'ohm-js';
import Parser from '@src/utils/parser/index';

class ArithmeticParser {
    private _grammarArithmetic: ohm.Grammar = ohm.grammar(String.raw`
        Arithmetic {
            Program = Statement+
            
            Statement = Exp

            Exp = Exp "+" Term --plus
                | Exp "-" Term --minus
                | Exp "*" Term --times
                | Exp "/" Term --div
                | Term

            Term = "(" Exp ")" --parens
                | number

            number = digit+
        }
    `);
    private _semanticArithmetic = this._grammarArithmetic.createSemantics();
    private _interpreterArithmetic = this._semanticArithmetic.addOperation(
        'eval',
        {
            Program(statements) {
                return statements.children[0].eval();
            },

            Statement(expression) {
                return expression.eval();
            },

            Exp_plus(left, _plus, right) {
                return left.eval() + right.eval();
            },
            Exp_minus(left, _minus, right) {
                return left.eval() - right.eval();
            },
            Exp_times(left, _times, right) {
                return left.eval() * right.eval();
            },
            Exp_div(left, _div, right) {
                return left.eval() / right.eval();
            },

            Term_parens(_leftParen, expression, _rightParen) {
                return expression.eval();
            },

            number(digits) {
                return Number(digits.sourceString);
            },
        }
    );

    /**
     * Парсинг строковых значений и их расчет
     * @param {string} expression `1 + 2`
     * @returns {Number} 3
     */
    parseStr(expression: string): number {
        const match = this._grammarArithmetic.match(expression);
        if (match.failed()) {
            console.error(match.message);
        } else {
            return this._interpreterArithmetic(match).eval();
        }
    }
}

export default new ArithmeticParser();
