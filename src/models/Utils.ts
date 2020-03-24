export const Utils = {
    getRandomNumber(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
    },

    shuffleArray(array) {
        let result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        
            // поменять элементы местами
            // мы используем для этого синтаксис "деструктурирующее присваивание"
            // подробнее о нём - в следующих главах
            // то же самое можно записать как:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }
}
