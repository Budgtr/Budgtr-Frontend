let table_engine = document.getElementById('budget_engine');

let loaderImg = `
    <img src="/static/img/1485.gif" alt="budgtr logo">
`
localStorage.removeItem('tableEntries')
let table_json = localStorage.getItem('tableEntries') ? JSON.parse(localStorage.getItem('tableEntries')) : {};
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        margin:10,
        items:1,
        nav:false,
        dots: false,
        slideTransition:'fade',
        smartSpeed: 1000,
        autoplay:true,
        autoplayTimeout:3000
    });

})

function startEngine(){
    let budgetAmount = document.getElementById("budget_amount");
    localStorage.setItem('tableEntries', [])
    if (budgetAmount.value > 0)
    {
        saveBudgetAmount(budgetAmount.value)
        startTableEngine().then(renderCreditTable())
    }
    else{
        error("Please enter a Budget value")
    }
}


function saveBudgetAmount(budgetValue)
{
    let budgetEntry = {
        "item" : "Income",
        "amount" : budgetValue,
        "debit" : ""
    }

    table_json.credit = budgetEntry;
    localStorage.setItem('tableEntries', JSON.stringify(table_json))
}


async function startTableEngine()
{
    // Start the engine

    let table = `
    <table class="table border-light">
        <thead>
            <tr>
                <th>S/N</th>
                <th>Item</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody id="budget-table-body">

        </tbody>
        <tfoot class="margin-5">
            <tr>
                <td colspan="3">
                    <input type="text" id="Item" placeholder="item" class="form-control-small">
                </td>
                <td>
                    <input type="text" id="amount" placeholder="amount" class="form-control-small">
                </td>
                <td>
                    <input type='submit' onclick='saveEntry()' class="button button-block engine_button" value='Add Item'>
                </td>
            </tr>
        </tfoot>
    </table>
    `;

    table_engine.innerHTML = table;
}

function saveEntry(){
    let item = document.getElementById('Item');
    let amount = document.getElementById('amount');
    if (item.value == "" || amount.value == "")
    {
        error("Please enter a value")
        return;
    }

    let newEntry = {
        "item" : item.value,
        "credit" : "",
        "debit" : amount.value
    }

    if (!table_json.debits)
    {
        table_json.debits = []
    }
    
    table_json.debits.push(newEntry);
    renderCreditTable();
    renderDebitTable();
    localStorage.setItem('tableEntries', JSON.stringify(table_json))
    item.value = "";
    amount.value = "";
}

function renderCreditTable()
{
    let table_body = document.getElementById('budget-table-body');
    table_body.innerHTML = "";
    let creditTr = document.createElement('tr');
    let amount = table_json.credit.amount
    creditTr.innerHTML = `
        <td></td>
        <td>${table_json.credit.item}</td>
        <td>${table_json.credit.amount}</td>
        <td>${table_json.credit.debit}</td>
        <td>${amount}</td>
    `;
    table_body.appendChild(creditTr)

}

function renderDebitTable()
{
    let table_body = document.getElementById('budget-table-body');
    let amount = table_json.credit.amount;
    if (table_json.debits)
    {
        table_json.debits.forEach((entry, index) => {
            amount -= entry.debit;
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.item}</td>
                <td>${entry.credit}</td>
                <td>${entry.debit}</td>
                <td>${amount}</td>
            `;
            table_body.appendChild(tr)
        })
    }    
}

function success(message)
{
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#fff",
          color: "#2cb154"
        },
    }).showToast();
}

function error(message)
{
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#fff",
          color: "#da4b4b"
        },
    }).showToast();
}