console.log(`Warsztat - Infinite scroll`);
console.log(`26:15`);

let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {
  let preloader = document.getElementById('preloader');
  console.log(`showPreloader()`)
  preloader.style.display = 'block';

  preloading = true;
}

const hidePreloader = () => {
  let preloader = document.getElementById('preloader');
  console.log(`hidePreloader()`)
  preloader.style.display = 'none';
  preloading = false;
}

const getData = () => {
  console.log(`getData()`);

  if (!preloading) {
    showPreloader();
    fetch('https://akademia108.pl/api/ajax/get-users.php')
      .then(res => res.json())
      .then(data => {

        let body = document.body;
        let hr = document.createElement('hr');
        body.appendChild(hr);

        for (let user of data) {
          let pId = document.createElement(`p`);
          let pName = document.createElement(`p`);
          let pWebsite = document.createElement(`p`);

          pId.innerText = `User ID: ${user.id}`;
          pName.innerText = `User Name: ${user.name}`;
          pWebsite.innerHTML = `User ID: ${user.website}<br />-------------`;

          body.appendChild(pId);
          body.appendChild(pName);
          body.appendChild(pWebsite);

        }
        hidePreloader();
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}


const scrollToEndOfPage = () => {
  // console.log(`scrollToEndOfPage()`);

  let d = document.documentElement

  // wysokość w w pikselach w których element jest przeskrolowany wpionie
  let scrollHeight = d.scrollHeight;

  // number of pixels that an element
  let scrollTop = d.scrollTop;


  // wewnętrzna wysokość elementu
  let clientHeight = d.clientHeight

  let sumScrollTopClientHeight = scrollTop + Math.ceil(clientHeight);
  console.log(`scrollHeight: ${scrollHeight}`);
  console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
  console.log(`scrollTop: ${scrollTop}`);
  console.log(`clientHeight: ${clientHeight}`);
  console.log(`==============`);


  if (sumScrollTopClientHeight >= scrollHeight) {
    endOfThePage++;
    console.log(`End of Page`);
    console.log(endOfThePage)



    getData();

  }

}

window.addEventListener('scroll', scrollToEndOfPage)

