var bookmark = function () {
    this.el = document.querySelector(".bookmark");
    this.className = "active-bookmark";
    /**Change state of bookmark button and write state in localStorage
     */
    this.click = () => {
        this.state = (this.state + 1) % 2;
        window.localStorage.setItem("active-bookmark", this.state);
        this.el.classList.toggle(this.className);
    };
    this.el.addEventListener("click", this.click);
    /**Read item from localStorage and set initial state
     */
    this.load = () => {
        if (window.localStorage.getItem("active-bookmark") != 1) this.state = 0;
        else this.state = 1;
        if (this.state) this.el.classList.add(this.className);
    };
    return this;
}.call({});
window.addEventListener("load", bookmark.load());
