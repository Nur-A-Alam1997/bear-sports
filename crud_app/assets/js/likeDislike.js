const like = document.getElementById("like-btn")
const dislike = document.getElementById("dislike-btn");

const likePointer = document.getElementById("like")
const dislikePointer = document.getElementById("dislike");

likePointer.style.cursor="pointer"
dislikePointer.style.cursor="pointer"
    like.addEventListener("click",function(e){
        let postId =e.target.parentElement.dataset.post
        console.log(postId)
        $.ajax(`/api/like/${postId}`,
    {
        method:"GET",
        async:true,
        cache:false,
        success:(res)=>{
            alert("done")
            if (res.like & !res.dislike){
                document.getElementById("like-btn").innerHTML=`<a id="like"  
                class="btn btn-dark btn-sm"
                tabindex="-1" role="button" 
                aria-disabled="true">Liked
                (${res.totalLikes})</a>`
                console.log(res.like,res.dislike)

                document.getElementById("dislike-btn").innerHTML=`<a id="dislike"  
                class="btn btn-outline-dark btn-sm "
                 tabindex="-1" role="button" 
                aria-disabled="true">
                DisLike(${res.totalDisLikes})</a>`
            }
            if (res.like){
                document.getElementById("like-btn").innerHTML=`<a id="like"  
                class="btn btn-dark btn-sm"
                tabindex="-1" role="button" 
                aria-disabled="true">Liked
                (${res.totalLikes})</a>`
                console.log(res.like)
            }
            else{
                document.getElementById("like-btn").innerHTML=`<a id="like"  
                class="btn btn-outline-dark btn-sm "
                 tabindex="-1" role="button" 
                aria-disabled="true">
                Like(${res.totalLikes})</a>`
                console.log("unsuccess")
            }
    },
        error:()=>{alert("you suck")}
    })

        })
        
    dislike.addEventListener("click",function(e){
        let postId =e.target.parentElement.dataset.post
        console.log(postId)
        $.ajax(`/api/dislike/${postId}`,
    {
        method:"GET",
        async:true,
        cache:false,
        success:(res)=>{
            alert("done")
            if (res.dislike & !res.like){ 
                console.log(res.like)
                document.getElementById("dislike-btn").innerHTML=`<a id="dislike"  
                class="btn btn-dark btn-sm"
                tabindex="-1" role="button" 
                aria-disabled="true">DisLiked(${res.totalDisLikes})</a>`

                document.getElementById("like-btn").innerHTML=`<a id="like"  
                class="btn btn-outline-dark btn-sm "
                 tabindex="-1" role="button" 
                aria-disabled="true">
                Like(${res.totalLikes})</a>`
            }
            if (res.dislike){
                console.log(res.dislike)
                console.log(res.totalDisLikes)
                document.getElementById("dislike-btn").innerHTML=`<a id="dislike"  
                class="btn btn-dark btn-sm"
                tabindex="-1" role="button" 
                aria-disabled="true">DisLiked(${res.totalDisLikes})</a>`
            }
            else{
                console.log("unsuccess")
                document.getElementById("dislike-btn").innerHTML=`<a id="dislike"  
                class="btn btn-outline-dark btn-sm "
                 tabindex="-1" role="button" 
                aria-disabled="true">
                DisLike(${res.totalDisLikes})</a>`
                
                
            }
    },
        error:()=>{alert("you suck")}
    })

    })


    // let target= e.target.parentElement
    // console.log(target.dataset.post)
    
    

    
