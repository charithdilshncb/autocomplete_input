function autocomplete(inp, arr) {
    inp.addEventListener("input", function (e) {
        let a, b, i, val;
        if (!e.data) inputValue = inputValue.slice(0, -1)
        else if (e.data.match(letters)) inputValue += e.data
        mainValue = this.value
        val = inputValue
        closeAllLists();
        if (!val) { return false; }
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            element = arr[i]
            if (element.txt.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + element.txt.substr(0, val.length) + "</strong>";
                b.innerHTML += element.txt.substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + element.txt + "'>";
                b.addEventListener("click", function (e) {
                    String.prototype.splice = function (idx, rem, str) {
                        return this.slice(0, idx) + str + this.slice(val.length + idx + rem);
                    };
                    let selectedVal = this.getElementsByTagName("input")[0].value
                    let startedAt = inp.selectionStart - val.length
                    mainValue = mainValue.splice(startedAt, 0, selectedVal);
                    inp.value = mainValue;
                    inputValue = ""
                    inp.focus()
                    let isFunc = arr.find(function (el) {
                        if (el.txt == selectedVal && el.func)
                            return true;
                    });
                    setSel = startedAt + selectedVal.length
                    if (isFunc) --setSel
                    inp.setSelectionRange(setSel, setSel)
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
}

let keyWords = [{ func: true, txt: "sin()" }, { func: true, txt: "cos()" }, { func: true, txt: "exp()" }, { func: true, txt: "tan()" }, { func: false, txt: "var1" }, { func: false, txt: "var2" }, { func: true, txt: "func1()" }];
let letters = /^[A-Za-z]+$/;
let mainValue = ""
let inputValue = ""

autocomplete(document.getElementById("myInput"), keyWords);