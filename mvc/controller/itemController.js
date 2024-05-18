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