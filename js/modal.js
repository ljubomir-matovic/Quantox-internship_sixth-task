/**For given element function returns nth parent
 * @param {*} el
 * @param {*} num
 * @returns nth parent element
 */
var getParent = (el, num = 1) => {
    const body = document.querySelector("body");
    let i;
    for (i = 0; i < num && el != body; i++) el = el.parentElement;
    return el;
};
/**Returns number if positive or 0 else
 * @param {*} num
 * @returns number || 0
 */
var getPositive = (num) => (num > 0 ? num : 0);
var modal = function () {
    this.form = document.querySelector(".modal-container.modal-form");
    this.thanks = document.querySelector(".modal-container:not(.modal-form)");
    this.activeRadio = null;
    this.open = (modal, selected = null) => {
        try {
            modal.style.display = "flex";
            if (selected) {
                let el = document.querySelectorAll("input[type='radio']")[
                    selected
                ];
                if (!el.disabled) {
                    el.checked = true;
                    el = el.parentElement;
                    el.classList.add("label-active");
                    this.activeRadio = el;
                }
            }
        } catch (err) {}
    };
    this.close = (modal) => {
        try {
            modal.style.display = "none";
        } catch (err) {}
    };
    this.load = () => {
        this.close(this.form);
        this.close(this.thanks);
    };
    return this;
}.call({});
window.addEventListener("load", modal.load);
document.querySelector(".close-modal").addEventListener("click", (e) => {
    modal.close(getParent(e.target, 2));
});
document
    .querySelector(".thanks button")
    .addEventListener("click", () => modal.close(modal.thanks));
document
    .querySelector(".title .green-button")
    .addEventListener("click", () => modal.open(modal.form));
document.getElementsByName("radio").forEach((r) => {
    let parent = getParent(r, 2);
    if (!r.disabled)
        parent.addEventListener("click", () => {
            if (modal.activeRadio) {
                modal.activeRadio.classList.remove("label-active");
            }
            parent.classList.add("label-active");
            modal.activeRadio = parent;
        });
});
