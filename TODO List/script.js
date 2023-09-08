const addUserBtn = document.getElementById('addUser')
const btnText= addUserBtn.innerText;
const usernameText = document.getElementById('username')
const recordsDisplay = document.getElementById('records')

let userArray = [];
let edit_id=null;

let objStr = localStorage.getItem('users')
// converting again it into object and adding it in usrnasme array so that it will not change after refresh
if (objStr != null) {
    userArray = JSON.parse(objStr)
}


DisplayInfo();
addUserBtn.onclick = () => {
      const name = usernameText.value;

    if(edit_id!=null){
        //edit

        userArray.splice(edit_id,1,{ 'name': name })//at edit_id ,1 delete and also add name that is changed

        edit_id=null;// make it null again after edit or save the changes otherweise new name will not be inserted only edited to that particular name 
    }else{

        //nsert
        userArray.push({ 'name': name })
    }
  
   
   

    // so that on refresh array will not be empty
    // so store on local storage

    SaveInfo(userArray)
    DisplayInfo()
    // after click add user save info and after that remove it from user textfiled area
    usernameText.value = ''
    
    // again making the button name (ADD USER ) instead of (SAVE CHANGES)
    
    // don't do like the below statement bcoz if someone changes button name by SUBMIT let's say,in index.html file 
    // then instaed of showing submit name again after shave changes it will show Add User on button so we change it dynamically 

//    addUserBtn.innerText='Add User' 

addUserBtn.innerText= btnText;
}


function SaveInfo(userArray) {

    // convert object(userarray) into string
    let str = JSON.stringify(userArray)
    // as setitem takes both parameters as string so we use json.stringify

    localStorage.setItem('users', str)
    //always display when save 
    DisplayInfo()
  
}

function DisplayInfo() {

    let statement = ''

    userArray.forEach((user,i) => {

        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class=" btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>

      </tr>`
    })

    recordsDisplay.innerHTML=statement


}

function EditInfo(id) {
// it stores the id of that name which has been clicked for edit button 
    edit_id=id;
usernameText.value= userArray[id].name
// show same changes instaed of add user on button 
addUserBtn.innerText='Save Changes'
// now check when it gonna click again means after save changes then again it should show (Add User) again instaed of save changes, so where it gonna click again on addUserBtn.onclick(), so go there....

}

function DeleteInfo(id) {
//delete 1 only
    userArray.splice(id,1)

    //save my changes 
    SaveInfo(userArray);


}


//SEARCH FEATURE

//select all table rows
const allTr= document.querySelectorAll('#records tr')
const searchInput=document.querySelector('#search')

// when click on search button
searchInput.addEventListener('input',function(e){
  
    //convert search input to lowercase and also convert  obtain input to lowercase that is present in file 
  const searchStr= e.target.value.toLowerCase(); 
  // display none means when this query will work it will not display all the data it will show only the data that is searched in search box
  recordsDisplay.innerHTML=''; 
    // console.log(e.target.value)
    allTr.forEach(tr=>{
        //2 td in tr(table row) one is having name and other having edit buton section
        // so we take value at (0th) index from array
        const td_in_tr =tr.querySelectorAll('td');
        
        // also convert  obtain input to lowercase that is present in file 
        if(td_in_tr[0].innerText.toLowerCase().indexOf(searchStr)>-1){
            recordsDisplay.appendChild(tr);
        }
    })

    if(recordsDisplay.innerHTML==''){
        recordsDisplay.innerHTML='No Records Found !'
    }


})