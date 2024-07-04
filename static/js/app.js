$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        margin:10,
        items:1,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000
    });

})

function startEngine(){
    let budgetAmount = document.getElementById("budget_amount");
    if (budgetAmount.value > 0)
    {
        startTableEngine()
    }
}


function startTableEngine()
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
    </table>
    <button class="button button-right margin-5">Add Item</button>`;

    let table_engine = document.getElementById('budget_engine');

    let loaderImg = `
        <img src="/static/img/1485.gif" alt="budgtr logo">
    `
    table_engine.innerHTML = loaderImg;


    setTimeout(()=>{

        table_engine.innerHTML = table;  
    }, 2000);
}
