let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const money = document.getElementById('money-span');
money.innerHTML = cid.map(e=>{
  const [name, amount] = e;
  return `${name}: $${amount}<br>`;
}).join('')

let cashInput = document.getElementById('cash');


const spanTotal = document.getElementById('total');
spanTotal.textContent = `Total: $ ${price}`;

// const checkCash = () => {
//   if( cashInput.value === '') {
//     alert('Por favor, ingrese el dinero del cliente');
//     return;
//   }

//   if(cashInput.value < price) {
//     alert('El dinero ingresado es insuficiente');
//     return;
//   }
// }

const purchaseBtn = document.getElementById('purchase-btn');



const showDue = () => {
  // checkCash();
  toggleChangeDueVisibility();
  const changeDue = document.getElementById('change-due');
  console.log(price, cashInput.value);
  if(cashInput.value == price) {
    changeDue.textContent = 'No hay cambio';

  }else{
    changeDue.textContent = 'Si hay cambio';
  }

  if(cashInput.value === '') {
    changeDue.textContent = '';
  }

}

const toggleChangeDueVisibility = () => {
  const changeDue = document.getElementById('change-due');
  if (changeDue.textContent.trim() === '') {
    changeDue.style.display = 'none';
  } else {
    changeDue.style.display = 'inline';
  }
};

purchaseBtn.addEventListener('click',showDue);