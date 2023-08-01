import { ISLABot, ISLASession } from '@src/ts/ISLABot';
import { BotContext } from '@src/ts/botContext';
import Parser from '@src/utils/parser/index';

type MathFunction = (a: number, b: number) => boolean;

interface BooleanMathFunctions {
    [key: string]: MathFunction;
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
     * @param globalEntity
     * @param {string} expression `if 1 < 2`
     * @returns {boolean} true
     */
    parseCondition(globalEntity: object, expression: string): boolean {
        const script = expression.split(' ');

        let firstVar = Parser.getVarValue(globalEntity, script[1]);
        let operator = script[2];
        let secondVar = Parser.getVarValue(globalEntity, script[3]);

        if (!expression.includes('if')) {
            firstVar = Parser.getVarValue(globalEntity, script[0]);
            operator = script[1];
            secondVar = Parser.getVarValue(globalEntity, script[2]);
        }

        if (
            secondVar === undefined ||
            firstVar === undefined ||
            operator === undefined
        ) {
            return undefined;
        }

        switch (operator) {
            case '<':
                return firstVar < secondVar;
            case '>':
                return firstVar > secondVar;
            case '<=':
                return firstVar <= secondVar;
            case '>=':
                return firstVar >= secondVar;
            case '===':
                return firstVar === secondVar;
            case '==':
                return firstVar == secondVar;
            case '!=':
                return firstVar != secondVar;
            case '!==':
                return firstVar !== secondVar;
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

export default new ConditionParser();
