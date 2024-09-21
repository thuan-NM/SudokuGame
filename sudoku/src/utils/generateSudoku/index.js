function generateSudoku(level) {
    let matrix;
    do {
        matrix = Array.from({ length: 9 }, () => Array(9).fill(0));
        fillSudoku(matrix,level);
    } while (!isSolvable(matrix));
    return matrix;
}

function fillSudoku(matrix,level) {
    const filledIndices = new Set();
    let maxcell;
    switch (level) {
        case "easy":
            maxcell = 27;
            break;
        case "medium":
            maxcell = 24;
            break;
        case "hard":
            maxcell = 20;
            break;
        case "epic":
            maxcell = 17;
            break;
        default:
            maxcell = 27;
    }
    let filledCount = 0;
    while (filledCount < maxcell) {
        const index = Math.floor(Math.random() * 81);
        if (!filledIndices.has(index)) {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const num = Math.floor(Math.random() * 9) + 1;
            if (isValidPlacement(matrix, row, col, num)) {
                matrix[row][col] = num;
                filledIndices.add(index);
                filledCount++;
            }
        }
    }
}

function isValidPlacement(matrix, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === num || matrix[i][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (matrix[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function isSolvable(matrix) {
    // Copy ma trận sudoku để không ảnh hưởng đến ma trận gốc
    const solvedBoard = JSON.parse(JSON.stringify(matrix));
    // Giải sudoku
    return solveSudoku(solvedBoard);
}

function solveSudoku(board) {
    const n = board.length;
    const m = board[0].length;
    const solvedBoard = JSON.parse(JSON.stringify(board)); // Tạo một bản sao của ma trận Sudoku để tránh ảnh hưởng đến ma trận gốc
    const success = solveHelper(solvedBoard); // Gọi hàm trợ giúp để giải Sudoku
    return success ? solvedBoard : null; // Trả về ma trận Sudoku đã được giải hoặc null nếu không thể giải
}

function solveHelper(board) {
    const n = board.length;
    const m = board[0].length;
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; // Nếu không còn ô trống nào thì Sudoku đã được giải
    }
    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num; // Thử đặt một số vào ô trống
            if (solveHelper(board)) {
                return true; // Nếu giải được Sudoku với số đã đặt, trả về true
            }
            board[row][col] = 0; // Nếu không thể giải được, trả về giá trị gốc và thử lại với số khác
        }
    }
    return false; // Nếu không có số nào hợp lệ, trả về false
}

function findEmptyCell(board) {
    const n = board.length;
    const m = board[0].length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 0) {
                return [i, j]; // Trả về tọa độ của ô trống đầu tiên tìm thấy
            }
        }
    }
    return null; // Trả về null nếu không còn ô trống nào
}

// Hàm lấy danh sách các lựa chọn hợp lệ cho một ô trong ma trận Sudoku
function getOptions(matrix, row, col) {
    const options = [];
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(matrix, row, col, num)) {
            options.push(num);
        }
    }
    return options;
}

function isValidMove(board, row, col, num) {
    return (
        isValidRow(board, row, num) &&
        isValidColumn(board, col, num) &&
        isValidBox(board, row - (row % 3), col - (col % 3), num)
    );
}

function isValidRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    return true;
}

function isValidColumn(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    return true;
}

function isValidBox(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row + startRow][col + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

export default generateSudoku;
