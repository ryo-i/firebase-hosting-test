       // Config
        /* const config = {
            apiKey: "AIzaSyBju9iq3ug6gJMqyVsoGX_YByHt6L3Dh0c",
            authDomain: "kumokotsu-test.firebaseapp.com",
            databaseURL: "https://kumokotsu-test-default-rtdb.firebaseio.com",
            storageBucket: "kumokotsu-test.appspot.com"
        };
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        };

        const db = firebase.database(); */

        const postIkku = document.querySelector('.postIkku');
        const postBtn = document.querySelector('.postBtn');
        const ikkulist = document.querySelector('.ikkuList');
        const url = 'https://kumokotsu-test-default-rtdb.firebaseio.com/ikkuList';
        const fullUrl = url + '.json';

        // Create
        const createFetch = () => {
            const thisUrl = fullUrl;
            const data = {
                ikku: postIkku.value
            };
            fetch(thisUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if(!response.ok) {
                    console.log('Create error!');
                    throw new Error('error');
                }
                console.log('Create ok!');
                return response.json();
            }).then((data)  => {
                const thisId = data.name;
                getFetchData(thisId);
            }).catch((error) => {
                console.log(error);
            });
        };

        const getFetchData = (thisId) => {
            const thisUrl = url + '/' + thisId + '.json'
            console.log('Create Id->' + thisId);
            return fetch(thisUrl).then((response) => {
                if(!response.ok) {
                    console.log('Read error!');
                    throw new Error('error');
                } 
                console.log('Read ok!');
                return response.json();
            }).then((data)  => {
                postIkku.value = '';
                appendList(thisId, data);
            }).catch((error) => {
                console.log(error);
            });
        };

        postBtn.addEventListener('click', createFetch, false);


        // Read
        const readFetch = () => {
            const thisUrl = fullUrl;
            fetch(thisUrl).then((response) => {
                if(!response.ok) {
                    console.log('Read error!');
                    throw new Error('error');
                } 
                console.log('Read ok!');
                return response.json();
            }).then((data)  => {               
                Object.keys(data).forEach((key) => {
                    appendList(key, data[key]);
                });
            }).catch((error) => {
                console.log(error);
            });
        };
        
        readFetch();


        // Update
        const updateFetch = (thisLi) => {
            const thisId = thisLi.dataset.id;
            const thisUrl = url + '/' + thisId + '.json'
            const updateArea = thisLi.querySelector('.updateArea');
            const updateIkku = thisLi.querySelector('.updateIkku').value;
            const data = {
                ikku: updateIkku
            };
            
            fetch(thisUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if(!response.ok) {
                    console.log('Update error!');
                    throw new Error('error');
                } 
                console.log('Update ok!');
                return response.json();
            }).then((data)  => {
                console.log('Update Id->' + thisId);
                console.log('Updata Ikku->' + data.ikku);
                thisLi.firstChild.textContent = data.ikku;
                thisLi.removeChild(updateArea);
            }).catch((error) => {
                console.log(error);
            });
        };

        document.addEventListener('click', (e) => {
            if (e.target.className !=='updateBtn') {
                return;
            } 
            const thisLi = e.target.closest('li');
            updateFetch(thisLi);
        }, false);


        // Delete
        const deleteFetch = (thisLi) => {
            const thisId = thisLi.dataset.id;
            const thisUrl = url + '/' + thisId + '.json'            
            fetch(thisUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                if(!response.ok) {
                    console.log('Delete error!');
                    throw new Error('error');
                }
                console.log('Delete ok!');
                return response.json();
            }).then((data)  => {
                if (data === null) {
                    console.log('Delete ID->' + thisId);
                }
                thisLi.remove();
            }).catch((error) => {
                console.log(error);
            });
        };

        document.addEventListener('click', (e) => {
            if (e.target.className !=='doDelete') {
                return;
            } 
            const thisLi = e.target.closest('li');
            deleteFetch(thisLi);
        }, false);


        // Append Button
        const appendBtn = (className, text) => {
            const btn = document.createElement('button');
            btn.className = className;
            btn.innerHTML = text;
            return btn;
        };


        // Append List
        const appendList = (id, thisData) => {
            const li = document.createElement('li');
            const thisId = id;
            console.log('Read Id->' + thisId);
            const thisIkku = thisData.ikku;
            console.log('Read Ikku->' + thisIkku);
            li.dataset.id = thisId;
            li.innerHTML = thisIkku;
            const updateBtn = appendBtn('doUpdate', '修正');
            li.appendChild(updateBtn);
            const deleteBtn = appendBtn('doDelete', '削除');
            li.appendChild(deleteBtn);
            ikkulist.appendChild(li);
        };


        // Append Update Area
        const appendUpdateInput =  (thisIkku) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'updateIkku';
            input.size = '30';
            input.maxlength = '30px';
            input.className = 'updateIkku';
            input.value = thisIkku;
            return input;
        };

        const appendUpdateBtn = () => {
            const btn = document.createElement('input');
            btn.type = 'button';
            btn.value = '送信';
            btn.className = 'updateBtn';
            return btn;
        };

        const appendUpdateArea = (thisLi) => {
            const thisIkku = thisLi.firstChild.textContent;
            const appendDiv = document.createElement('div');
            appendDiv.className = 'updateArea';
            appendDiv.appendChild(appendUpdateInput(thisIkku));
            appendDiv.appendChild(appendUpdateBtn());
            thisLi.appendChild(appendDiv);
        };

        document.addEventListener('click', (e) => {
            if (e.target.className !=='doUpdate') {
                return;
            }
            const thisLi = e.target.closest('li');
            if (thisLi.querySelector('.updateArea') === null) {
                appendUpdateArea(thisLi);
            }
        }, false);