const actionButton = document.querySelector("#submitTask");
const textInput = document.querySelector("#task");
const listContainer = document.querySelector(".list-container");
const priority = document.querySelector("#priority");
const text = document.querySelector("#textInfo");
const sort = document.querySelector("#sort");
let itemsStatus = document.querySelectorAll(".item-checker");

let items = [];
// event listener for all check buttons
const checkListListener = () => {
    itemsStatus.forEach((checker, index) => {
        checker.addEventListener("change", (e) => {
            let result = true;

            if (checker.checked) items[index][`status`] = true;
            else items[index][`status`] = false;

            itemsStatus.forEach((item) => {
                if (item.checked === false) return (result = false);
            });

            if (result) text.innerHTML = "Completed";
            else text.innerHTML = "Not Completed";
        });
    });
    console.log(items);
};

// event listener on "submit" buttons
actionButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (textInput.value !== "") {
        items.push({
            task: textInput.value,
            prio: priority.value,
            date: Date.now(),
            status: false,
        });
        console.log(items);

        //CLEAR list
        listContainer.innerHTML = "";
        //CHANGE TEXT
        text.innerHTML = "Not Completed";

        //SHOW
        items.map((el) => {
            listContainer.insertAdjacentHTML(
                "beforeend",
                `<div class="item item--${el.prio}">
                    <h4>${el.task}</h4>
                    <div class="custom-checkbox">
                        <input type="checkbox" class="item-checker" ${el.status ? "checked" : ""}/>
                        <label></label>
                    </div>
                </div>`
            );
        });

        itemsStatus = document.querySelectorAll(".item-checker");
        checkListListener();
    }
});

//helper functions for sorting
const compareDate = (a, b) => {
    if (a.date < b.date) return -1;
    return 1;
};

const compareTaskName = (a, b) => {
    if (a.task < b.task) return -1;
    return 1;
};
const compareTaskNameReverse = (a, b) => {
    if (a.task < b.task) return 1;
    return -1;
};

//event lister for sorting
sort.addEventListener("change", (e) => {
    if (sort.value === "created") items.sort(compareDate);
    else if (sort.value === "a-z") items.sort(compareTaskName);
    else items.sort(compareTaskNameReverse);

    //CLEAR
    listContainer.innerHTML = "";

    //SHOW
    items.map((el) => {
        listContainer.insertAdjacentHTML(
            "beforeend",
            `<div class="item item--${el.prio}">
                <h4>${el.task}</h4>
                <div class="custom-checkbox">
                    <input type="checkbox" class="item-checker" ${el.status ? "checked" : ""}/>
                    <label></label>
                </div>
            </div>`
        );
    });

    itemsStatus = document.querySelectorAll(".item-checker");
    checkListListener();
});
