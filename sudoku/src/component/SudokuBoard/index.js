// SudokuBoard.js
import React from 'react';
import SudokuCell from '../SudokuCell';
import { Row } from 'antd';

function SudokuBoard({ sudokuMatrix, onCellChange, isCellReadOnly,suggestedCell }) {
    return (
        <div className="sudoku-board">
            {sudokuMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    <Row>
                        {row.map((cellValue, colIndex) => (
                            <SudokuCell
                                sudokuMatrix={sudokuMatrix}
                                key={`${rowIndex}-${colIndex}`}
                                colIndex={colIndex}
                                rowIndex={rowIndex}
                                value={cellValue}
                                suggestedCell={suggestedCell}
                                readOnly={isCellReadOnly(rowIndex, colIndex)} // Sử dụng hàm để xác định readOnly
                                onChange={(newValue) => onCellChange(rowIndex, colIndex, newValue)} />
                        ))}
                    </Row>
                </div>
            ))}
        </div>
    );
}

export default SudokuBoard;
