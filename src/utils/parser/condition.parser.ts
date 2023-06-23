import { ISLABot } from "@src/ts/ISLABot"

type MathFunction = (a: number, b: number) => number

interface MathFunctions{
    [key: string]: MathFunction,
}

class ConditionParser {
    // Список доступных операций на данный момент
    operations: string[] = ['+', '-', '*', '/']
    runMath: MathFunctions = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    /**
     * Парсинг условий
     * @param {string} expression `if 1 < 2`
     * @returns {boolean} true
     */
    parseIf(bot: ISLABot, expression: string): boolean {
        const script = expression.split(' ')
        const firstVar = bot.session[script[1]]
        const secVar = bot.session[script[3]]
        console.log(script[1], firstVar)
        console.log(script[3], secVar)
        switch(script[2]) {
            case '<':
                return firstVar < secVar
            case '>':
                return firstVar > secVar
            case '<=':
                return firstVar <= secVar
            case '>=':
                return firstVar >= secVar
            case '===':
                return firstVar === secVar
            case '==':
                return firstVar == secVar
            case '!=':
                return firstVar != secVar
            case '!==':
                return firstVar !== secVar
            default:
                throw new Error()
        }
    }

    _parseMath(side: string): number {
        // Пытаемся проверить есть ли математическая операция в строке стороны
        for (const operation of this.operations) {
            // Если есть
            if (side.includes(operation)) {
                // Разбиваем на две части
                const numbers = side.split(operation)
                // Запускаем вычисление
                return this.runMath[operation](parseFloat(numbers[0]), parseFloat(numbers[1]))
            }
        }
    }
}

export default new ConditionParser()