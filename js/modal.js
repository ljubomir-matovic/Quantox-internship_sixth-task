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
    /**Open given modal. If selected is passed as attribute check radio button
     * @param {*} modal
     * @param {*} selected
     */
    this.open = (modal, selected = null) => {
        try {
            modal.style.display = "flex";
            if (selected) {
                let el = document.querySelectorAll("input[type='radio']")[
                    selected
                ];
                if (!el.disabled) {
                    el.checked = true;
                    el = getParent(el, 2);
                    document
                        .querySelectorAll(".label-active")
                        .forEach((l) => l.classList.remove("label-active"));
                    el.classList.add("label-active");
                    this.activeRadio = el;
                }
            }
        } catch (err) {}
    };
    /**Close given modal
     * @param {*} modal
     */
    this.close = (modal) => {
        try {
            modal.style.display = "none";
        } catch (err) {}
    };
    /**Close modal if you click outside of modal
     * @param {*} target
     */
    this.closeOuter = (target) => {
        const close = this.close;
        target.addEventListener("click", (e) => {
            if (e.target == target) close(target);
        });
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
modal.closeOuter(modal.form);
modal.closeOuter(modal.thanks);
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
document
    .querySelectorAll(".about-container button:not([disabled])")
    .forEach((b, i) => {
        b.addEventListener("click", () => {
            modal.open(modal.form, i + 1);
        });
    });
