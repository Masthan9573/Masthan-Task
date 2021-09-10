import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.p_category ==="Premium"){
          a.p_category ="Premium"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

  }
  
  filter(p_category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.p_category == p_category || p_category==''){
        return a;
      }
    })
  }
  inc(item: { p_qnt: number; }){
    item.p_qnt=item.p_qnt+1;
  }
  dec(item: { p_qnt: number; }){
    item.p_qnt=item.p_qnt-1;
  }

}
