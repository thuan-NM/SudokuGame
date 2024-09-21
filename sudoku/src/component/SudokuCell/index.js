// SudokuCell.js
import { Col, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

function SudokuCell({ value, readOnly, onChange, colIndex, rowIndex, sudokuMatrix, suggestedCell }) {
    const [isValid, setIsValid] = useState(true)
    const handleChange = (e) => {
        const { value: newValue } = e.target;
        if (!readOnly) {
            if (!isNaN(newValue) && newValue !== '') {
                // Kiểm tra ràng buộc
                const isValid = checkConstraints(newValue, colIndex, rowIndex);
                setIsValid(isValid);
                onChange(newValue);
            } else {
                message.error('Please enter a number!');
            }
        }
    };


    const handleKeyDown = (e) => {
        if (!readOnly && (e.key === 'Backspace' || e.key === 'Delete')) {
            // Cho phép xóa
            onChange('');
            setIsValid(true);
        }
    };

    // Hàm kiểm tra ràng buộc
    const checkConstraints = (newValue, colIndex, rowIndex) => {
        // Kiểm tra ràng buộc trong hàng, cột và cụm ô
        const isInRow = checkRowConstraint(newValue, rowIndex);
        const isInColumn = checkColumnConstraint(newValue, colIndex);
        const isInCluster = checkClusterConstraint(newValue, colIndex, rowIndex);
        return isInRow && isInColumn && isInCluster;
    };

    const checkRowConstraint = (newValue, rowIndex) => {
        // Kiểm tra ràng buộc trong hàng
        for (let i = 0; i < 9; i++) {
            if (i != colIndex && sudokuMatrix[rowIndex][i] == newValue) {
                return false; // Giá trị đã tồn tại trong hàng
            }
        }
        return true; // Giá trị hợp lệ
    };

    const checkColumnConstraint = (newValue, colIndex) => {
        // Kiểm tra ràng buộc trong cột
        for (let i = 0; i < 9; i++) {
            if (i != rowIndex && sudokuMatrix[i][colIndex] == newValue) {
                return false; // Giá trị đã tồn tại trong cột
            }
        }
        return true; // Giá trị hợp lệ
    };

    const checkClusterConstraint = (newValue, colIndex, rowIndex) => {
        // Kiểm tra ràng buộc trong cụm ô
        const clusterRowStart = Math.floor(rowIndex / 3) * 3;
        const clusterColStart = Math.floor(colIndex / 3) * 3;
        for (let i = clusterRowStart; i < clusterRowStart + 3; i++) {
            for (let j = clusterColStart; j < clusterColStart + 3; j++) {
                if ((i != rowIndex || j != colIndex) && sudokuMatrix[i][j] == newValue) {
                    return false; // Giá trị đã tồn tại trong cụm ô
                }
            }
        }
        return true; // Giá trị hợp lệ
    };

    return (
        <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}
            md={{ flex: '40%' }}
            lg={{ flex: '20%' }}
            xl={{ flex: '10%' }}
        >
            {/* <input
                type="text"
                value={value !== 0 ? value : ''}
                onChange={handleChange}
                readOnly={readOnly}
            /> */}
            <Input maxLength={1} value={value !== 0 ? value : ''} onChange={handleChange} readOnly={readOnly} className={`${readOnly ? "readonly" : ""} ${((colIndex < 3 || colIndex >= 6) && (rowIndex < 3 || rowIndex >= 6)) || ((colIndex >= 3 && colIndex < 6) && (rowIndex >= 3 && rowIndex < 6)) ? "square" : ""} ${isValid ? "" : "error"} ${(rowIndex == 0 || rowIndex == 3 || rowIndex == 6) ? "topline" : ""} ${rowIndex == 8 ? "botline" : ""} ${(colIndex == 0 || colIndex == 3 || colIndex == 6) ? "leftline" : ""} ${colIndex == 8 ? "rightline" : ""} ${(suggestedCell && suggestedCell.row === rowIndex && suggestedCell.col === colIndex) ? "suggest" : ""}`} onKeyDown={handleKeyDown} />
        </Col>
    );
}

export default SudokuCell;
