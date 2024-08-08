document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('sudoku-board');
    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = '1';
            cell.addEventListener('input', (e) => {
                if (e.target.value.match(/[^1-9]/)) {
                    e.target.value = '';
                }
            });
            board.appendChild(cell);
        }
    }
    function fillInitialValues() {
        const initialValues = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];


        const inputs = board.querySelectorAll('input');
        initialValues.flat().forEach((value, index) => {
            if (value !== 0) {
                inputs[index].value = value;
                inputs[index].setAttribute('data-fixed', 'true');
            }
        });
    }


    createBoard();
    fillInitialValues();
    document.getElementById('check-button').addEventListener('click', () => {
        const inputs = board.querySelectorAll('input');
        let isValid = true;
        for (let i = 0; i < 9; i++) {
            const row = Array.from(inputs).slice(i * 9, i * 9 + 9).map(input => input.value);
            const column = Array.from(inputs).filter((_, index) => index % 9 === i).map(input => input.value);
            const box = Array.from(inputs).filter((_, index) => {
                const rowIdx = Math.floor(index / 9);
                const colIdx = index % 9;
                return Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3) === i;
            }).map(input => input.value);


            if (!isValidSet(row) || !isValidSet(column) || !isValidSet(box)) {
                isValid = false;
                break;
            }
        }
        alert(isValid ? 'Tudo certo!' : 'Há um erro no Sudoku.');
    });


    function isValidSet(set) {
        const filteredSet = set.filter(value => value !== '');
        return new Set(filteredSet).size === filteredSet.length;
    }
});