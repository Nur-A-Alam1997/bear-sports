// const { headers } = require("express-validator")

window.onload=function(){
    let baseCropping =$("#cropped-image").croppie(
        {
            viewport: {
                width: 150,
                height: 200
            },
            boundary:{
                width:300,
                height:300
            },
            showZoomer:true
            
        })

        function readableFile(file)
        {
            let reader =new FileReader()
            reader.onload=function(event){
                baseCropping.croppie("bind",
                {
                    url:event.target.result
                }).then(()=>
                    {
                        $(".cr-slider").attr(
                            {
                                "min":0.5984,
                                "max":1.5000
                            }) 
                    })
            }
            reader.readAsDataURL(file)
            console.log(reader.readAsDataURL(file))
        }


        $("#profilePic").on("change",function(e)
        {
            if (this.files[0]){
                readableFile(this.files[0])
                $("#crop-modal").modal({
                        backdrop:"static",
                        keyboard:false
                    })
            }
        })

        $("#cancel-cropping").on("click",function(){
            $("#crop-modal").modal("hide")
            setTimeout(()=>
            {
                baseCropping.croppie("destroy")
            },1000)
        }),
        $("#upload-image").on("click",function(){
            baseCropping.croppie("result","blob")
            .then(blob=>{
                let formData = new FormData()
                let file =document.getElementById("profilePic").files[0]
                let name = generateFileName(file.name)
                formData.append("profilePic",blob,name)


                let headers = new Headers()
                // headers.append("Accept","Application/JSON")
                // headers.append("Content-Type","Application/JSON")

                let req = new Request ("/createProfile",
                {
                    method:"POST",
                    headers,
                    mode:"cors",
                    body:formData

                })
                return fetch(req)

            })
            .then(res=>res.json())
            .then(data=>{

                document.getElementById("removeProfilePicfile").style.display="block"
                document.getElementById("profilePic").src=data.profilePic
                document.getElementById("profilePicForm").requestFullscreen()
                $("#crop-modal").modal("hide")
                setTimeout(()=>{
                    baseCropping.croppie("destroy")
                },1000)


            })
        })
}


function generateFileName(name){
  const  types =/(.jpeg|.jpg|.png|.gif)/
  return name.replace(types,".png")
}
