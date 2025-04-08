document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const result = document.getElementById('result');
    const charCount = document.getElementById('charCount');
    const charCountValue = document.getElementById('charCountValue');
    
    // Array of letters A-Z
    const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    
    // Update slider background based on value
    function updateSliderBackground(value) {
        const percentage = ((value - 1) / 49) * 100; 
        charCount.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
    }
    
    // Update character count display and button text
    function updateDisplay(value) {
        charCountValue.textContent = value;
        generateBtn.textContent = `Generate ${value} Letter${value > 1 ? 's' : ''}`;
        updateSliderBackground(value);
    }
    
    // Listen for slider changes
    charCount.addEventListener('input', () => {
        updateDisplay(charCount.value);
    });
    
    function generateRandomLetters(count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result.push(letters[randomIndex]);
        }
        return result;
    }
    
    function generateLetters() {
        // Remove previous animation class if exists
        result.classList.remove('pop-in');
        
        // Get current count and generate letters
        const count = parseInt(charCount.value);
        const generatedLetters = generateRandomLetters(count);
        
        // Get display mode and format output
        const displayMode = document.querySelector('input[name="displayMode"]:checked').value;
        const output = displayMode === 'spaced' ? generatedLetters.join(' ') : generatedLetters.join('');
        
        // Force a reflow to restart animation
        void result.offsetWidth;
        
        // Add animation and update content
        result.classList.add('pop-in');
        result.textContent = output;
    }
    
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
