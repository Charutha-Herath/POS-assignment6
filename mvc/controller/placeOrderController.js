import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel";

let customerIdCB = $('#order_customer_id');
let orderId=$('#order_id');
let customerName=$('#order_customer_name');
let total=$('#total');
let discountInput = $('#discount');
let subTotalInput = $('#sub_total');
let cashInput=$('#Cash');
let balanceInput=$('#balance');


let itemIdCB = $('#item_code1');
let itemName=$('#item_name1');
let price=$('#price1');
let qtyOnHand=$('#qty_on_hand');
let qty=$('#getQty');



let add = $('#addBtn');
let resetItemDetails=$('#resetItemDetailsBtn');
let submitBtn=$('#purchase_btn');

let updateBtn2=$('#UpdateBtn3');
let removeBtn=$('#removeBtn');