$( document ).ready(() => {

    let totalPosts = 0;
    /*localStorage.setItem("Token", myFacebookToken);  remember we had set cookies to store our token?*/
    let myFacebookToken = localStorage.getItem("Token"); //getting token from cookies 
    function getFacebookPosts(start,end){

	
        //AJAX call for feeds
        $.ajax('https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source,likes,comments,shares,actions},name&access_token='+myFacebookToken,{
                success : (response) => {
                    //console.log("Values Between" + start + " and " + end );
                    let myStories = [], myMessages = [], myImagesVideos = [], myLikes = [];

                    let myPosts = $.map(response.posts.data,  (index, value) => {
                        if(value >= start && value < end) {
                            return index;                            
                        }
                    });
                        


		    totalPosts = response.posts.data.length;
                    //console.log(response.posts.data.length);

                    // Storing Stories into array and handling undefined values
                    $.each(myPosts, (i, item) =>{

                        if(myPosts[i].story != undefined){
                            myStories[i] = myPosts[i].story;    
                        }
                        else{
                            myStories[i] = response.name ;          
                        }
    
                        if(myPosts[i].message != undefined){
                            myMessages[i] = myPosts[i].message;    
                        }
                        else{
                            myMessages[i] = "" ;          
                        }

                        if(myPosts[i].likes != undefined){
                            myLikes[i] = myPosts[i].likes.data[0].name + " and " + myPosts[i].likes.data.length + " more";    
                        }
                        else{
                            myLikes[i] = "";          
                        }

                      
                        if(myPosts[i].type == "photo"){
                            myImagesVideos[i] = "<img src='" + myPosts[i].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='60%' border=1px>";    
                        }
                        else if (myPosts[i].type == "video"){
                            myImagesVideos[i] = "<video controls src=" + "" + myPosts[i].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>";          
                        }
                        else if (myPosts[i].type == "link"){
                            myImagesVideos[i] = "<a href='" + myPosts[i].full_picture + "'> Visit this Post Here</a>" ;   
                        }                            
                        else if (myPosts[i].type == "status"){
                            myImagesVideos[i] = "<h6> Updated status </h5>";
                        }                            


                            //Appending html to div
                        $("#mainContainerPosts").append(

                            "<div class='container ' id='postCard'>" +
                                "<div class='row'>" +
                                    "<div class='col-sm-12 col-md-8 col-lg-6'> " +
                                        "<h5><span id='myStoryName'>" + myStories[i] +  "</span> </h5>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='row'>" +
                                   "<div class='col-sm-12 col-md-8 col-lg-6'>" +
                                        "<h6><span id='myMessage'> " + myMessages[i] + "</span> </h6>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='row'>" +
                                    "<div class='col-sm-12 col-md-8 col-lg-6'> " +
                                        "<h4><span > " + myImagesVideos[i] + "</span> </h4>" +
                                    "</div>" +
                                          
                                "</div>" +
                                "<div class='row'>" +
                                    "<div class='col-sm-12 col-md-8 col-lg-6'> " +
                                    "<h6><span id='myLikesBy'> " + myLikes[i] + "</span> </h6>" +
                                    "</div>"  +
                                "</div>"+

                                "<div class='row no-gutters'>" +
                                    "<div class='col-lg-auto'> " +
                                        "<span id='myActionLikes'><a type='button' class='btn btn-outline-secondary' href='" + myPosts[i].actions[0].link + "'><i class='far fa-thumbs-up'></i> Like </a></span>"+
                                        "<span id='myActionComments'><a type='button' class='btn btn-outline-secondary' href='" + myPosts[i].actions[0].link + "'> <i class='far fa-comment'></i> Comment</a></span>"+
                                        "<span id='myActionShares'><a type='button' class='btn btn-outline-secondary' href='" + myPosts[i].actions[0].link + "'> <i class='fas fa-share'></i> Share</a></span>"+
                                    "</div>"+
                                 "</div>"  +
                            "</div>"      +
                            "<hr>"
                        );

                    });

                }, //End success function

                timeout: 5000, // keeping the timeout for 5 sec 
                beforeSend: () => { //Displaying loader
			    $('#getCount').text("Loading...");
			    $('#loaderPosts').delay(1000).show();

                },
                complete: () => {
                    $('#loaderPosts').delay(1000).hide(); // hide the loader on screen 
        		    $('#getCount').text("See More");
                },

                error:  (req, status, error) => { // error function for showing the error on console and giving warining to users via alert
                    $('#loaderPosts').delay(1000).hide(); // hide the loader on screen 

                    console.log('Error occured', status, error);
                    if(status="timeout"){
                        alert("Server Timeout");    
                    }
                    else{
                        alert("Invalid Token");   
                    }
		        }//end error function
            }//End argument list        
        );//End AJAX call for feed
    }//End getFacebookPosts


	
    
    let end=3,start=0;
    getFacebookPosts(start,end); // calling getFacebookPosts method to retrieve the data
    
    $("#getCount").on('click',() => {
	start=end;
        end = (end+5 <= totalPosts) ? end+5 : totalPosts;
	
	if( start == end){ //if both ends are same stop and disabled the button
		$("#getCount").attr('disabled',true).text("No more Posts");				
	}		
	else{ //else continue with the start and end values
		getFacebookPosts(start,end);
	}
		
    }); 


});











