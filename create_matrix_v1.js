function fillMatrix(words) {
    const size = 3;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    const maxAttempts = 100; // Giới hạn số lần thử đặt một từ
  
    function canPlace(word, row, col, dir) {
      const len = word.length;
      if (dir === 'horizontal' && col + len > size) return false;
      if (dir === 'vertical' && row + len > size) return false;
      for (let i = 0; i < len; i++) {
        if (dir === 'horizontal' && matrix[row][col + i] !== 0) return false;
        if (dir === 'vertical' && matrix[row + i][col] !== 0) return false;
      }
      return true;
    }
  
    function placeWord(word, row, col, dir) {
      for (let i = 0; i < word.length; i++) {
        if (dir === 'horizontal') matrix[row][col + i] = word[i];
        if (dir === 'vertical') matrix[row + i][col] = word[i];
      }
    }
  
    for (let word of words) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < maxAttempts) {
        const dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (canPlace(word, row, col, dir)) {
          placeWord(word, row, col, dir);
          placed = true;
        }
        attempts++;
      }
      if (!placed) {
        console.error(`Could not place the word '${word}' after ${maxAttempts} attempts.`);
        break; // Dừng lặp nếu không thể đặt từ, để tránh vòng lặp vô tận
      }
    }
  
    return matrix;
  }
  
  const words = ["ヘビ", "キツネ", "ヒョウ"];
  const filledMatrix = fillMatrix(words);
  
  console.log('Filled Matrix:');
  filledMatrix.forEach(row => console.log(row.map(c => c || '0').join(' ')));
  