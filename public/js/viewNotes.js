window.onload = event => {
    firebase.auth().onAuthStateChanged(user =>{
        if(user){ //checks if the user variable is null
            console.log("signed in as ", user.displayName);
            const googleUserId = user.uid;
            getNotes(googleUserId);
        } else{
            window.location = "index.html";
        }
    });
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on("value", (snapshot) =>{
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = (data) => {
    let cards = ``;
    for(let noteItem in data){
        const note = data[noteItem];
        cards += createCard(note);
        // const noteTitle = note.title;
        // const noteText = note.text;
        // console.log(note, noteTitle, noteText);
    }
    document.querySelector("#app").innerHTML = cards;
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
    `;
}