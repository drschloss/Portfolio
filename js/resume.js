function resume() {
  var name;
  var email;
  var address;
  var objective;
  var exp;
  var expDetail;
  var skills;
  var skillType;
  var edu;
  var self = this;
  var queryResults;
  this.initData = function() {
    $.post('index.html', {query: 'name'}, function(data, status){
      if(status === 'success'){
        name = {
          first: data[0].first,
          mi: data[0].middle[0],
          last: data[0].last
        };
        $('#name').html(printName(getName()));
      } else {
        console.log('Failure: '+ status);
      }
    });
    email = "drschloss@gmail.com";
    $.post('index.html', {query: 'address'}, function(data, status){
      if(status === 'success'){
        //alert(data.street)
        address = {
          streetNum: data[0].streetNum,
          streetName: data[0].streetName,
          aptNum: 11,
          city: data[0].city,
          state: data[0].state,
          country: data[0].country,
          zip: data[0].zip,
          phone: data[0].phone
        };
        $('#footer').find('p').text(printAddress(getAddress()));
        //$('#name').html(printName(getName()));
      } else {
        console.log('Failure: '+ status);
      }
    });
    objective = "More than 6 years programming and application development experience with work on multiple contracts in vastly differing domains of technology.  Looking to make a major change in development environment to enable better flexibility and innovation.";

    $.post('index.html', {query: 'experience'}, function(data, status){
      if(status === 'success'){
        exp = data;
        $.post('index.html', {query: 'expDetail'}, function(data, status){
          if(status === 'success'){
            expDetail = data;
          } else {
            console.log('Failure: '+ status);
          }
          processExp();
        });
      } else {
        console.log('Failure: '+ status);
      }
    });

    $.post('index.html', {query: 'education'}, function(data, status){
      if(status === 'success'){
        edu = data;
        processEdu();
      } else {
        console.log('Failure: '+ status);
      }
    });
    $.post('index.html', {query: 'skillTypes'}, function(data, status){
      if(status === 'success'){
        skillType = data;
      } else {
        console.log('Failure: '+ status);
      }
    });
    $.post('index.html', {query: 'skills'}, function(data, status){
      if(status === 'success'){
        skills = data;
        $.post('index.html', {query: 'skillTypes'}, function(data, status){
          if(status === 'success'){
            skillType = data;
          } else {
            console.log('Failure: '+ status);
          }
          processSkills();
        });
      } else {
        console.log('Failure: '+ status);
      }
    });
  };

  this.getName = function() {
    return name;
  };

  this.getEmail = function() {
    return email;
  };

  this.printName = function(nameObj) {
    var fullName = nameObj.first + " " + nameObj.mi + " " + nameObj.last;

    return fullName;
  };

  this.getAddress = function() {
    return address;
  };

  this.printAddress = function(addressObj) {
    var fullAddress = addressObj.streetNum + " " + addressObj.streetName +
      ", Apt. " + addressObj.aptNum + ", " + addressObj.city + ", " +
      addressObj.state + " " + addressObj.zip + " " + address.country +
      " | Tel: " + addressObj.phone;

    return fullAddress;
  };

  this.processExp = function() {
    $('.exp').each(function(i){
      $(this).text(exp[i].position + ", " + exp[i].company +
      " - " + exp[i].program + " (" + exp[i].startdate + " - " +
      exp[i].enddate + ")");
    });
    //var j;
    $('.expDetails').each(function(i){
      for(var j=0; j<expDetail.length; j++){
        if(expDetail[j].experiencekey === exp[i].key){
          $(this).append('<li>' + expDetail[j].note + '</li>');
        }
      }
    });
  };

  this.processSkills = function() {

    $('.skillDetails').each(function(i){
      $(this).text(skillType[i].category + ":");
    });
    $('.skill').each(function(i){
      for(var j=0; j<skills.length; j++){
        if(skills[j].category === skillType[i].category){
          $(this).append('<li>' + skills[j].subcategory + ": " +
          skills[j].skills + '</li>');
        }
      }
    });
  };

  this.processEdu = function() {
    $('.eduHead').each(function(i){
      $(this).text(edu[i].univName + ", " + edu[i].city + ", " + edu[i].state +
      " ("+edu[i].startyear+ " - " + edu[i].endyear + ")");
    });
    $('.eduDetails').each(function(i){
      $(this).append('<li>' + edu[i].detail + '</li>');
    });
  };

  $(document).ready(function() {
    self.initData();
    $('a').first().attr('href', "mailto:drschloss@gmail.com");
    $('#email').text(email);
    $('#objective').next('p').text(objective);

  });
}

resume();
