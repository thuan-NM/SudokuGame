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

export { solveSudoku,isValidMove,getOptions};
