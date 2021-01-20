document.addEventListener('DOMContentLoaded', () => {
    // DOM
    const email = document.querySelector('.email');
    const pass = document.querySelector('.pass');
    const loginBtn = document.querySelector('.loginBtn');
    const logoutBtn = document.querySelector('.logoutBtn');


    // Login Check
    const loginCheck = () => {
        const pathname = window.location.pathname;
        console.log(pathname);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('ログイン済み！');
                if (pathname === '/login.html') {
                    window.location.replace('fetch.html');
                }  
            } else {
                console.log('未ログイン！');
                if (pathname === '/fetch.html') {
                    window.location.replace('login.html');
                } 
            }
        });
    };
    loginCheck();


    // Login Event
    const login = () => {
        const emailVal = email.value;
            const passVal = pass.value;
            firebase.auth().signInWithEmailAndPassword(emailVal, passVal)
            .then((user) => {
                console.log('ログイン成功！');
                console.log(user);
                loginCheck();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('ログイン失敗！');
                console.log(errorCode);
                console.log(errorMessage);
                alert('ログインに失敗しました');
            });
    };
    if (loginBtn) {
        loginBtn.addEventListener( 'click', login, false );
    }


    // Logout Event
    if (logoutBtn) {
        logoutBtn.addEventListener( 'click', () => {
                firebase.auth().signOut();
                loginCheck(user);
        }, false );
    }
});





