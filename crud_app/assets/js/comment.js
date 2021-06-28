const comment =document.getElementById("comment")
const commentHolder= document.getElementById("comment-holder")





comment.addEventListener("keypress",function(e)
{

    if (e.key=="Enter")
{
        if (e.target.value)
    {
            let postId=comment.dataset.post
            let comments= e.target.value
            console.log(postId, comments)
            $.ajax(`/api/comment/${postId}`,
            {

            method:"POST",
            data: {comments},
            async:true,
            cache:false,
            success:(res)=>{console.log("done",res.user,res.body)
                            res.body
                        
                        let commentElement =createdComment(res)
                        // commentHolder.insertAdjacentElement(commentHolder,commentElement)
                        commentHolder.insertBefore(commentElement,commentHolder.children[0])
                        document.getElementById("comment").value=""

                        },
            error:(res)=>{alert("you suck")}
            })
    }
}


})


function createdComment(res){
    
    let innerHTML= `<img src="${res.user.profilePic}" alt="" style="width: 20px;height:30px;border-radius: 50%;"class="">
    <i>${res.user.name}</i>
    <div class="media-body my-2" style="margin: 8px;
     ;overflow-wrap: break-word;">
        <p>${res.body}
            
            
        <small style="float: right;"><i>${res.createdAt}</i></small>
        
        </p>
        </div>`


    let div = document.createElement("div")
    div.className="media border bg-light"
    div.innerHTML=innerHTML
    return div
}