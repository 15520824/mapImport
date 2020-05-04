<?php

function write_bsc2kpi1112_script() {
    ?>
    <style>



    .bsc2kpi-checkbox {
        display: inline-block;
    /* white-space: nowrap */
    }

    .bsc2kpi-checkbox label {
        text-decoration: none;
        font-weight: normal;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .bsc2kpi-checkbox input[type="checkbox"]:not(:checked),
    .bsc2kpi-checkbox input[type="checkbox"]:checked {
        position: absolute;
        left: -9999px;
    }

    .bsc2kpi-checkbox input[type="checkbox"]:not(:checked)+label,
    .bsc2kpi-checkbox input[type="checkbox"]:checked+label {
        position: relative;
        cursor: pointer;
    }

    .bsc2kpi-checkbox.left input[type="checkbox"]:not(:checked)+label,
    .bsc2kpi-checkbox.left input[type="checkbox"]:checked+label {
        padding-left: 22.5px;
    }

    .bsc2kpi-checkbox.right input[type="checkbox"]:not(:checked)+label,
    .bsc2kpi-checkbox.right input[type="checkbox"]:checked+label {
        padding-right: 22.5px;
    }


    /* checkbox aspect */

    .bsc2kpi-checkbox input[type="checkbox"]:not(:checked)+label:before,
    .bsc2kpi-checkbox input[type="checkbox"]:checked+label:before {
        content: '';
        position: absolute;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid black;
        margin-top:-2.5px;
        margin-bottom:-2.5px;
        /*background: #fff;*/
        border-radius: 3px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1);
    }


    .bsc2kpi-checkbox.right input[type="checkbox"]:not(:checked)+label:before,
    .bsc2kpi-checkbox.right input[type="checkbox"]:checked+label:before {
        right: 0;
    }

    .bsc2kpi-checkbox.left input[type="checkbox"]:not(:checked)+label:before,
    .bsc2kpi-checkbox.left input[type="checkbox"]:checked+label:before {
        left: 0;
    }

    /* checked mark aspect */

    .bsc2kpi-checkbox input[type="checkbox"]:not(:checked)+label:after,
    .bsc2kpi-checkbox input[type="checkbox"]:checked+label:after {
        content: '✔';
        position: absolute;
        top: 1.4px;

        /*font-size: 14px;*/
        line-height: 0.8;
        color: black;
        transition: all .2s;
    }


    .bsc2kpi-checkbox.left input[type="checkbox"]:not(:checked)+label:after,
    .bsc2kpi-checkbox.left input[type="checkbox"]:checked+label:after {
        left: 3.8px;
    }


    .bsc2kpi-checkbox.right input[type="checkbox"]:not(:checked)+label:after,
    .bsc2kpi-checkbox.right input[type="checkbox"]:checked+label:after {
        right: 3.8px;
    }


    /* checked mark aspect changes */

    .bsc2kpi-checkbox input[type="checkbox"]:not(:checked)+label:after {
        opacity: 0;
        transform: scale(0);
    }

    .bsc2kpi-checkbox input[type="checkbox"]:checked+label:after {
        opacity: 1;
        transform: scale(1);
    }


    /* disabled checkbox */

    .bsc2kpi-checkbox input[type="checkbox"]:disabled:not(:checked)+label:before,
    .bsc2kpi-checkbox input[type="checkbox"]:disabled:checked+label:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
    }

    .bsc2kpi-checkbox input[type="checkbox"]:disabled:checked+label:after {
        color: #999;
    }

    .bsc2kpi-checkbox input[type="checkbox"]:disabled+label {
        color: #aaa;
    }


    /* accessibility */

    /*.bsc2kpi-checkbox input[type="checkbox"]:checked:focus + label:before,*/

    /*.bsc2kpi-checkbox input[type="checkbox"]:not(:checked):focus + label:before {*/

    /*  border: 2px dotted blue;*/

    /*}*/

    /* hover style just for information */

    .bsc2kpi-checkbox label:hover:before {
        background: #cccccc;
    }

    .bsc2kpi-radio,
    .bsc2kpi-radio *{
        box-sizing: border-box;
        font: 14px "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-size: 14px;
    }



    .bsc2kpi-radio {
        display: inline-block;
    /* white-space: nowrap */
    }

    .bsc2kpi-radio label {
        text-decoration: none;
        font-weight: normal;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .bsc2kpi-radio input[type="radio"]:not(:checked),
    .bsc2kpi-radio input[type="radio"]:checked {
        position: absolute;
        left: -9999px;
    }

    .bsc2kpi-radio input[type="radio"]:not(:checked)+label,
    .bsc2kpi-radio input[type="radio"]:checked+label {
        position: relative;
        cursor: pointer;
    }

    .bsc2kpi-radio.left input[type="radio"]:not(:checked)+label,
    .bsc2kpi-radio.left input[type="radio"]:checked+label {
        padding-left: 22.5px;
    }

    .bsc2kpi-radio.right input[type="radio"]:not(:checked)+label,
    .bsc2kpi-radio.right input[type="radio"]:checked+label {
        padding-right: 22.5px;
    }


    /* radio aspect */

    .bsc2kpi-radio input[type="radio"]:not(:checked)+label:before,
    .bsc2kpi-radio input[type="radio"]:checked+label:before {
        content: '';
        position: absolute;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid black;
        margin-top:-2.5px;
        margin-bottom:-2.5px;
        /*background: #fff;*/
        border-radius: 9px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1);
    }


    .bsc2kpi-radio.right input[type="radio"]:not(:checked)+label:before,
    .bsc2kpi-radio.right input[type="radio"]:checked+label:before {
        right: 0;
    }

    .bsc2kpi-radio.left input[type="radio"]:not(:checked)+label:before,
    .bsc2kpi-radio.left input[type="radio"]:checked+label:before {
        left: 0;
    }

    /* checked mark aspect */

    .bsc2kpi-radio input[type="radio"]:not(:checked)+label:after,
    .bsc2kpi-radio input[type="radio"]:checked+label:after {
        content: '●';
        position: absolute;
        bottom: 4.2px;


        /*font-size: 14px;*/
        line-height: 0.8;
        color: black;
        transition: all .2s;
    }


    .bsc2kpi-radio.left input[type="radio"]:not(:checked)+label:after,
    .bsc2kpi-radio.left input[type="radio"]:checked+label:after {
        left: 4.6px;
    }

    /* .bsc2kpi-radio.firefox {} */
    /* fix firefox bug*/
    .bsc2kpi-radio.firefox  input[type="radio"]:not(:checked)+label:after,
    .bsc2kpi-radio.firefox  input[type="radio"]:checked+label:after {
        bottom: 5.9px;
    }

    .bsc2kpi-radio.firefox.left input[type="radio"]:not(:checked)+label:after,
    .bsc2kpi-radio.firefox.left input[type="radio"]:checked+label:after {
        left: 5.2px;
    }



    .bsc2kpi-radio.right input[type="radio"]:not(:checked)+label:after,
    .bsc2kpi-radio.right input[type="radio"]:checked+label:after {
        right: 3.8px;
    }


    /* checked mark aspect changes */

    .bsc2kpi-radio input[type="radio"]:not(:checked)+label:after {
        opacity: 0;
        transform: scale(0);
    }

    .bsc2kpi-radio input[type="radio"]:checked+label:after {
        opacity: 1;
        transform: scale(1);
    }


    /* disabled checkbox */

    .bsc2kpi-radio input[type="radio"]:disabled:not(:checked)+label:before,
    .bsc2kpi-radio input[type="radio"]:disabled:checked+label:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
    }

    .bsc2kpi-radio input[type="radio"]:disabled:checked+label:after {
        color: #999;
    }

    .bsc2kpi-radio input[type="radio"]:disabled+label {
        color: #aaa;
    }


    /* accessibility */

    /*.bsc2kpi-radio input[type="radio"]:checked:focus + label:before,*/

    /*.bsc2kpi-radio input[type="radio"]:not(:checked):focus + label:before {*/

    /*  border: 2px dotted blue;*/

    /*}*/

    /* hover style just for information */

    .bsc2kpi-radio label:hover:before {
        background: #cccccc;
    }

    /*  scroll view */
    .bsc-theme .absol-scroll-button{
      background-color:rgba(30, 30, 30, 0.3);
      border-radius:3px;
    }

    .bsc-theme.absol-scroller{
      box-shadow: rgb(0, 2, 80) 0px 6px 12px;
    }
    .bsc-theme .absol-scroll-bar{
    background-color: rgba(30, 30,30, 0.1);
    }

    .bsc-theme .absol-scroll-bar-v-container{

      opacity:0;
      width:7px;
    }


    .bsc-theme .absol-scroll-button:hover{
        background-color:rgba(30, 30, 30, 0.3);
    }

    .bsc-theme:hover .absol-scroll-bar-v-container{
      opacity:1;
    }

    td>textarea,
    td>.absol-selectmenu{
        vertical-align: middle;
    }

    </style>
    <?php
}
?>
