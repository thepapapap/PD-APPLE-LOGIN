function generateNonce(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
}

let params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let clientId = params.clientId;
let callbackUrl = decodeURIComponent(params.callbackUrl);

//   const naverLogin = new naver.LoginWithNaverId({
//     clientId: clientId,
//     callbackUrl: callbackUrl,
//     isPopup: false,
//     loginButton: { color: "green", type: 3, height: "0" },
//   });
//   naverLogin.init();

let url = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}&response_type=code&nonce=${generateNonce(16)}&response_mode=query`

AppleID.auth.init({
    clientId : clientId,
    scope : 'name email',
    redirectURI : callbackUrl,
    nonce:generateNonce(16),
    usePopup : false
});
let aTag = document.querySelector(".apple_button");
aTag.setAttribute('href',url)
aTag.click()