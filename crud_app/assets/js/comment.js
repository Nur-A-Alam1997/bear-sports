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
            success:(res)=>{console.log("done",res.commentJSON)
                            res.commentJSON},
            error:(res)=>{alert("you suck")}
            })
    }
}


})