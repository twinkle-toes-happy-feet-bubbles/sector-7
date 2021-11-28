const modalWrapper = document.querySelector('.modal-wrapper');

// modal add

const addModal = document.querySelector('.add-modal');

const addModalForm = document.querySelector('.add-modal .form');

// modal edit

const editModal = document.querySelector('.edit-modal');

const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-products');

let id;

// Create element and render products

const renderUser = doc => {

  const tr = `

    <tr data-id='${doc.id}'>

    <hr>

      <td>${doc.data().ProductName}</td>

      <td>${doc.data().BrandName}</td>

      <td>${doc.data().Price}</td>

      <td><img src="${doc.data().Imagesrc}"></img></td>

      <td>

        <button class="btn btn-edit">Edit</button>

        <button class="btn btn-delete">Delete</button>

      </td>

    </tr>

    <hr>

  `;

  tableUsers.insertAdjacentHTML('beforeend', tr);

  

console.log("Reading");

var Imgurl;

    

  

// Image upload to firebase storage

document.getElementById('file').addEventListener('change', (event) => {

    const file = event.target.files[0];

    const storageRef = firebase.storage().ref('products/' + file.name);

    

    

    storageRef.put(file).on('state_changed', (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log(progress);

      const progressBar = document.getElementById('progress_bar');

      progressBar.value = progress;

      

      const image = document.getElementById('image');

      image.src = Imgurl;

      console.log(Imgurl);

      //image.src= Imgurl;

      

      console.log('Level 1 clear');

      

      //uploadLinktoFirestore();

      //return Imgurl;

    });

    

    

    /*

    REPLACED #### .on('state_changed',*/

   /*WITH THIS ##### storageRef.put(file).then(function(snapshot){

    $('#rainbowPhotoURL').val(snapshot.downloadURL);

     });

   */

    

});

//console.log(Imgurl);

function uploadLinktoFirestore() {

    console.log('In img url function');

    console.log(image.src + ' Obtained!!!!!');

    return image.src;

  };

  // Click edit product

  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);

  btnEdit.addEventListener('click', () => {

    editModal.classList.add('modal-show');

    

    id = doc.id;

    editModalForm.ProductName.value = doc.data().ProductName;

    editModalForm.BrandName.value = doc.data().BrandName;

    editModalForm.Price.value = doc.data().Price;

  });

  // Click delete product

  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener('click', () => {

    db.collection('products').doc(`${doc.id}`).delete().then(() => {

      console.log('Document succesfully deleted!');

    }).catch(err => {

      console.log('Error removing document', err);

    });

  });

}

// Click add product button

btnAdd.addEventListener('click', () => {

  addModal.classList.add('modal-show');

  addModalForm.ProductName.value = '';

  addModalForm.BrandName.value = '';

  addModalForm.Price.value = '';

});

// User click anyware outside the modal

window.addEventListener('click', e => {

  if(e.target === addModal) {

    addModal.classList.remove('modal-show');

  }

  if(e.target === editModal) {

    editModal.classList.remove('modal-show');

  }

});

// Get all products

// db.collection('products').get().then(querySnapshot => {

//   querySnapshot.forEach(doc => {

//     renderUser(doc);

//   })

// });

// Real time listener

db.collection('products').onSnapshot(snapshot => {

  snapshot.docChanges().forEach(change => {

    if(change.type === 'added') {

      renderUser(change.doc);

    }

    if(change.type === 'removed') {

      let tr = document.querySelector(`[data-id='${change.doc.id}']`);

      let tbody = tr.parentElement;

      tableUsers.removeChild(tbody);

    }

    if(change.type === 'modified') {

      let tr = document.querySelector(`[data-id='${change.doc.id}']`);

      let tbody = tr.parentElement;

      tableUsers.removeChild(tbody);

      renderUser(change.doc);

    }

  })

})

// Click submit in add modal

addModalForm.addEventListener('submit', e => {

  e.preventDefault();

  db.collection('products').add({

    ProductName: addModalForm.ProductName.value,

    BrandName: addModalForm.BrandName.value,

    Price: addModalForm.Price.value,

    Imagesrc: image.src,

  });

  //Close Modal

  modalWrapper.classList.remove('modal-show');

});

// Click submit in edit modal

editModalForm.addEventListener('submit', e => {

  e.preventDefault();

  db.collection('products').doc(id).update({

    ProductName: editModalForm.ProductName.value,

    BrandName: editModalForm.BrandName.value,

    Price: editModalForm.Price.value,

    Imagesrc: image.src,

  });

  editModal.classList.remove('modal-show');

  

});

/////////////////////////

