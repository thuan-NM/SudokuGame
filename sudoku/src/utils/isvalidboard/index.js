import { solveSudoku } from "../solveSudoku";

function isValidSudoku(matrix) {
    if (solveSudoku(matrix))
        return true
    else {
        return false;
    }
}

export default isValidSudoku;
