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
var modal = function () {
    this.form = document.querySelector(".modal-container.modal-form");
    this.success = document.querySelector(".modal-container:not(.modal-form)");
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
    this.resize = () => {
        this.form.style.height = `${document.body.offsetHeight}px`;
    };
    this.load = () => {
        this.resize();
        //this.close(this.form);
        this.close(this.success);
    };
    return this;
}.call({});
window.addEventListener("load", modal.load);
window.addEventListener("resize", modal.resize);
document.querySelector(".close-modal").addEventListener("click", (e) => {
    modal.close(getParent(e.target, 2));
});
document
    .querySelector(".title .green-button")
    .addEventListener("click", () => modal.open(modal.form));
document.getElementsByName("radio").forEach((r) => {
    let parent = getParent(r, 2);
    parent.addEventListener("click", () => {
        if (modal.activeRadio) {
            modal.activeRadio.classList.remove("label-active");
        }
        parent.classList.add("label-active");
        modal.activeRadio = parent;
    });
});
