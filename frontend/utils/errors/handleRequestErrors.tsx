import { Dispatch } from "react";
import { errorsActions } from "../../redux/slices/errors/errorsSlice";

export const handleAxiosError = (err:any,dispatch:Dispatch<{
    payload: any;
    type: string;
}>,errorTitle:string)=>{
    const {status} = err.response
    let errorMessage = '';

    if(status === 422){
      errorMessage = err.response.data.data[0].msg
    }else if(status === 403){
      errorMessage = err.response.data
    }
    dispatch(
      errorsActions.newError({
        errorTitle,
        errorMessage,
      })
    );
  }
