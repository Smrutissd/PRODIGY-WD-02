
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    
    const display = document.querySelector('.display');
    const startStopBtn = document.getElementById('startStopBtn');
    const lapsContainer = document.querySelector('.laps');

    function startStop() {
        if (isRunning) {
            // Pause
            clearInterval(timerInterval);
            startStopBtn.textContent = 'Start';
            isRunning = false;
            startStopBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        } else {
            // Start
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTime, 10);
            startStopBtn.textContent = 'Pause';
            isRunning = true;
            startStopBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }
        
        // Add button press animation
        startStopBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startStopBtn.style.transform = 'scale(1)';
        }, 100);
    }

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
        
        // Add subtle pulse animation while running
        display.style.transform = 'scale(1.01)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 50);
    }

    function formatTime(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = Math.floor((ms % 60000) / 1000);
        let centiseconds = Math.floor((ms % 1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        centiseconds = String(centiseconds).padStart(2, '0');

        return `${minutes}:${seconds}:${centiseconds}`;
    }

    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        isRunning = false;
        display.textContent = '00:00:00';
        startStopBtn.textContent = 'Start';
        startStopBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        lapsContainer.innerHTML = '';
        
        // Add reset animation
        display.style.transform = 'scale(0.9)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 200);
    }

    function lap() {
        if (isRunning) {
            const lapTime = document.createElement('div');
            lapTime.classList.add('lap-time');
            lapTime.textContent = formatTime(elapsedTime);
            lapsContainer.prepend(lapTime);

            // Add animation
            lapTime.style.animation = 'slideIn 0.3s ease-out';
        }
    }

    // Add keypress support
    document.addEventListener('keypress', (e) => {
        if (e.code === 'Space') {
            startStop();
        } else if (e.code === 'KeyR') {
            reset();
        } else if (e.code === 'KeyL') {
            lap();
        }
    });
