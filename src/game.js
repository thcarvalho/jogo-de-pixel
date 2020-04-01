alert('Opa')
function tecla() {
  switch (event.keyCode) {
    case 97:
      console.log('a');
      break;
    case 115:
      console.log('s');
      break;
    case 100:
      console.log('d');
      break;
    case 119:
      console.log('w');
      break;
    case 112:
      console.log('p');
      break;
    default:
      console.log(event.keyCode);
      break;
  }
}

document.body.onkeypress = tecla;