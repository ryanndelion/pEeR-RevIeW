function randomInt()
{
    var result = Math.floor((Math.random() * 5) + 1);
    return result;
}


var randomizeInputValue = function(el){
  if ($(el).length != 0){
    switch( $(el)[0].nodeName.toLowerCase() ) {
      case "input":
        var type = $(el).attr('type');
        // var value = randomInt(); //change to this to implement random scores (but don't be an asshole, just give everyone 5)
        var value = 5;
        $(el).focus().val(value);
        break;
      default:
        var value = randomResponse();
        $(el).focus().val(value);//faker.lorem.sentences());
        break;
    }  
  }
};

var fakerResponsesAppreciate = ["Good job!", "Well done is better than well said and you have proved it with your great effort. You are a perfect doer and very dedicated. Keep up the great work!", 
                                  "In the end you are a winner! You are one of those great people who doesn’t wait for opportunities to come and knock on their door but step out to look for them. All the best!",
                                  "This is the beginning of many more good things to come. May you get everything, that you could demand. Best wishes in all you do and congrats on the job well done!",
                                  "Congratulations for a job well done! I was always confident of your abilities to shoulder your responsibilities. You should be very proud of yourself.",
                                  "Your achievements speaks itself about your capabilities. Slow and steady makes it to the top! Good job!",
                                  "Not a single effort of yours will go in vain. You will be rewarded for your pain. Your hard work will bring you a lot of gains. Well done."];
var fakerResponsesHate = ["Stop eating in class", "Hey man, you're doing good don't worry", "NA", "None", "*Constructive criticism noises*", "No comment, good job!", "Try to involve yourself more in discussions, we value your ideas!"];
var fakerResponsesGroup = ["Our group did great this term!", "We work together well", "Hopefully we can get closer as a team", "Most of us are very friendly and work well together", "i liek beans", "help me"];

function randomResponse(a)
{
  if( a == 0){
    var result = fakerResponsesAppreciate[Math.floor(Math.random()*fakerResponsesAppreciate.length)];
    return result;
  }
  if( a == 1){
    var result = fakerResponsesHate[Math.floor(Math.random()*fakerResponsesHate.length)];
    return result;
  }
  if( a == 2){
    var result = fakerResponsesGroup[Math.floor(Math.random()*fakerResponsesGroup.length)];
    return result;
  }
}
try{
document.getElementById('responsetext-10-0').firstChild.innerHTML = randomResponse(0)
document.getElementById('responsetext-10-1').firstChild.innerHTML = randomResponse(0)
document.getElementById('responsetext-10-2').firstChild.innerHTML = randomResponse(0)
document.getElementById('responsetext-10-3').firstChild.innerHTML = randomResponse(0)
document.getElementById('responsetext-10-4').firstChild.innerHTML = randomResponse(0)
document.getElementById('responsetext-10-5').firstChild.innerHTML = randomResponse(0)
}
catch(e){
console.log(e);
}
try{
document.getElementById('responsetext-11-0').firstChild.innerHTML = randomResponse(1)
document.getElementById('responsetext-11-1').firstChild.innerHTML = randomResponse(1)
document.getElementById('responsetext-11-2').firstChild.innerHTML = randomResponse(1)
document.getElementById('responsetext-11-3').firstChild.innerHTML = randomResponse(1)
document.getElementById('responsetext-11-4').firstChild.innerHTML = randomResponse(1)
document.getElementById('responsetext-11-5').firstChild.innerHTML = randomResponse(1)
}
catch(e){
console.log(e);
}
try{
document.getElementById('responsetext-12-0').firstChild.innerHTML = randomResponse(2)
}
catch(e){
console.log(e);
}

chrome.extension.sendRequest({
  "action": "getOptions",
  "args": []
}, function(response){
  if (deepAutofillChromeExtensionSettings){
    if (deepAutofillChromeExtensionSettings.randomLocale){
      console.info("setting locale", deepAutofillChromeExtensionSettings.randomLocale);
      faker.locale = deepAutofillChromeExtensionSettings.randomLocale
    }
    for(var i = 0; i < deepAutofillChromeExtensionSettings.fields.length; i++){
      var field = deepAutofillChromeExtensionSettings.fields[i];
      var value = faker.lorem.word();
      if (field.static){
        value = field.static;
      }
      if (field.random){
        value = faker.fake(field.random);
      }
      
      if (!field.static && !field.random){
        randomizeInputValue($(field.selector));
      } else {
        $(field.selector).focus().val(value);  
      }
      console.debug(field.selector, value);   
    }
  } else {
    $("input:enabled, select:enabled, textarea:enabled").not(':button,:hidden,input[type=submit],input[readonly]').each(function(){
      randomizeInputValue(this);
    }); 
  }
});  

