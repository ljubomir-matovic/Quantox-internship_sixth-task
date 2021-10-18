var currentStatus = function () {
    this.totalAmount = {
        elements: [document.querySelector("#total-amount")],
        value: 0,
        name: "total-amount",
    };
    this.totalBackers = {
        elements: [document.querySelector("#total-backers")],
        value: 0,
        name: "total-backers",
    };
    this.expectedAmount = 100000;
    this.statusBar = document.querySelector(".status");
    /**Update status bar width
     */
    this.updateStatusBar = () => {
        let number = (100 * this.totalAmount.value) / this.expectedAmount;
        number = number > 100 ? 100 : number;
        this.statusBar.style.width = `${number}%`;
    };
    /**Set value of target and save it in local storage
     * @param {*} value
     * @param {*} target
     * @param {*} initialSet
     */
    this.setValue = (value, target, initialSet = false) => {
        if (initialSet) {
            if (window.localStorage.getItem(target.name) == null)
                window.localStorage.setItem(target.name, value);
            target.value = Number(window.localStorage.getItem(target.name));
        } else {
            target.value = Number(value);
            window.localStorage.setItem(target.name, value);
        }
        target.elements.forEach(
            (el) => (el.innerHTML = this.formatNumber(target.value))
        );
    };
    /**Insert colon before digit of hundreds
     * @param {*} num
     * @returns string (format= 111,111)
     */
    this.formatNumber = (num) => {
        num = num.toString();
        if (num.length > 3) {
            let s = num.split("");
            s.splice(s.length - 3, 0, ",");
            num = s.join("");
        }
        return num;
    };
    this.submit = (e) => {
        e.preventDefault();
        let num = Number(e.target.querySelector("[type='number']").value);
        this.setValue(this.totalAmount.value + num, this.totalAmount);
        this.setValue(this.totalBackers.value + 1, this.totalBackers);
        this.updateStatusBar();
        modal.close(modal.form);
        modal.open(modal.thanks);
    };
    this.load = () => {
        this.setValue(89941, this.totalAmount, true);
        this.setValue(5007, this.totalBackers, true);
        this.updateStatusBar();
    };
    return this;
}.call({});
window.addEventListener("load", currentStatus.load);
document
    .querySelectorAll("form")
    .forEach((f) => f.addEventListener("submit", currentStatus.submit));
