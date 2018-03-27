 // main document ready function to check if dom is loaded fully or not
$( document ).ready(() => {


    $("#tokenText").trigger("focus");
    //Classes added for NavBar
    $('ul li').click(function() {
        $("li").removeClass("active");
        $(this).addClass("active");
    });

    //Hiding the containers on load
    $("#mainContainer").hide();
    $("#loader").hide();
    $("#containerCoverPic").hide();



    $("#linkBasicDetails").on('click',() => { //animation to Navbar
        $("#basicDetailsCard").show(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });//end function

    $("#linkAbout").on('click',() =>{


        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").show(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });

    $("#linkEducation").on('click',() => {

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").show(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkWork").on('click',() => {

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").show(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkPosts").on('click',() => {

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").show(1000);
    
    }); //End function





    //Functions for retrieving the data
	
    	
	function getFacebookInfo(){

        let myFacebookToken = $("#tokenText").val();
		localStorage.setItem("Token", myFacebookToken); //storing cookies for Token 
		
        	$.ajax('https://graph.facebook.com/me?fields=id,name,cover,education,work,birthday,gender,interested_in,languages,quotes,email,address,picture.width(300).height(300),friends&access_token='+myFacebookToken,{

                success : function(response){
  //                  console.log(response);
  //                  console.log(typeof(response));
                    
                    //Cover and Profile pic

                    $("#profilePic").attr("src", ""+ response.picture.data.url + "");
                    $("#coverPic").attr("src", "" + response.cover.source + "");
                    

                    //Basic Details
			        $("#myName").text(response.name);
                    $("#myBirthday").text(response.birthday);
                    $("#myGender").text(response.gender);
                    $("#myInterest").text(response.interested_in);
                    let lang = $.map(response.languages, (index) => {
                        return index.name;
                    });
                    $("#myLanguages").text(lang);

                    //About
                    $("#myQoutes").text(response.quotes);

                    $("#myEmail").text(response.email);

                    let friends = $.map(response.friends.data, (index,value) => {
                        return index.name;
                    });
                    
                    let friendsCounts = response.friends.summary.total_count;

                    $("#myFriends").text(friends + "+" + friendsCounts + " more" ); 

                    

                    //Work 

                    let employer = $.map(response.work, (index,value) => {
                        if(index.employer != undefined && index.employer!= null ){
                            return (index.employer.name );
                        }
                        else{
                            return "N/A";
                        }
                    });

                    let position = $.map(response.work, (index,value) => {
                        if(index.position != undefined && index.position != null){
                            return (index.position.name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(employer, function(i, item) {
                        if(employer[i] != null && position[i] != null)
                            $("#myEmployer").append("<strong>Company : </strong>" + employer[i] + "<br>" + "<strong>Position : </strong>" + position[i] + "<hr>" );
                    });
                    //End Work


                    //Education

                    let colleges = $.map(response.education, (index,value) => {
                        if(index.school != undefined && index.school != null ){
                            return index.school.name;
                        }
                        else{
                            return "N/A";
                        }
                    });

                    let concentration = $.map(response.education, (index,value) => {
                        if(index.concentration != undefined && index.concentration != null){
                            return (index.concentration[0].name);
                            //console.log(index.concentration[0].name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(colleges, (i, item) => {
                       if(concentration[i] != null && colleges[i] != null)
                            //console.log(colleges[i]);
                            $("#myEducation").append("<strong>School Name : </strong>" +  colleges[i] + "<br>" + "<strong>Concentration :</strong> "+ concentration[i] + "<hr>" );
                    });

                    //End Education

                    $("#mainContainer").show();
                    $("#basicDetailsCard").show(1000);
                    $("#aboutCard").hide(1000);
                    $("#educationCard").hide(1000);
                    $("#workCard").hide(1000);
                    $("#postsCard").hide(1000);
                    $("#containerCoverPic").show(1000);

                },

                timeout: 1500, // keeping the timeout for 1.5 sec 
                beforeSend:  () => { //Displaying loader
                    $('#loader').delay(1500).show();
                    $("#mainContainer").hide();

                },
                complete:  () => {
                    $('#loader').delay(1500).hide(); // hide the loader on screen 

                },

                error: (req, status, error) => { // error function for showing the error on console and giving warining to users via alert
                    $('#loader').delay(1500).hide(); // hide the loader on screen 
                    $("#mainContainer").hide();
                    $("#containerCoverPic").hide();


                    console.log("Error occured", status, error);
                        alert("Invalid Token or Server Timeout");    
                    
                }

            }//end argument list 
        );// end ajax call 

    }// end get facebook info

 


   $("#facebookBtn").on('click',getFacebookInfo); // calling getFacebookInfo method to retrieve the data




});
