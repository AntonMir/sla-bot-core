import ArithmeticParser from './arithmetic.parser';
import ConditionParser from './condition.parser';

class Parser {
    arithmetic = ArithmeticParser;
    conditional = ConditionParser;

    /**
     * Парсим входящуую переменную
     * @param globalEntity
     * @param variable
     * @return {boolean | number | session[entity]}
     */
    getVarValue(globalEntity: any, variable: string) {
        // Boolean
        if (['true', 'false'].includes(variable)) {
            return variable === 'true';
        }

        // Number
        if (!isNaN(+variable)) {
            return +variable;
        }

        // Session variable
        if (isNaN(+variable) && !['true', 'false'].includes(variable)) {
            return globalEntity[variable];
        }
    }
}

export default new Parser();
