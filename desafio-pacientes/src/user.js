var userInfos = {
    name: '',
    motherName: '',
    birthday: '',
    cpf: '',
    cns: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    email: '',
    password: '',
    userPhoto: null,
    fileName: ''
}

export default{
    state:{
        userData: userInfos
    },
    mutations:{
        loggedUser(state , data){
            console.log(data)
            console.log(state)
            state.userData = data
        },
        logoutUser(state){
            state.userData = userInfos
            localStorage.clear();
        }
    }
}