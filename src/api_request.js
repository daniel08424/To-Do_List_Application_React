const api_request = async(url='',optionObj = null,error_message=null) =>{
    try{
     const response = await fetch(url,optionObj);
     if(!response.ok) throw Error("Please reload the page")
    }
    catch(err){
        error_message = err.message
    }
    finally{
        return error_message
    }
}

export default api_request