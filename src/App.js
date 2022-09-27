import { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
   selectedFile: null
  }

  fileSelectedHandler = (event) => {
  
   const file = event.target.files[0]; 

   if (file && !file.name) {
      window.alert("Selecione um arquivos de imagem!");
      return false;
   }
   if (file.size > 10e6) { //10mb
     window.alert("Escolha um arquivo com menos de 10 MB!");
     return false;
   }

   console.log(file); //C:\fakepath\cabelo1.jpg
   console.log(file.name); //cabelo1.jpg
   console.log(file.size); //47897

    if(file &&file.size < 10e6) { 
     this.setState({
      selectedFile: file//event.target.files[0]
     })
     file = null;
    }
   /*

   lastModified: 1639668951678
   lastModifiedDate: Thu Dec 16 2021 12:35:51 GMT-0300 (Horário Padrão de Brasília)
   name: "CaseAndMolly.jpg"
   size: 114718
   type: "image/jpeg"
   webkitRelativePath:  ""

  */
  }

  fileUploadHandler = async (event) => {
    
    if(this.state.selectedFile) {
       //criando objeto
       const fd = new FormData();
       fd.append('image', this.state.selectedFile, this.state.selectedFile.name) 

       //mandando para nuvem exe endpoint precisa de backend vai estourar erro
       await axios.post('http://endereco-nuvem.com/images', fd, {
        onUploadProgress: (data) => {
          console.log(data.loaded," / " ,data.total, "%");
          console.log(Math.round(data.loaded / data.total * 100) + "%");
        }
       })
         .then( res => {  
          console.log(res);
          this.setState({
            selectedFile: null
           })
         })
         .catch( error => {
          console.log(error); 
          this.setState({
            selectedFile: null
           })
         });

        }
   
  }
  
  render() {
  return (
    <div className="App">
     <input type="file" onChange={this.fileSelectedHandler}/>
     { this.state.selectedFile ? <button onClick={this.fileUploadHandler}>UPLOAD FILE</button> : null}
    </div>
   )
  }
}

export default App;
