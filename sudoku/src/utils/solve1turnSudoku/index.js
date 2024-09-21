import { solveSudoku, isValidMove, getOptions } from "../solveSudoku";

function suggestHighestCompletion(board) {
    const n = board.length;
    const m = board[0].length;

    // Tìm ô trống có tỉ lệ hoàn thành cao nhất
    let maxCompletionRatio = -Infinity;
    let maxRow = -1;
    let maxCol = -1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 0) {
                const completionRatio = calculateCompletionRatio(board, i, j);
                if (completionRatio > maxCompletionRatio) {
                    maxCompletionRatio = completionRatio;
                    maxRow = i;
                    maxCol = j;
                }
            }
        }
    }

    // Thêm giá trị vào ô có tỉ lệ hoàn thành cao nhất
    const suggestedBoard = JSON.parse(JSON.stringify(board)); // Tạo bản sao của ma trận để tránh ảnh hưởng đến ma trận gốc
    if (maxRow !== -1 && maxCol !== -1) {
        suggestedBoard[maxRow][maxCol] = calculateBestValue(board, maxRow, maxCol);
    }

    // Trả về ma trận và vị trí của ô được gợi ý
    return {
        board: suggestedBoard,
        position: { row: maxRow, col: maxCol }
    };
}

// Tính tỉ lệ hoàn thành cho ô cụ thể
function calculateCompletionRatio(board, row, col) {
    const n = board.length;
    const m = board[0].length;
    let emptyCells = 0;
    let invalidMoves = 0;
    let possibleValues = 0; // Số lượng giá trị có thể điền vào ô

    // Đếm số ô trống và số lượt đặt giá trị không hợp lệ
    for (let i = 0; i < n; i++) {
        if (board[row][i] === 0) emptyCells++;
        if (!isValidMove(board, row, col, board[row][i]) && board[row][i] !== 0) invalidMoves++;
        if (!isValidMove(board, i, col, board[i][col]) && board[i][col] !== 0) invalidMoves++;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === 0) emptyCells++;
            if (!isValidMove(board, row, col, board[i][j]) && board[i][j] !== 0) invalidMoves++;
        }
    }

    // Đếm số lượng giá trị có thể điền vào ô
    const options = getOptions(board, row, col);
    possibleValues = options.length;

    // Tính tỉ lệ hoàn thành
    if (emptyCells === 0) return -1; // Nếu ô đã được điền, tỉ lệ hoàn thành là -1
    return (emptyCells - invalidMoves) / (emptyCells + possibleValues); // Thêm yếu tố số lượng giá trị có thể điền vào ô
}

// Tính giá trị tốt nhất cho ô cụ thể
function calculateBestValue(board, row, col) {
    const options = getOptions(board, row, col);

    // Lặp qua từng lựa chọn và kiểm tra tính hợp lệ của ma trận sau khi gợi ý giá trị
    for (let i = 0; i < options.length; i++) {
        const testValue = options[i];
        const testBoard = JSON.parse(JSON.stringify(board));
        testBoard[row][col] = testValue;

        // Kiểm tra tính hợp lệ của ma trận sau khi gợi ý giá trị
        if (isValidSudoku(testBoard) && solveSudoku(testBoard)) {
            return testValue; // Trả về giá trị đầu tiên làm cho ma trận có thể giải được
        }
    }

    // Nếu không tìm thấy giá trị nào thỏa mãn, trả về 0
    return 0;
}

function isValidSudoku(board) {
    const n = board.length;
    const m = board[0].length;

    // Kiểm tra tính hợp lệ của từng hàng
    for (let i = 0; i < n; i++) {
        const rowSet = new Set();
        for (let j = 0; j < m; j++) {
            const cellValue = board[i][j];
            if (cellValue !== 0 && rowSet.has(cellValue)) {
                return false; // Nếu đã xuất hiện giá trị này trước đó trong hàng, bảng không hợp lệ
            }
            rowSet.add(cellValue);
        }
    }

    // Kiểm tra tính hợp lệ của từng cột
    for (let j = 0; j < m; j++) {
        const colSet = new Set();
        for (let i = 0; i < n; i++) {
            const cellValue = board[i][j];
            if (cellValue !== 0 && colSet.has(cellValue)) {
                return false; // Nếu đã xuất hiện giá trị này trước đó trong cột, bảng không hợp lệ
            }
            colSet.add(cellValue);
        }
    }

    // Kiểm tra tính hợp lệ của từng khối 3x3
    for (let blockRow = 0; blockRow < n; blockRow += 3) {
        for (let blockCol = 0; blockCol < m; blockCol += 3) {
            const blockSet = new Set();
            for (let i = blockRow; i < blockRow + 3; i++) {
                for (let j = blockCol; j < blockCol + 3; j++) {
                    const cellValue = board[i][j];
                    if (cellValue !== 0 && blockSet.has(cellValue)) {
                        return false; // Nếu đã xuất hiện giá trị này trước đó trong khối, bảng không hợp lệ
                    }
                    blockSet.add(cellValue);
                }
            }
        }
    }

    // Nếu không có vấn đề gì, bảng là hợp lệ
    return true;
}

export default suggestHighestCompletion;
