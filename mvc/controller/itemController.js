import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";


let submit = $('#btn-item-add').eq(0);
let update_btn = $('#btn-item-update').eq(0);
let delete_btn = $('#btn-item-delete').eq(0);
let reset = $('#btn-item-reset').eq(0);

let itemCode = $('#item_id');
let itemName = $('#item_name');
let price = $('#price');
let qtyOnHand = $('#QtyOnHand');

let searchBtn=$('#search');
let searchField=$('#searchField');









$('#nav-store').on('click', function() {
    console.log("item-coded : ",itemCode.val(generateItemCode()));
    populateItemTable();
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
    /*searchField.attr("placeholder", "Search Item Here");*/
});


function generateItemCode() {
    let highestItemCode = 0;

    for (let i = 0; i < item_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(item_db[i].item_code.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestItemCode) {
            highestItemCode = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `item-${String(highestItemCode + 1).padStart(3, '0')}`;

}

submit.on('click', (e) => {

    e.preventDefault();

    let itemCodeValue = itemCode.val();
    let itemNameValue = itemName.val().trim();
    let priceValue = parseFloat(price.val());
    let qtyOnHandValue = parseInt(qtyOnHand.val(), 10);

    if(
        validation(itemNameValue, "item name", null) &&
        validation(priceValue, "Price", null) &&
        validation(qtyOnHandValue, "Qty On Hand",null)){
        let item = new ItemModel(
            itemCodeValue,
            itemNameValue,
            priceValue,
            qtyOnHandValue
        );

        Swal.fire(
            'Save Successfully!',
            'Successful',
            'success'
        );

        item_db.push(item);

        populateItemTable();

        resetColumns();
    }

});

function validation(value,message,test){
    if(!value){
        showValidationError('Null Input','Input '+message);
        return false;
    }
    if(test===null){
        return true;
    }
    if(!test){
        showValidationError('Invalid Input','Invalid Input '+message);
        return false;
    }
    return true;
}

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}



function populateItemTable(){
    $('tbody').eq(1).empty();
    item_db.map((item) => {
        $('tbody').eq(1).append(
            `<tr>
                <th scope="row">${item.item_code}</th>
                <td>${item.item_name}</td>
                <td>${item.price}</td>
                <td>${item.qty_on_hand}</td>
            </tr>`
        );
    });
}

function resetColumns() {
    reset.click();
    itemCode.val(generateItemCode());
    submit.prop("disabled", false);
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
}

reset.on('click', function(e) {
    e.preventDefault();
    itemCode.val(generateItemCode());
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    submit.prop("disabled", false);
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
});

$('#itemTable').on('click', 'tbody tr', function() {

    let itemCodeValue = $(this).find('th').text();
    let itemNameValue = $(this).find('td:eq(0)').text();
    let priceValue = $(this).find('td:eq(1)').text();
    let qtyOnHandValue = $(this).find('td:eq(2)').text();

    itemCode.val(itemCodeValue);
    itemName.val(itemNameValue);
    price.val(priceValue);
    qtyOnHand.val(qtyOnHandValue);

    submit.prop("disabled", true);
    delete_btn.prop("disabled", false);
    update_btn.prop("disabled", false);

});

update_btn.on('click', () => {

    let itemCodeValue = itemCode.val();
    let itemNameValue = itemName.val().trim();
    let priceValue = price.val().trim();
    let qtyOnHandValue = qtyOnHand.val().trim();

    if(
        validation(itemNameValue, "item name", null) &&
        validation(priceValue, "Price", null) &&
        validation(qtyOnHandValue, "Qty On Hand",null)){

        item_db.map((item) => {
            if (item.item_code === itemCodeValue) {
                item.item_name = itemNameValue;
                item.price = priceValue;
                item.qty_on_hand = qtyOnHandValue;
            }

        });

        Swal.fire(
            'Update Successfully !',
            'Successful',
            'success'
        )

        populateItemTable();

        resetColumns();

    }

});

delete_btn.on('click', () => {

    let itemCodeValue = itemCode.val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            let index = item_db.findIndex(item => item.item_code === itemCodeValue);
            item_db.splice(index, 1);
            populateItemTable();
            resetColumns();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    });

});

