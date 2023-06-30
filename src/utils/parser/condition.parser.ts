import { ISLABot } from "@src/ts/ISLABot"

type MathFunction = (a: number, b: number) => boolean

interface BooleanMathFunctions{
    [key: string]: MathFunction,
}

class ConditionParser {
    // Список доступных операций на данный момент
    // operations: string[] = ['<', '>', '<=', '>=', '===', '==', '!=', '!==']
    // runMath: BooleanMathFunctions = {
    //     '<': (a, b) => a < b,
    //     '>': (a, b) => a > b,
    //     '<=': (a, b) => a <= b,
    //     '>=': (a, b) => a >= b,
    //     '===': (a, b) => a === b,
    //     '==': (a, b) => a == b,
    //     '!=': (a, b) => a != b,
    //     '!==': (a, b) => a !== b,
    // }

    /**
     * Парсинг условий
     * @param {string} expression `if 1 < 2`
     * @returns {boolean} true
     */
    parseBoolean(bot: ISLABot, expression: string): boolean {
        const script = expression.split(' ')
        const firstVar: string = bot.session[script[1]]
        let secVar: boolean | number | string

        if(['true', 'false'].includes(script[3])) {
            secVar = !!script[3]
        }

        if(!isNaN(+script[3])) {
            secVar = +script[3]
        }

        if(isNaN(+script[3]) && !['true', 'false'].includes(script[3])) {
            secVar = bot.session[script[3]]
        }


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
        }
    }

    // _parseBoolean(side: string): boolean {
    //     // Пытаемся проверить есть ли математическая операция в строке стороны
    //     for (const operation of this.operations) {
    //         // Если есть
    //         if (side.includes(operation)) {
    //             // Разбиваем на две части
    //             const numbers = side.split(operation)
    //             // Запускаем вычисление
    //             return this.runMath[operation](parseFloat(numbers[0]), parseFloat(numbers[1]))
    //         }
    //     }
    // }
}

export default new ConditionParser()