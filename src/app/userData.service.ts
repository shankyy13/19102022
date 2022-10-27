import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class userDataService{
  blobfile:any;
  
  constructor(private http:HttpClient){}
  getUserData(){
    let apiurl="https://vox-web-api.azurewebsites.net/api/vox/getallreps";
    return this.http.get(apiurl);
  }
  
  DataURIToBlob(dataURI: string) {
  
    
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
          
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)
        
          return new Blob([ia], { type: mimeString })     
   
}

  public uploadfile(payload:any):Observable<any> {
    if(payload.img!=null)
    {
      this.blobfile = this.DataURIToBlob(payload.img)
    }
     
  const formData = new FormData();
  if(payload.img!=null)
  {
    formData.append('imageUrl', this.blobfile, 'image.png');
  }
  
  // if(title!=null)
  // {
  //   formData.append("userName",title)
  // }
  
  formData.append("userComments",payload.address)
  formData.append("companyName","VOX")

  formData.append("applicationName",payload.osName)
  formData.append("deviceName",payload.browserVarsion)
  
  if(payload.wallet!=null)
  {
    formData.append("walletAddress",payload.wallet)
  }
  
  
    return this.http.post('https://vox-web-api.azurewebsites.net/api/vox/postrep', formData)

  }
}