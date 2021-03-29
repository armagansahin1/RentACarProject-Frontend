import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit {
  colorForm:FormGroup
  addColorForm:FormGroup
  colors:Color[]
  currentColorId?:number
  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private colorService:ColorService) { }

  ngOnInit(): void {
    this.getAllColors();
    this.createColorForm();
   
  }
  
  createColorForm(){
    this.colorForm=this.formBuilder.group({
     colorId:["",Validators.required],
     colorName:["",Validators.required]
    })
    this.addColorForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  getAllColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  setCurrentColorId(colorId?:number){
    this.currentColorId=colorId
    console.log(this.currentColorId)
  }

  update(){
    this.colorForm.patchValue({colorId:this.currentColorId})
    let colorModel:Color=Object.assign({},this.colorForm.value)
    if(this.colorForm.valid){
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success("Renk ismi Güncellendi")
        window.location.reload();
      },
      responseError=>{
       if(responseError.error.Errors.length > 0) {
         for(let i=0;i<responseError.error.Errors.length;i++) {
           this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
         }
       }
      }
      )
    }else{
      this.toastrService.error("Eksik bilgi girdiniz")
    }
  }

  add(){
  
    let colorModel:Color=Object.assign({},this.addColorForm.value)
    if(this.addColorForm.valid){
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success("Renk eklendi")
        window.location.reload();

      },
      responseError=>{
       
         console.log(responseError)
      }
      )
    }else{
      this.toastrService.error("Eksik bilgi girdiniz")
    }
  }

  delete(colorName:string,colorId?:number){
    let colorToDelete:Color={colorId:colorId,colorName:colorName}
    this.colorService.delete(colorToDelete).subscribe(response=>{
      this.toastrService.info("Renk ismi silindi !!!")
      window.location.reload();

    })
  }

  
}
