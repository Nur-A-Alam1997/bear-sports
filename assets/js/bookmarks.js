window.onload = function(){
    const bookmarks = document.getElementsByClassName("bookmarks");
    [...bookmarks].forEach(bookmark => {
        bookmark.style.cursor="pointer"
        bookmark.addEventListener("click",function(e){


        let target= e.target.parentElement
        console.log(target.dataset.post)
        $.ajax(`/api/bookmarks/${target.dataset.post}`,
        {
            method:"GET",
            async:true,
            cache:false,
            success:(res)=>{
                // alert("done")
                if (res.bookmarks){
                    target.innerHTML=`<span class="material-icons">
                    bookmark
                    </span>`
                }else{
                    target.innerHTML=`<span class="material-icons">
                    bookmark_border
                    </span>`
                }
        },
            error:()=>{alert("you suck")}
        })
        

        })
    });
}