
const container = document.getElementById("container");

const originalData = {
    config: [{
        key: "product_count",
        label: "Products Count",
        field: {
            defaultValue: "30",
            type: "text",
        },
        description: "Max Products Count",
        selected: false,
    },
    {
        key: "product_type",
        label: "Products Type",
        field: {
            defaultValue: "",
            type: "text",
        },
        description: "Gives Product Type information",
        selected: false,
    },
    {
        key: "listing_count",
        label: "Listing Count",
        field: {
            defaultValue: "3",
            type: "text",
        },
        description: "Number of listings per product",
        selected: false,
    },
    {
        key: "geo_browse",
        label: "Geo Browse",
        field: {
            defaultValue: "disabled",
            type: "select",
            options: ["enabled", "disabled"],
        },
        description: "Get zone level ordering of products",
        selected: true,
    },
    {
        key: "client_tag",
        label: "Client Tag",
        field: {
            defaultValue: "mobile-apps-retail",
            type: "text",
        },
        description: "Client Tag",
        selected: false,
    },
    {
        key: "pincode",
        label: "Pincode",
        field: {
            defaultValue: "560103",
            type: "text",
        },
        description: "Pincode to search in",
        selected: true,
    },
    {
        key: "disable_cache",
        label: "Disable Cache",
        field: {
            defaultValue: "false",
            type: "select",
            options: ["true", "false"],
        },
        description: "Disable augmentation cache",
        selected: false,
    },
    ],
};

// create the individual row view.
function createRow(viewObject) {

    const textElement = (inputValue) => `<input ${inputValue.selected ? "" : "disabled"} type ="text" id = ${inputValue.key} value = ${inputValue.field.defaultValue}>`

    const selectElement = (selectObject) => `<select ${selectObject.selected ? "" : "disabled"} id = ${viewObject.key}>
    														${selectObject.field.options.map(item => `
                            	                                <option ${selectObject.field.defaultValue === item ? "selected" : ""} value=${item}>${item}</option>
     													     `)}			
                                             </select>`


    const individualRow = `  <div class="table_row">
    
                                <div class="column">
                                    <input type = "checkbox" title = ${viewObject.key} ${viewObject.selected ? "checked" : ""} >
                                </div>
                                <div class="column">
                                    ${viewObject.label}
                                </div>
                                <div class="column">
                                    ${viewObject.field.type === "text" ? textElement(viewObject) : selectElement(viewObject)}
                                </div>
                                <div class="column">
                                    ${viewObject.description}
                                </div>

                            </div>`

    container.insertAdjacentHTML("beforeend", individualRow);

}


/* Render View */

function renderView(viewArray) {
    viewArray.forEach(item => createRow(item));

};

/* call render view on load */
const onLoad = () => {
    renderView(originalData.config);
}

onLoad();

const row = document.querySelectorAll(".table_row");

/* initialize selected row array */
const selectedData = originalData.config.filter(item => item.selected);
const selectedRows = selectedData.map(item => ({
    key: item.key,
    value: item.field.defaultValue
})); //selectedRows is to be consoled when clicking on Done button

/* Event Delegation : Enable disable row and update selected row */
container.addEventListener("change", function (event) {
    const element = event.target;

    if (element.type === "checkbox") {
        document.getElementById(element.title).toggleAttribute("disabled");

        if (element.checked) {
            const key = element.title;
            const value = document.getElementById(element.title).value;
            console.log(value);
            selectedRows.push({
                key,
                value
            });
        } else {
            selectedRows = selectedRows.filter(item => item.key !== key);
        }
    } else if (element.type === "text" || element.type === "select-one") { //if type is text or select, accordingly update the selectedRows data
        selectedRows.forEach(item => {
            if (item.key === element.id) {
                item.value = document.getElementById(element.id).value;
            }
        })
        // Note: TO DO; store the updated data and use it for future rendering.
    }

});

/* submit data */
const submitData = () => {
    console.log(selectedRows);
}

/* clear existing table data */
const destroyExistingTable = () => {
    document.querySelectorAll('.table_row').forEach(function (el) {
        el.parentNode.removeChild(el);
    });
}

/* search table */
const search = (input) => {

    const filteredData = originalData.config.filter(item => {
        return item.label.toLowerCase().includes(input.toLowerCase());
    })
    destroyExistingTable();
    renderView(filteredData);
}
