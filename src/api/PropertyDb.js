
// endpoints
const apiBaseUrl = 'https://www.seesternconsulting.com/api';

export const imgUrl = `${apiBaseUrl}/uploads/`;

export const loginEndpoint = `${apiBaseUrl}/ajax.php?action=login`;
export const registerEndpoint = `${apiBaseUrl}/ajax.php?action=saveUser`;
export const addEndpoint = `${apiBaseUrl}/ajax.php?action=saveProperty`;
export const imageEndpoint = `${apiBaseUrl}/ajax.php?action=saveImage&id=`;
export const propertyEndpoint = `${apiBaseUrl}/ajax.php?action=property`;
export const similarEndpoint = `${apiBaseUrl}/ajax.php?action=similar`;
export const galeryEndpoint = `${apiBaseUrl}/ajax.php?action=galeryList`;
export const mypropertyEndpoint = `${apiBaseUrl}/ajax.php?action=myProperty`;
export const searchEndpoint = `${apiBaseUrl}/ajax.php?action=search`;
export const provinceEndpoint = `${apiBaseUrl}/ajax.php?action=province`;
export const communeEndpoint = `${apiBaseUrl}/ajax.php?action=commune`;
export const zoneEndpoint = `${apiBaseUrl}/ajax.php?action=zone`;
export const quartierEndpoint = `${apiBaseUrl}/ajax.php?action=quartier`;
export const adminSearchEndpoint = `${apiBaseUrl}/ajax.php?action=adminSearch`;
export const occupiedEndpoint = `${apiBaseUrl}/ajax.php?action=freeProperty`;
export const deleteEndpoint = `${apiBaseUrl}/ajax.php?action=deleteProperty`;
export const deleteUserEndpoint = `${apiBaseUrl}/ajax.php?action=deleteUser`;
export const logoutEndpoint = `${apiBaseUrl}/ajax.php?action=logout`;
export const forgotEndpoint = `${apiBaseUrl}/ajax.php?action=forgot`;
export const changePasswordEndpoint = `${apiBaseUrl}/ajax.php?action=changePassword`;



const apiCall = async (endpoint, Data)=>{

    const options = {
        method :'POST',
        body: JSON.stringify(Data), // encode data in json format
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    };

    try{

        const response = await fetch(endpoint,options);

          return(response);
           



    }catch(error){

        console.log('error: ',error);
        return {};
    }
}

//register
export const fetchRegister = (Datas)=>{
    return apiCall(registerEndpoint,Datas);
}

//login
export const fetchLogin = (Datas)=>{
    return apiCall(loginEndpoint,Datas);
}

//login
export const fetchLogout = (Datas)=>{
    return apiCall(logoutEndpoint,Datas);
}

//add property
export const addProperties = (Datas)=>{
    return apiCall(addEndpoint,Datas);
}
// home screen apis
export const fetchProperties = (Datas)=>{
    return apiCall(propertyEndpoint,Datas);
}

// similar
export const fetchSimilar = (Datas)=>{
    return apiCall(similarEndpoint,Datas);
}


//Galery
export const fetchGalery = (Datas)=>{
    return apiCall(galeryEndpoint,Datas);
}

//my Property

export const fetchMyProperty = (Datas)=>{
    return apiCall(mypropertyEndpoint,Datas);
}

//Search

export const fetchSearchResults = (Datas)=>{
    return apiCall(searchEndpoint,Datas);
}

//Admin Search

export const fetchAdminSearchResults = (Datas)=>{
    return apiCall(adminSearchEndpoint,Datas);
}

//province


export const fetchProvince = ()=>{
    return apiCall(provinceEndpoint);
}

//  Communes


export const fetchCommune = ()=>{
    return apiCall(communeEndpoint);
}

//Zone


export const fetchZone = (Datas)=>{
    return apiCall(zoneEndpoint,Datas);
}

//Quartier


export const fetchQuartier= ()=>{
    return apiCall(quartierEndpoint);
}

//Occupied


export const fetchOccupied= (Datas)=>{
    return apiCall(occupiedEndpoint,Datas);
}

//Modify Property


export const fetchModify= (Datas)=>{
    return apiCall(modifyEndpoint,Datas);
}

//Delete Property


export const fetchDelete= (Datas)=>{
    return apiCall(deleteEndpoint,Datas);
}

//Delete User

export const fetchDeleteUser= (Datas)=>{
    return apiCall(deleteUserEndpoint,Datas);
}


//Question User

export const fetchQuestion= (Datas)=>{
    return apiCall(questionEndpoint,Datas);
}

//Forgot Password

export const fetchForgot = (Datas)=>{
    return apiCall(forgotEndpoint,Datas);
}

//Change Password

export const fetchChangePassword = (Datas)=>{
    return apiCall(changePasswordEndpoint,Datas);
}




