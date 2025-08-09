let price = 3.26;
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

let unit = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
]

// Arreglo Cash Inventory
// {nombre: 'PENNY', monto: 1.01, value: 0.01, cantidad: 101}
let cashInventory = cid.map(([nombre, monto]) => {
  let unidad = unit.find(([nombreUnit]) => nombreUnit === nombre);
  const valorUnitario = unidad?.[1] || 0;
  const cantidad = monto / valorUnitario;


  return {
    nombre,
    monto,
    value: valorUnitario,
    cantidad
  }
})




const money = document.getElementById('money-span');
let cashInput = document.getElementById('cash');
const spanTotal = document.getElementById('total');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

// Ocultamos el span del vuelto al inicio
changeDue.style.display = 'none';

// actualizamos el span del dinero en la caja
const updateCashInventoryCid = (arrayChange) => {

  arrayChange.forEach(([nombre, monto]) => {
    // Actualizamos el cashInventory con los cambios
    let cashItem = cashInventory.find(e => e.nombre === nombre);
    if (cashItem) {
      cashItem.monto = parseFloat((cashItem.monto - monto).toFixed(2));
      cashItem.cantidad = cashItem.monto / cashItem.value;
    }

    // También actualizamos el cid
    let cidItem = cid.find(e => e[0] === nombre);
    if (cidItem) {
      cidItem[1] = parseFloat((cidItem[1] - monto).toFixed(2));
    }

  })
}

//Renderizamos el dinero en el span
const renderMoneySpan = () => {
  money.innerHTML = cid.map(([moneda, monto]) => {
    return `${moneda}: $ ${monto}<br>`;
  }).join('')
}


// Función para mostrar u ocultar el span del vuelto
const toggleChangeDueVisibility = () => {

  if (changeDue.textContent.trim() === '') {
    changeDue.style.display = 'none';
  } else {
    changeDue.style.display = 'block';
  }
};

// Evento para ocultar el span del vuelto cuando el input de dinero está vacío
cashInput.addEventListener('input', () => {
  if (cashInput.value === '') {
    changeDue.textContent = '';
    toggleChangeDueVisibility();
  }
});

// Mostramos el total de precio del articulo en el span
spanTotal.textContent = `Total: $ ${price}`;

// Función para verificar si el cliente tiene suficiente dinero
// para comprar el artículo y si ha ingresado un valor en el input de dinero
const checkCash = () => {
  if (cashInput.value === '') {
    alert('Por favor, ingrese el dinero del cliente');
    changeDue.textContent = '';
    toggleChangeDueVisibility();
    return false;
  }

  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDue.textContent = '';
    toggleChangeDueVisibility();
    return false;
  }

  if (isNaN(cashInput.value) || parseFloat(cashInput.value) < 0) {
    alert("Please enter a valid number for cash");
    changeDue.textContent = '';
    toggleChangeDueVisibility();
    return false;
  }
  return true;
}

// Función para calcular el vuelto
// y determinar el estado de la caja segun el vuelto
const calculateChange = (cash) => {
  let changeNeeded = parseFloat(cash - price).toFixed(2);
  let changeArray = [];

  cashInventory.slice().reverse().forEach(e => {
    let { nombre, value, cantidad } = e;
    let amountToReturn = 0;

    while (changeNeeded >= value && cantidad > 0) {
      changeNeeded = parseFloat(changeNeeded - value).toFixed(2);
      amountToReturn = parseFloat((amountToReturn + value).toFixed(2));
      cantidad--;
    }

    if (amountToReturn > 0) {
      changeArray.push([nombre, amountToReturn]);
    }
  }
  )

  if (changeNeeded > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  let totalInDrawer = cashInventory.reduce((sum, item) => sum + item.monto, 0).toFixed(2);

  if (parseFloat(totalInDrawer) === parseFloat(cash - price)) {
    return { status: 'CLOSED', change: cashInventory.map(item => [item.nombre, item.monto]) };
  }

  return { status: 'OPEN', change: changeArray };
}

// Mostrar inventario de caja desde el inicio
renderMoneySpan();

// Función para mostrar el vuelto al cliente
// y el estado de la caja
const showDue = () => {

  if (!checkCash()) return;

  if (parseFloat(cashInput.value) === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    toogleChangeDueVisibility();
    renderMoneySpan();
    cashInput.value = ''; 
    return;
  }

  else {
    let cash = parseFloat(cashInput.value).toFixed(2);
    let change = calculateChange(cash);
    let { status, change: cambio } = change;

    if (status === 'INSUFFICIENT_FUNDS') {
      changeDue.innerHTML = `Status: ${status}`;
    } else if (status === 'CLOSED') {
      changeDue.innerHTML = `Status: ${status} <br>` + cambio.map(([moneda, monto]) => `${moneda}: $${monto.toFixed(2)}`).join('<br>');
      // Actualizar caja y HTML
      updateCashInventoryCid(cambio);
      renderMoneySpan();
    } else {
      changeDue.innerHTML = `Status: ${status} <br>` + cambio.map(([moneda, monto]) => `${moneda}: $${monto.toFixed(2)}`).join('<br>');

      // Actualizar caja y HTML
      updateCashInventoryCid(cambio);
      renderMoneySpan();
    }
  }


  if (cashInput.value === '') {
    changeDue.textContent = '';
  }

  toggleChangeDueVisibility();

  cashInput.value = '';

}


// Evento para mostrar el vuelto al cliente
purchaseBtn.addEventListener('click', showDue);

