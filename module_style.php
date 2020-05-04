<?php
    function write_module_style_script(){
 ?>

<style>

.templateboxitem-select{
    background-color: #bfbfbf;
}

.tlb{
    min-width: 300px;
    min-height: calc(100vh - 195px);
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.56) 5px 5px 10px 0px;
    display:inline-block;
    padding: 5px;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
}

a.tlb-link{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}

.tlb-list{

}

.tbl-item{
    position: relative;
    height: 30px;
    padding-right:60px;
}

.template-text-container>span{
     line-height:30px;
}
.tbl-item-button-container{
    position: absolute;
    right: 0px;
    top: 5px;
    bottom: 5px;
    width: 50px;
}

.tbl-item:not(:hover) .tbl-item-button-container{
    display:none;
}

.tbl-button-container{
    height:30px;
    width:30px;
    position:absolute;
    background-color:red;
    top:10px;
    right:10px;
}

.tbl-item-button-container>.material-icons{
    color:#929292;
    cursor:pointer;
}

.tbl-item-button-container>.material-icons:hover{
    color:black;
}

.template-text-container{
    height: 30px;
    padding-left: 10px;
}
</style>

<?php } ?>
