import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalImageService {

  constructor(private httpClient: HttpClient) { }

  uploadedImage: File | null = null; 
  dbImage: any;
  postResponse: any;
  successResponse: string='';
  image: any; 

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    if (this.uploadedImage) {
      const imageFormData = new FormData();
      imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

      const patientId = '123'; 
      const uploadUrl = `http://localhost:8070/upload/image/${patientId}`;

      this.httpClient.post(uploadUrl, imageFormData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }
        });
    }
  }

  viewImage() {
    if (this.image) {
      const imageUrl = `http://localhost:8070/get/image/info/${this.image}`;

      this.httpClient.get(imageUrl)
        .subscribe(
          res => {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          }
        );
    }
  }
  
}
