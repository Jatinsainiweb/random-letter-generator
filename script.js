document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const result = document.getElementById('result');
    const charCount = document.getElementById('charCount');
    const charCountValue = document.getElementById('charCountValue');
    
    // Array of letters A-Z
    const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    

    // Update letter count display when slider moves
    letterCount.addEventListener('input', function() {
        letterCountValue.textContent = this.value;
    });

    // Main letter generation function
    function generateLetters() {
        const count = parseInt(letterCount.value);
        const caseValue = letterCase.value;
        const unique = uniqueLetters.checked;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let output = '';
        let used = new Set();

        try {
            for (let i = 0; i < count; i++) {
                let letter;

                // Handle unique letter generation
                if (unique) {
                    if (used.size >= 26) {
                        throw new Error('Cannot generate more unique letters than available in the alphabet!');
                    }
                    do {
                        letter = letters[Math.floor(Math.random() * letters.length)];
                    } while (used.has(letter));
                    used.add(letter);
                } else {
                    letter = letters[Math.floor(Math.random() * letters.length)];
                }

                // Apply case transformation
                switch (caseValue) {
                    case 'lower':
                        letter = letter.toLowerCase();
                        break;
                    case 'mixed':
                        letter = Math.random() > 0.5 ? letter.toLowerCase() : letter;
                        break;
                    default: // 'upper'
                        break;
                }

                output += letter + ' ';
            }

            // Update result with animation
            result.textContent = output.trim();
            result.style.animation = 'none';
            result.offsetHeight; // Trigger reflow
            result.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Add button click animation
            generateBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                generateBtn.style.transform = 'scale(1)';
            }, 150);

        } catch (error) {
            alert(error.message);
        }
    }

    // Add click event to generate button
    
    // Add click event listener
    generateBtn.addEventListener('click', generateLetters);
    
    // Add keyboard support (spacebar and enter)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault(); // Prevent page scroll on spacebar
            generateBtn.click();
        }
    });
    
    // Initial setup
    updateDisplay(charCount.value);
});
