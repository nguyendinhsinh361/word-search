// Hàm kiểm tra xem từ có tồn tại trong ma trận không
function wordSearch(matrix, word) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    // Hàm kiểm tra xem từ có thể bắt đầu từ vị trí (row, col) không
    function isSafe(row, col, visited) {
      return (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        !visited[row][col]
      );
    }
  
    // Hàm đệ qui để tìm kiếm từ tại vị trí (row, col)
    function searchWord(row, col, index, visited) {
      // Nếu đã tìm thấy từ, trả về true
      if (index === word.length) {
        return true;
      }
  
      // Kiểm tra xem vị trí (row, col) có hợp lệ không
      if (!isSafe(row, col, visited)) {
        return false;
      }
  
      // Kiểm tra xem ký tự tại vị trí (row, col) có khớp với ký tự trong từ không
      if (matrix[row][col] !== word[index]) {
        return false;
      }
  
      // Đánh dấu vị trí hiện tại là đã thăm
      visited[row][col] = true;
  
      // Thử tìm kiếm từ các vị trí xung quanh
      const directions = [
        [0, 1], // Right
        [0, -1], // Left
        [1, 0], // Down
        [-1, 0], // Up
      ];
  
      for (const dir of directions) {
        const newRow = row + dir[0];
        const newCol = col + dir[1];
        if (searchWord(newRow, newCol, index + 1, visited)) {
          return true;
        }
      }
  
      // Quay lui bằng cách đánh dấu vị trí này chưa thăm
      visited[row][col] = false;
      return false;
    }
  
    // Tìm kiếm từng ký tự trong ma trận
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === word[0]) {
          const visited = Array.from({ length: rows }, () =>
            Array(cols).fill(false)
          );
          if (searchWord(i, j, 0, visited)) {
            return true;
          }
        }
      }
    }
  
    // Không tìm thấy từ trong ma trận
    return false;
  }
  
  // Ví dụ sử dụng
  const matrix = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  console.log(wordSearch(matrix, 'ABCCED')); // true
  console.log(wordSearch(matrix, 'SEE')); // true
  console.log(wordSearch(matrix, 'ABCB')); // false
  