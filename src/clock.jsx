function startClock() {
    const updateClock = () => {
        const today = new Date();

        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const hour = hours < 10 ? "0" + hours : hours;
        const minute = minutes < 10 ? "0" + minutes : minutes;
        const second = seconds < 10 ? "0" + seconds : seconds;

        const hourTime = hour > 12 ? hour - 12 : hour;

        const ampm = hour < 12 ? "" : "";

        const time = hourTime + ":" + minute + " " + ampm;

        const clockElement = document.getElementById("date-time");
        if (clockElement) {
            clockElement.textContent = time;
        }
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

    return intervalId; 
}

export default startClock;
