<?php
include_once "prefix.php";
include_once "common.php";
include_once "connection.php";
include_once "jsdropdown.php";
include_once "jsmodal.php";
include_once "jsform.php";

$tablename = $prefix."uitext";
?>
<!DOCTYPE html>
<html lang="en-US">

<head>
    <title>Language Control Panel</title>
    <meta charset="utf-8">
    <?php
        write_common_script();
        write_form_script();
        write_modal_style();
        dropdown_write_script();
        ?>
    <script type="text/javascript">
    "use strict";
    var codelist = [];
    var mdata = [];
    var tdata = [];
    <?php
                $st = "SELECT `id`, `key`, `code`, `value` FROM ".$tablename;
                $result = mysql_query($st);
                while ($row = mysql_fetch_row($result)) {
                    echo "mdata.push({id: ".$row[0].", key: Base64.decode('".base64_encode($row[1])."'), code: Base64.decode('".base64_encode($row[2])."'), value: Base64.decode('".base64_encode($row[3])."')});\r\n";
                }
            ?>

    function makecodelist() {
        var i, k;
        sort(mdata, function(a, b) {
            return stricmp(a.code, b.code);
        });
        k = -1;
        for (i = 0; i < mdata.length; i++) {
            if (k == -1) {
                codelist.push(mdata[i].code);
                k = 0;
            } else if (mdata[i].code != codelist[k]) {
                codelist.push(mdata[i].code);
                k++;
            }
        }
    }

    function getCodeIndex(codename) {
        var l, r, m, k;
        l = 0;
        r = codelist.length - 1;
        while (l <= r) {
            m = (l + r) >> 1;
            k = stricmp(codename, codelist[m]);
            if (k == 0) return m;
            if (k < 0) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return -1;
    }

    function maketdata() {
        var i, j, t;
        sort(mdata, function(a, b) {
            var k;
            k = stricmp(a.key, b.key);
            if (k != 0) return k;
            k = stricmp(a.code, b.code);
            if (k != 0) return k;
            k = stricmp(a.value, b.value);
            if (k != 0) return k;
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });
        t = [];
        for (i = 0; i < mdata.length; i++) {
            if (t.length == 0) {
                t.push(mdata[i].key);
                for (j = 0; j < codelist.length; j++) t.push(null);
            } else if (stricmp(t[0], mdata[i].key) != 0) {
                tdata.push(t);
                t = [mdata[i].key];
                for (j = 0; j < codelist.length; j++) t.push(null);
            }
            j = getCodeIndex(mdata[i].code);
            if (j != -1) {
                t[j + 1] = {
                    id: mdata[i].id,
                    value: mdata[i].value
                };
            }
        }
        if (t.length > 0) tdata.push(t);
        mdata = [];
    }

    function generateTable() {
        var div = document.getElementById("tablediv");
        var st, i, j;
        if (div == null) {
            setTimeout("generateTable();", 10);
            return;
        }
        st = "<table>";
        st += "<tr>";
        st += "<th rowspan=\"2\" align=\"center\" valign=\"top\">Key</th>";
        st += "<th align=\"center\"";
        if (codelist.length > 1) st += "colspan=\"" + codelist.length + "\"";
        st += ">Value</th>";
        st += "</tr>";
        st += "<tr>";
        if (codelist.length > 0) {
            for (i = 0; i < codelist.length; i++) st += "<th align=\"center\">" + inputvalue(codelist[i]) + "</th>";
        } else {
            st += "<th>null</th>";
        }
        st += "</tr>";
        for (i = 0; i < tdata.length; i++) {
            st += "<tr>";
            st += "<td>" + inputvalue(tdata[i][0]) + "</td>";
            for (j = 1; j < codelist.length + 1; j++) {
                if (tdata[i][j] != null) {
                    st += "<td><input type=\"text\" style=\"width: 150px;\" id=\"it_" + i + "_" + j + "\" value=\"" +
                        inputvalue(tdata[i][j].value) + "\"/></td>";
                } else {
                    st += "<td><input type=\"text\" style=\"width: 150px;\" id=\"it_" + i + "_" + j +
                        "\" value=\"null\"/></td>";
                }
            }
            st += "</tr>";
        }
        st += "</table>";
        div.innerHTML = st;
    }

    function backupChanges() {
        var i, j, v, t;
        mdata = [];
        for (i = 0; i < tdata.length; i++) {
            t = [tdata[i][0]];
            for (j = 1; j < codelist.length + 1; j++) {
                v = document.getElementById("it_" + i + "_" + j).value;
                if ((v == "null") && (tdata[i][j] == null)) {
                    t.push(null);
                } else {
                    t.push(v);
                }
            }
            mdata.push(t);
        }
    }

    function restoreChanges() {
        var i, j;
        for (i = 0; i < mdata.length; i++) {
            for (j = 1; j < mdata[i].length; j++) {
                if (mdata[i][j] != null) document.getElementById("it_" + i + "_" + j).value = mdata[i][j];
            }
        }
    }

    function addNewKey() {
        var st;
        st = "<table border=\"0\">";
        st += "<tr><td align=\"center\"><h3>Add new key</h2></td></tr>";
        st += "<tr><td>";
        st += "<table border=\"0\"><tr>";
        st += "<td nowrap> Key name</td>";
        st += "<td nowrap> <input type=\"text\" id=\"keynameinput\" style=\"width: 150px;\"/></td>";
        st += "</tr></table>";
        st += "</td></tr>";
        st += "<tr><td align=\"center\"><br>";
        st += "<table border=\"0\"><tr>";
        st +=
            "<td><a href=\"#\" onclick=\"submitNewKey(); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;\">";
        st += "<img src=\"./images/button_save.png\" width=\"16\" height=\"16\"/>";
        st += "</a></td>";
        st += "<td width=\"30\">&nbsp;</td>";
        st +=
            "<td><a href=\"#\" onclick=\"closeModal(1); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;\">";
        st += "<img src=\"./images/button_delete.png\" width=\"16\" height=\"16\"/>";
        st += "</a></td>";
        st += "</tr></table>";
        st += "</td></tr>";

        st += "</table>";
        showModal(1, st);
    }

    function addNewCode() {
        var st;
        st = "<table border=\"0\">";
        st += "<tr><td align=\"center\"><h3>Add new code</h2></td></tr>";
        st += "<tr><td>";
        st += "<table border=\"0\"><tr>";
        st += "<td nowrap> Code name</td>";
        st += "<td nowrap> <input type=\"text\" id=\"codenameinput\" style=\"width: 150px;\"/></td>";
        st += "</tr></table>";
        st += "</td></tr>";
        st += "<tr><td align=\"center\"><br>";
        st += "<table border=\"0\"><tr>";
        st +=
            "<td><a href=\"#\" onclick=\"submitNewCode(); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;\">";
        st += "<img src=\"./images/button_save.png\" width=\"16\" height=\"16\"/>";
        st += "</a></td>";
        st += "<td width=\"30\">&nbsp;</td>";
        st +=
            "<td><a href=\"#\" onclick=\"closeModal(1); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;\">";
        st += "<img src=\"./images/button_delete.png\" width=\"16\" height=\"16\"/>";
        st += "</a></td>";
        st += "</tr></table>";
        st += "</td></tr>";

        st += "</table>";
        showModal(1, st);
    }

    function submitNewKey() {
        var i, t, v;
        v = document.getElementById("keynameinput").value.trim().toLowerCase();
        for (i = 0; i < tdata.length; i++) {
            if (tdata[i][0] == v) {
                modal_alert("Key name is existed!");
                return;
            }
        }
        t = [v];
        for (i = 0; i < codelist.length; i++) t.push(null);
        backupChanges();
        tdata.push(t);
        generateTable();
        restoreChanges();
        closeModal(1);
    }

    function submitNewCode() {
        var i, t, v;
        v = document.getElementById("codenameinput").value.trim();
        for (i = 0; i < codelist.length; i++) {
            if (stricmp(codelist[i], v) == 0) {
                modal_alert("Code name is existed!");
                return;
            }
        }
        backupChanges();
        for (i = 0; i < tdata.length; i++) tdata[i].push(null);
        codelist.push(v);
        generateTable();
        restoreChanges();
        closeModal(1);
    }

    var saveList = null;
    var errList;

    function saveProcess(index) {
        var i, st, params;
        if (saveList.length >= 18) i = 600;
        else i = saveList.length * 30 + 40;
        st = "<table border=\"0\"><tr><td><div class=\"simpletableclass\" style=\"overflow: auto; height: " + i +
            "px;\">";
        st += "<table border=\"0\">";
        st += "<tr>";
        st += "<th>Key</th>";
        st += "<th>Code</th>";
        st += "<th>Value</th>";
        st += "<th>Status</th>";
        st += "</tr>";
        for (i = 0; i < saveList.length; i++) {
            st += "<tr>";
            st += "<td nowrap>" + inputvalue(tdata[saveList[i].r][0]) + "</td>";
            st += "<td nowrap>" + inputvalue(codelist[saveList[i].c - 1]) + "</td>";
            st += "<td nowrap>" + inputvalue(saveList[i].value) + "</td>";
            if (i >= errList.length) {
                st += "<td nowrap>...</td>";
            } else {
                st += "<td nowrap>" + errList[i] + "</td>";
            }
            st += "</tr>";
        }
        st += "</table></div></td></tr>";
        if (index == saveList.length) {
            st +=
                "<tr><td align=\"center\"><a href=\"#\" onclick=\"closeModal(1); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;\" style=\"text-decoration: none; color: blue;\">Ok</a></td></tr>";
            saveList = null;
        }
        st += "</table>";
        showModal(1, st);
        if (saveList != null) {
            params = [
                ["id", saveList[index].id],
                ["value", saveList[index].value],
                ["tablename", "<?php echo $tablename; ?>"]
            ];
            if (saveList[index].id == 0) {
                params.push(["key", tdata[saveList[index].r][0]]);
                params.push(["code", codelist[saveList[index].c - 1]]);
            }
            api_call(<?php api_getIndex(1); ?>, "language_update.php", params, function(success, message) {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        if (saveList[index].id == 0) {
                            tdata[saveList[index].r][saveList[index].c] = {
                                id: parseInt(message.substr(2), 10),
                                value: saveList[index].value
                            };
                        } else {
                            tdata[saveList[index].r][saveList[index].c].value = saveList[index].value;
                        }
                        errList.push("<text style=\"color: green;\">OK</text>");
                    } else {
                        errList.push("<text style=\"color: red;\">" + inputvalue(message) + "</text>");
                    }
                } else {
                    errList.push("<text style=\"color: red;\">" + inputvalue(message) + "</text>");
                }
                setTimeout("saveProcess(" + (index + 1) + ");", 10);
            });
        }
    }

    function save() {
        var i, j, v;
        if (saveList != null) return;
        saveList = [];
        for (i = 0; i < tdata.length; i++) {
            for (j = 1; j < codelist.length + 1; j++) {
                v = document.getElementById("it_" + i + "_" + j).value;
                if (tdata[i][j] == null) {
                    if (v != "null") {
                        saveList.push({
                            id: 0,
                            value: v,
                            r: i,
                            c: j
                        });
                    }
                } else if (tdata[i][j].value != v) {
                    saveList.push({
                        id: tdata[i][j].id,
                        value: v,
                        r: i,
                        c: j
                    });
                }
            }
        }
        errList = [];
        if (saveList.length > 0) {
            saveProcess(0);
        } else
            saveList = null;
    }

    makecodelist();
    maketdata();
    generateTable();
    </script>
</head>

<body>
    <?php
            write_modal_body();
        ?>
    <div style="position: fixed;">
        <table border="0">
            <tr>
                <td valign="center"><a href="#"
                        onclick="addNewKey(); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;"
                        style="text-decoration: none; color: blue;"><img src="./images/button_add.png" width="16"
                            height="16" /> Add new key</a></td>
                <td width="30">&nbsp;</td>
                <td valign="center"><a href="#"
                        onclick="addNewCode(); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;"
                        style="text-decoration: none; color: blue;"><img src="./images/button_add.png" width="16"
                            height="16" /> Add new code</a></td>
                <td width="30">&nbsp;</td>
                <td valign="center"><a href="#"
                        onclick="save(); event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;"
                        style="text-decoration: none; color: blue;"><img src="./images/button_save.png" width="16"
                            height="16" /> Save</a></td>
            </tr>
        </table>
    </div>
    <br><br><br>
    <div class="simpletableclass" id="tablediv"></div>
</body>

</html>