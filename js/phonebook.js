///////////////
//Andres Iwan//
///////////////


var phonebook = {};
var messageNumber = 1;

(function(phonebook) {

    /*###############################################################
    ########################### MAIN ################################
    ###############################################################*/
    
    addRecord();
    confirm();
    fetch();
    close();

    /*###############################################################
    ######################## FUNCTIONS ##############################
    ###############################################################*/

    function fetch() {
        $("#fetchButton").unbind().bind("click", function(){

            //Record field input
            $recordFieldiv = $("<input>");
            $recordFieldiv.addClass('recordField');
            $recordFieldiv.attr('id', 'recordField');
            $recordFieldiv.attr('placeHolder', 'enter record to match');
            var $messages = $('#messages');
            $messages.append($recordFieldiv);
            $messages.css("display", "none");
            $messages.slideDown(500);

            //Buttons
            $('#fetchButton').addClass('hidden');
            $('#plusButton').addClass('hidden');
            $('#closeButton').removeClass('hidden');
            $('#checkButton').removeClass('hidden');
        });
    }

    // When '+' is pressed, makes the message form, close and check button appear; and hides plus button.
    function addRecord() {

        $("#plusButton").unbind().bind("click", function(){
            //Message
            createMessage();

            //Buttons
            $('#plusButton').addClass('hidden');
            $('#fetchButton').addClass('hidden');
            $('#closeButton').removeClass('hidden');
            $('#checkButton').removeClass('hidden');

            //Remove welcome message
            $('#welcomeMessage').remove();

        });
    }
    phonebook.addRecord = addRecord;

    function confirm () {

        $("#checkButton").unbind().bind("click", function() {

                //Get element above the buttons
                $messages = $('#messages');
                $elementAbove = $('#' + $messages.children()[0].id);

            if ($elementAbove.attr('id') === 'message-container1') {

                //Form
                var $phoneNumber = $('#phoneNumber');
                var $name = $('#name');
                var $lastName = $('#lastName');
                var $address = $('#address');
                var $email = $('#email');
                var $country = $('#country');
                var $city = $('#city');

                //Post record
                $.ajax('user_input', {
                    method: 'POST',
                    data: {
                        phoneNumber: $phoneNumber.val(),
                        date: util.getCurrentDate(),
                        name: $name.val(),
                        lastName: $lastName.val(),
                        address: $address.val(),
                        email: $email.val(),
                        country: $country.val(),
                        city: $city.val()
                    },
                    success: function(){
                        console.log('success');
                    }
                });
                $elementAbove.slideUp(800);
                setTimeout(function(){$elementAbove.remove();},800);

                //Buttons
                $('#checkButton').addClass('hidden');
                $('#closeButton').addClass('hidden');
                $('#plusButton').removeClass('hidden');
                $('#fetchButton').removeClass('hidden');

            }
            else if ($elementAbove.attr('id') === 'recordField') {
                //Post record field to look for
                $.ajax('user_input', {
                    method: 'POST',
                    data: {
                        recordToMatch: $elementAbove.val()
                    },
                    dataType: "json",
                    success: function (response) {
                        //Hide element above
                        $elementAbove = $('#' + $messages.children()[0].id).remove();
                        if (response !== 'No records found') {
                            response.forEach(function(matchedRecord){
                                //Create a list to show matchedRecord
                                $elementAbove = $('<ul></ul>');
                                $elementAbove.attr('id', 'shownRecord');
                                $elementAbove.css('list-style-type', 'none');
                                $elementAbove.css('padding', '0px 0px 10px 0px');
                                $elementAbove.css('border-bottom', '2px solid grey');
                                $.each(matchedRecord, function (key) {
                                    $elementAbove.append("<li>" + key + ': ' + matchedRecord[key] + "</li>");
                                });
                                $messages.append($elementAbove);
                            })

                        }else {
                           //Create a list to show record
                            $elementAbove = $('<div></div>', {text: response});
                            $elementAbove.attr('id', 'shownRecord');
                            $messages.append($elementAbove);
                        }
                        //Buttons
                        $('#closeButton').addClass('hidden');
                    }
                });
            }else if (($elementAbove.attr('id') === 'shownRecord')){
                $.each($messages.children(), (function(record){
                    $elementAbove = $('#' + $messages.children()[0].id);
                    $elementAbove.remove();
                }));

                //Buttons
                $('#checkButton').addClass('hidden');
                $('#plusButton').removeClass('hidden');
                $('#fetchButton').removeClass('hidden');
            }
        });
    }
    phonebook.confirm = confirm;

    function close () {
        $("#closeButton").unbind().bind("click", function(){

            //Get element above the buttons
            $messages = $('#messages');
            $elementAbove = $('#'+$messages.children()[0].id);
            $elementAbove.slideUp(800);
            setTimeout(function(){$elementAbove.remove();},800);

            //Buttons
            $('#plusButton').removeClass('hidden');
            $('#fetchButton').removeClass('hidden');
            $('#closeButton').addClass('hidden');
            $('#checkButton').addClass('hidden');
        });
    }
    phonebook.closeMessage = close;

    function createForm (id) {
        $form = $("<form></form>");
        $($form).attr("class", "message-container");
        $($form).attr("action", "");
        $($form).attr('id', id);
        return ($form);
    }
    phonebook.createForm = createForm;

    function createFieldset () {
        $fieldset= $("<fieldset></fieldset>");
        $($fieldset).addClass('onHold');
        return ($fieldset);
    }
    phonebook.createFieldset= createFieldset;

    function createLegend () {
        $legend = $("<legend></legend>");
        $($legend).attr("class", "date");
        $($legend).text(util.getCurrentDate());
        return ($legend);
    }
    phonebook.createLegend = createLegend;

    function createMessage () {
        phoneNumber = '<input type="text" name="phoneNumber" placeholder="Phone number" id="phoneNumber" class="field field-margin1" /><br>';
        name = '<input name="name" placeholder="Name" id="name" class="field field-margin1" /><br>';
        lastName = '<input  type="text" name="lastName" placeholder="Last name" id="lastName" class="field field-margin1" /> <br>';
        address = '<input type="text" name="address" placeholder="Address" id="address" class="field field-margin1" /><br>';
        email = '<input name="email" placeholder="Email" id="email" class="field field-margin1" /><br>';
        country = '<input  type="text" name="country" placeholder="Country" id="country" class="field field-margin1" /> <br>';
        city = '<input  type="text" name="city" placeholder="City" id="city" class="field field-margin1" /> <br>';

        var $legend = createLegend();
        var $fieldset = createFieldset();
        $($fieldset).append($legend);
        $($fieldset).append(phoneNumber, name, lastName, address, email, country, city);

        var $newMessage= createForm('message-container' +messageNumber);
        $($newMessage).append($fieldset);


        var $messages = $("#messages");
        $($messages).attr("id", "messages");
        $($messages).append($newMessage);
        $($newMessage).css("display", "none");
        $($newMessage).slideDown(1500);
        $('html,body').animate({
            scrollTop: $messages.offset().top
        }, 2500, 'swing');

    }
    phonebook.createMessage = createMessage;

    //True = empty
    //False = with text
    function checkEmptyField (field) {
        var $field = $('#' +field);
        return ($.trim($field.val()) === '');
    }

}(phonebook));

