<?php
$kpi_script_written = 0;

function write_kpi_script() {
    global $kpi_script_written, $thememode;
    if ($kpi_script_written != 0) return 0;
    $kpi_script_written = 1;
    ?>
    <style>
        .shadow-box{
            box-shadow: 5px 5px 10px #888888;
        }
        .KPItableclass {
        }

        .KPItableclass	table {
            <?php switch ($thememode) {
                case 0:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    break;
            }
            ?>
                border-spacing: 0;
                border-collapse: collapse;
            }

        .KPItableclass td {
                border-right: 1px solid #ddd;
                <?php switch ($thememode) {
                    case 0:
                        echo "border-bottom: 1px solid #ddd;\r\n";
                        break;
                    case 1:
                        break;
                }
                ?>
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
            }

        .KPItableclass th {
                border-right: 1px solid #ddd;
                <?php switch ($thememode) {
                    case 0:
                        echo "border-bottom: 1px solid #ddd;\r\n";
                        echo "color: white;\r\n";
                        echo "background-color: #61BC45;\r\n";
                        break;
                    case 1:
                        echo "color: #393E41;\r\n";
                        echo "background-color: white;\r\n";
                        break;
                }?>
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
            }

        .KPItableclass	tr:hover {
            background-color: #BFBFBF;
        }

        .KPIsimpletableclass {
        }

        .row2colors tr:nth-child(odd) {
            background: white
        }

        .row2colors tr:nth-child(even) {
            background: #f7f6f6
        }

        .KPIsimpletableclass table {
            <?php switch ($thememode) {
                case 0:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    break;
            }
            ?>
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
        }

        .KPIsimpletableclass th {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    echo "color: white;\r\n";
                    echo "background-color: #61BC45;\r\n";
                    break;
                case 1:
                    echo "color: #393E41;\r\n";
                    echo "background-color: #ebebeb;\r\n";
                    break;
            }?>
            border-right: 1px solid #ddd;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
            height: 40px;
            text-align: center;
            }

        .KPIsimpletableclass td {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
            }
            ?>
            border-right: 1px solid #ddd;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
            height: 40px;
        }

        .formulaTableFormat {
        }

        /*.formulaTableFormat tr:nth-child(odd) {*/
        /*    background: white*/
        /*}*/

        /*.formulaTableFormat tr:nth-child(even) {*/
        /*    background: #f7f6f6*/
        /*}   */

        .formulaTableFormat table {
            <?php switch ($thememode) {
                case 0:
                    echo "border-top: 1px solid #bbb;\r\n";
                    echo "border-left: 1px solid #bbb;\r\n";
                    break;
                case 1:
                    echo "border-top: 1px solid #c0c0c0;\r\n";
                    echo "border-left: 1px solid #c0c0c0;\r\n";
                    //echo "border-bottom: 1px solid #c0c0c0;\r\n";
                    break;
            }
            ?>
            border-spacing: 0;
            border-collapse: collapse;
        }

        .formulaTableFormat th {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    echo "color: white;\r\n";
                    echo "background-color: #61BC45;\r\n";
                    break;
                case 1:
                    echo "color: #393E41;\r\n";
                    echo "background-color: #ebebeb;\r\n";
                    break;
            }?>
            border-right: 1px solid #c0c0c0;
            border-bottom: 1px solid #c0c0c0;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
            height: 40px;
            }

        .formulaTableFormat td {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    break;
            }
            ?>
            border-right: 1px solid #c0c0c0;
            border-bottom: 1px solid #c0c0c0;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
            height: 40px;
        }

        .KPIsimpletableclass-nopadding {

        }

        .KPIsimpletableclass-nopadding	table {
            <?php switch ($thememode) {
                case 0:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    break;
            }
            ?>
            border-spacing: 0;
            border-collapse: collapse;
        }

        .KPIsimpletableclass-nopadding th {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    echo "color: white;\r\n";
                    echo "background-color: #61BC45;\r\n";
                    break;
                case 1:
                    echo "color: #393E41;\r\n";
                    echo "background-color: white;\r\n";
                    break;
            }?>
            border-right: 1px solid #ddd;
        }

        .KPIsimpletableclass-nopadding td {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    break;
            }
            ?>
            border-right: 1px solid #ddd;
        }

        .KPIsimpletableclassE {

        }

        .KPIsimpletableclassE table {
            <?php switch ($thememode) {
                case 0:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    echo "border-top: 1px solid #ddd;\r\n";
                    echo "border-left: 1px solid #ddd;\r\n";
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
            }
            ?>
            border-spacing: 0;
            border-collapse: collapse;
        }

        .KPIsimpletableclassE th {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    echo "color: white;\r\n";
                    echo "background-color: #61BC45;\r\n";
                    break;
                case 1:
                    echo "color: #393E41;\r\n";
                    echo "background-color: #dfedd6;\r\n";
                    break;
            }?>
            border-right: 1px solid #ddd;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
            }

        .KPIsimpletableclassE tr:nth-child(even) {
            background-color: #ffffff;
        }

        .KPIsimpletableclassE tr:nth-child(odd) {
            background-color: #efefef;
        }

        .KPIsimpletableclassE td {
            <?php switch ($thememode) {
                case 0:
                    echo "border-bottom: 1px solid #ddd;\r\n";
                    break;
                case 1:
                    break;
            }
            ?>
            border-right: 1px solid #ddd;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
        }
        .KPIsimpleInput {
            padding-left: 5px;
            padding-right: 5px;
            height: 30px;
        }
        .all-build{
            width: 100%;
            background: white;
        }
        .space{
            display:table-row;
            height:10px;
        }
    </style>
    <?php
}
?>
