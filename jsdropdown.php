<?php
/*
php:
    function dropdown_write_script();
javascript:
    function dropdownButtonFunc(element);
    function dropdownButtonFunction(elementID);
*/

include_once "common.php";

$dropdown_script_written = 0;

function dropdown_write_script() {
  global $dropdown_script_written;
  if ($dropdown_script_written) return;
  ?>
  <style>
    .dropbtn {
        color: black;
        border: none;
        cursor: pointer;
    }

    /* Dropdown button on hover & focus */
    .dropbtn:hover, .dropbtn:focus {
        color: red;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        overflow: visible;;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #f1f1f1}

    .dropdown-content-up {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        bottom: 100%;
        overflow: visible;;
    }

    /* Links inside the dropdown */
    .dropdown-content-up a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content-up a:hover {background-color: #f1f1f1}

    .dropdown-form {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        overflow: visible;;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content-downleft {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        right: 100%;
        overflow: visible;
    }

    /* Links inside the dropdown */
    .dropdown-content-downleft a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content-downleft a:hover {background-color: #f1f1f1}


    /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
    .show {display:block;}
    </style>
    <script>
    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    function dropdownButtonFunc(element) {
        var parentList = [], x = element.parentElement;
        var i, j, k;
        var dropdowns, openDropdown;
        while (x != null) {
            k = 0;
            if (isClassMatched(x, 'dropdown-content')) k = 1;
            if (isClassMatched(x, 'dropdown-content-up')) k = 1;
            if (isClassMatched(x, 'dropdown-content-downleft')) k = 1;
            if (isClassMatched(x, 'dropdown-form')) k = 1;
            if (k == 1) parentList.push(x);
            x = x.parentElement;
        }
        if (element.classList.contains('show')) {
            element.classList.toggle("show");
        }
        else {
            dropdowns = document.getElementsByClassName("dropdown-content");
            for (i = 0; i < dropdowns.length; i++) {
                openDropdown = dropdowns[i];
                for (j = k = 0; j < parentList.length; j++) {
                    if (openDropdown == parentList[j]) {
                        k = 1;
                        break;
                    }
                }
                if (k == 0) if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
            }
            dropdowns = document.getElementsByClassName("dropdown-content-up");
            for (i = 0; i < dropdowns.length; i++) {
                openDropdown = dropdowns[i];
                for (j = k = 0; j < parentList.length; j++) {
                    if (openDropdown == parentList[j]) {
                        k = 1;
                        break;
                    }
                }
                if (k == 0) if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
            }
            dropdowns = document.getElementsByClassName("dropdown-content-downleft");
            for (i = 0; i < dropdowns.length; i++) {
                openDropdown = dropdowns[i];
                for (j = k = 0; j < parentList.length; j++) {
                    if (openDropdown == parentList[j]) {
                        k = 1;
                        break;
                    }
                }
                if (k == 0) if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
            }
            dropdowns = document.getElementsByClassName("dropdown-form");
            for (i = 0; i < dropdowns.length; i++) {
                openDropdown = dropdowns[i];
                for (j = k = 0; j < parentList.length; j++) {
                    if (openDropdown == parentList[j]) {
                        k = 1;
                        break;
                    }
                }
                if (k == 0) if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
            }
            element.classList.toggle("show");
        }
    }

    function dropdownButtonFunction(elementID) {
      var x = document.getElementById(elementID);
      if (x != null) {
          dropdownButtonFunc(x);
      }
      else {
          modal_alert(elementID + " not Found!");
      }
    }

    // Close the dropdown menu if the user clicks outside of it

    function isClassMatched(element, classname) {
        var classes = element.className.split(' ');
        var found = false;
        var i = 0;
        while (i < classes.length && !found) {
            if (classes[i] == classname) found = true;
            else ++i;
        }
        return found;
    }

    // window.onclick = function(event) {
    //     var i, x = event.target, ok = 0;
    //     var dropdowns, openDropdown;
    //     while (x != null) {
    //         if (isClassMatched(x, 'dropbtn')) {
    //             ok = 1;
    //             break;
    //         }
    //         if (isClassMatched(x, 'dropdown-content')) {
    //             ok = 1;
    //             break;
    //         }
    //         if (isClassMatched(x, 'dropdown-content-up')) {
    //             ok = 1;
    //             break;
    //         }
    //         if (isClassMatched(x, 'dropdown-content-downleft')) {
    //             ok = 1;
    //             break;
    //         }
    //         if (isClassMatched(x, 'dropdown-form')) {
    //             ok = 1;
    //             break;
    //         }
    //         if (x.parentElement != null) {
    //             x = x.parentElement;
    //         }
    //         else {
    //             if (x.nodeName.toLowerCase() != "html") ok = 1;
    //             x = null;
    //         }
    //     }
    //     if (ok == 0) {
    //         dropdowns = document.getElementsByClassName("dropdown-content");
    //         for (i = 0; i < dropdowns.length; i++) {
    //             openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
    //         }
    //         dropdowns = document.getElementsByClassName("dropdown-content-up");
    //         for (i = 0; i < dropdowns.length; i++) {
    //             openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
    //         }
    //         dropdowns = document.getElementsByClassName("dropdown-content-downleft");
    //         for (i = 0; i < dropdowns.length; i++) {
    //             openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
    //         }
    //         dropdowns = document.getElementsByClassName("dropdown-form");
    //         for (i = 0; i < dropdowns.length; i++) {
    //             openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
    //         }
    //     }
    // }
    </script>
  <?php
  $dropdown_script_written = 1;
}
 ?>
