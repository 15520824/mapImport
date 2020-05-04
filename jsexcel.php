<?php
    include_once "jsencoding.php";
    include_once "jsform_new.php";

    $excel_script_written = 0;
    class ExcelClass {
        public static function write_script() {
            global $excel_script_written;
            EncodingClass::write_script();
            FormClass::write_script();
            if ($excel_script_written == 1) return 0;
            $excel_script_written = 1;
            ?>
            <script type="text/javascript">

                'use strict'

                var ExcelClass = {};
                ExcelClass.pivotTable = function (params) {
                    var i, j, k, m, n, x, y, z, v, c, sc, xdata = [], tdata = [], rows, cols, values, extras, headers = [], theaders;
                    var indexlist = [], mixedcols = [];
                    if (params.rows !== undefined) {
                        rows = params.rows;
                    }
                    else {
                        rows = [];
                    }
                    if (params.cols !== undefined) {
                        cols = params.cols;
                    }
                    else {
                        cols = [];
                    }
                    if (params.values !== undefined) {
                        values = params.values;
                    }
                    else {
                        values = [];
                    }
                    if (params.extras !== undefined) {
                        extras = params.extras;
                    }
                    else {
                        extras = [];
                    }
                    for (i = 0; i < cols.length; i++) {
                        if (EncodingClass.type.isNumber(cols[i])) {
                            cols[i] = {
                                index: cols[i],
                                type: "sum"
                            }
                        }
                    }
                    for (i = 0; i < values.length; i++) {
                        if (EncodingClass.type.isNumber(values[i])) {
                            values[i] = {
                                index: values[i],
                                type: "sum"
                            }
                        }
                    }
                    for (i = 0; i < extras.length; i++) {
                        if (EncodingClass.type.isNumber(extras[i])) {
                            extras[i] = {
                                index: extras[i],
                                type: "sum"
                            }
                        }
                    }
                    for (i = 0; i < params.data.length; i++) indexlist.push(i);
                    if (indexlist.length == 0) return {
                        mixedcols: [],
                        data: []
                    }
                    indexlist.sort(function (a, b) {
                        var i;
                        for (i = 0; i < rows.length; i++) {
                            if (params.data[a][rows[i]] < params.data[b][rows[i]]) return -1;
                            if (params.data[a][rows[i]] > params.data[b][rows[i]]) return 1;
                        }
                        for (i = 0; i < cols.length; i++) {
                            if (params.data[a][cols[i].index] < params.data[b][cols[i].index]) return -1;
                            if (params.data[a][cols[i].index] > params.data[b][cols[i].index]) return 1;
                        }
                        for (i = 0; i < values.length; i++) {
                            if (params.data[a][values[i].index] < params.data[b][values[i].index]) return -1;
                            if (params.data[a][values[i].index] > params.data[b][values[i].index]) return 1;
                        }
                        for (i = 0; i < extras.length; i++) {
                            if (params.data[a][extras[i].index] < params.data[b][extras[i].index]) return -1;
                            if (params.data[a][extras[i].index] > params.data[b][extras[i].index]) return 1;
                        }
                        return 0;
                    });
                    if (cols.length > 0) {
                        for (i = 0; i < params.data.length; i++) {
                            x = [];
                            for (j = 0; j < cols.length; j++) {
                                x.push(params.data[i][cols[j].index]);
                            }
                            mixedcols.push(x);
                        }
                        mixedcols.sort(function (a, b) {
                            var i;
                            for (i = 0; i < cols.length; i++) {
                                if (a[i] < b[i]) return -1;
                                if (a[i] > b[i]) return 1;
                            }
                            return 0;
                        });
                        x = [mixedcols[c = 0]];
                        for (j = 1; j < mixedcols.length; j++) {
                            v = 0;
                            for (k = 0; k < cols.length; k++) {
                                if (EncodingClass.string.compare(mixedcols[j][k], x[c][k]) != 0) {
                                    v = 1;
                                    break;
                                }
                            }
                            if (v == 1) {
                                x.push(mixedcols[j]);
                                c++;
                            }
                        }
                        mixedcols = x;
                    }
                    k = -1;
                    xdata = [];
                    for (i = 0; i < indexlist.length; i++) {
                        if (k >= 0) {
                            c = 0;
                            for (j = 0; j < rows.length; j++) {
                                if (params.data[indexlist[i]][rows[j]] != xdata[k].row[j]) {
                                    c = 1;
                                    break;
                                }
                            }
                        }
                        else {
                            c = 1;
                        }
                        if (c == 1) {
                            x = [];
                            for (j = 0; j < rows.length; j++) {
                                x.push(params.data[indexlist[i]][rows[j]]);
                            }
                            xdata.push({
                                row: x,
                                coldata: []
                            });
                            k++;
                        }
                        x = [];
                        for (j = 0; j < cols.length; j++) {
                            x.push(params.data[indexlist[i]][cols[j].index]);
                        }
                        y = [];
                        for (j = 0; j < values.length; j++) {
                            y.push(params.data[indexlist[i]][values[j].index]);
                        }
                        z = [];
                        for (j = 0; j < extras.length; j++) {
                            z.push(params.data[indexlist[i]][extras[j].index]);
                        }
                        xdata[k].coldata.push({
                            index: [indexlist[i]],
                            col: x,
                            values: [y],
                            extras: [z]
                        });
                    }
                    for (i = 0; i < xdata.length; i++) {
                        if (xdata[i].coldata.length > 0) {
                            x = [xdata[i].coldata[0]];
                            k = 0;
                            for (j = 1; j < xdata[i].coldata.length; j++) {
                                v = 0;
                                for (c = 0; c < cols.length; c++) {
                                    if (xdata[i].coldata[j].col[c] != x[k].col[c]) {
                                        v = 1;
                                        break;
                                    }
                                }
                                if (v == 1) {
                                    x.push(xdata[i].coldata[j]);
                                    k++;
                                }
                                else {
                                    x[k].index.push(xdata[i].coldata[j].index[0]);
                                    x[k].values.push(xdata[i].coldata[j].values[0]);
                                    x[k].extras.push(xdata[i].coldata[j].extras[0]);
                                }
                            }
                            xdata[i].coldata = x;
                        }
                    }
                    for (i = 0; i < xdata.length; i++) {
                        x = [];
                        for (j = 0; j < rows.length; j++) x.push(xdata[i].row[j]);
                        c = 0;
                        for (k = 0; k < mixedcols.length; k++) {
                            if (c >= xdata[i].coldata.length) {
                                v = -1;
                            }
                            else {
                                v = 0;
                                for (m = 0; m < cols.length; m++) {
                                    if (xdata[i].coldata[c].col[m] != mixedcols[k][m]) {
                                        v = -1;
                                        break;
                                    }
                                }
                            }
                            if (v == 0) {
                                for (sc = 0; sc < values.length; sc++) {
                                    switch (values[sc].type) {
                                        case "sum":
                                            v = 0;
                                            for (m = 0; m < xdata[i].coldata[c].values.length; m++) {
                                                v += xdata[i].coldata[c].values[m][sc];
                                            }
                                            x.push(v);
                                            break;
                                        case "average":
                                            v = n = 0;
                                            for (m = 0; m < xdata[i].coldata[c].values.length; m++) {
                                                if (EncodingClass.type.isNumber(xdata[i].coldata[c].values[m][sc])) {
                                                    v += xdata[i].coldata[c].values[m][sc];
                                                    n++;
                                                }
                                            }
                                            x.push(v * 1.0 / n);
                                            break;
                                        case "count":
                                            n = 0;
                                            for (m = 0; m < xdata[i].coldata[c].values.length; m++) {
                                                if (xdata[i].coldata[c].values[m][sc].toString().trim() != "") n++;
                                            }
                                            x.push(n);
                                            break;
                                        case "min":
                                            v = xdata[i].coldata[c].values[0][sc];
                                            for (m = 1; m < xdata[i].coldata[c].values.length; m++) {
                                                if (v > xdata[i].coldata[c].values[m][sc]) v = xdata[i].coldata[c].values[m][sc];
                                            }
                                            x.push(v);
                                            break;
                                        case "max":
                                            v = xdata[i].coldata[c].values[0][sc];
                                            for (m = 1; m < xdata[i].coldata[c].values.length; m++) {
                                                if (v < xdata[i].coldata[c].values[m][sc]) v = xdata[i].coldata[c].values[m][sc];
                                            }
                                            x.push(v);
                                            break;
                                    }
                                }
                                c++;
                            }
                            else {
                                for (sc = 0; sc < values.length; sc++) x.push("");
                            }
                        }
                        for (k = 0; k < extras.length; k++) {
                            switch (extras[k].type) {
                                case "sum":
                                    v = 0;
                                    for (c = 0; c < xdata[i].coldata.length; c++) {
                                        for (m = 0; m < xdata[i].coldata[c].extras.length; m++) {
                                            v += xdata[i].coldata[c].extras[m][k];
                                        }
                                    }
                                    x.push(v);
                                    break;
                                case "average":
                                    v = n = 0;
                                    for (c = 0; c < xdata[i].coldata.length; c++) {
                                        for (m = 0; m < xdata[i].coldata[c].extras.length; m++) {
                                            if (EncodingClass.type.isNumber(xdata[i].coldata[c].extras[m][k])) {
                                                v += xdata[i].coldata[c].extras[m][k];
                                                n++;
                                            }
                                        }
                                    }
                                    x.push(v * 1.0 / n);
                                    break;
                                case "count":
                                    n = 0;
                                    for (c = 0; c < xdata[i].coldata.length; c++) {
                                        for (m = 0; m < xdata[i].coldata[c].extras.length; m++) {
                                            if (xdata[i].coldata[c].extras[m][k].toString().trim() != "") n++;
                                        }
                                    }
                                    x.push(n);
                                    break;
                                case "min":
                                    v = xdata[i].coldata[c].extras[0][k];
                                    for (c = 0; c < xdata[i].coldata.length; c++) {
                                        for (m = 0; m < xdata[i].coldata[c].extras.length; m++) {
                                            if (v > xdata[i].coldata[c].extras[m][k]) v = xdata[i].coldata[c].extras[m][k];
                                        }
                                    }
                                    x.push(v);
                                    break;
                                case "max":
                                    v = xdata[i].coldata[c].extras[0][k];
                                    for (c = 0; c < xdata[i].coldata.length; c++) {
                                        for (m = 0; m < xdata[i].coldata[c].extras.length; m++) {
                                            if (v < xdata[i].coldata[c].extras[m][k]) v = xdata[i].coldata[c].extras[m][k];
                                        }
                                    }
                                    x.push(v);
                                    break;
                            }
                        }
                        tdata.push(x);
                    }
                    headers = [];
                    if (cols.length <= 1) {
                        headers.push([]);
                    }
                    else {
                        for (i = 0; i < cols.length; i++) headers.push([]);
                    }
                    headers.push([]);
                    for (i = 0; i < rows.length; i++) {
                        if (headers.length <= 1) {
                            headers[0].push({text: params.headers[rows[i]]});
                        }
                        else {
                            headers[0].push({attrs: {rowSpan: headers.length}, text: params.headers[rows[i]]});
                        }
                    }
                    //if ((cols.length > 1) || (values.length > 1)) {
                    if (mixedcols.length > 0) {
                        theaders = params.headers;
                        var setHeader = function (params) {
                            var i, j, c, h, x;
                            if (params.depth >= cols.length) {
                                if (values.length > 1) {
                                    for (i = 0; i < values.length; i++) {
                                        x = "";
                                        switch (values[i].type) {
                                            case "sum":
                                                x = "Sum of ";
                                                break;
                                            case "average":
                                                x = "Average of ";
                                                break;
                                            case "min":
                                                x = "Minimum of ";
                                                break;
                                            case "max":
                                                x = "Maximum of ";
                                                break;
                                            case "count":
                                                x = "Count of ";
                                                break;
                                        }
                                        headers[params.depth].push({text: x + theaders[values[i].index]});
                                    }
                                }
                                return 1;
                            }
                            c = 0;
                            for (i = params.index; i < mixedcols.length; i++) {
                                for (j = 0; j <= params.depth; j++) {
                                    if (mixedcols[i][j] != mixedcols[params.index][j]) {
                                        if (c*values.length  > 1) {
                                            headers[params.depth].push({
                                                attrs: {colSpan: c*values.length },
                                                text: mixedcols[params.index][params.depth]
                                            });
                                        }
                                        else {
                                            headers[params.depth].push({text: mixedcols[params.index][params.depth]});
                                        }
                                        return c;
                                    }
                                }
                                h = params.setHeader({
                                    setHeader: params.setHeader,
                                    index: i,
                                    depth: params.depth + 1
                                });
                                i += h - 1;
                                c += h;
                            }
                            if (c*values.length > 1) {
                                headers[params.depth].push({
                                    attrs: {colSpan: c*values.length},
                                    text: mixedcols[params.index][params.depth]
                                });
                            }
                            else {
                                headers[params.depth].push({text: mixedcols[params.index][params.depth]});
                            }
                            return c;
                        }
                        setHeader({
                            setHeader: setHeader,
                            index: 0,
                            depth: 0
                        });
                        for (i = 1; i < mixedcols.length; i++) {
                            if (mixedcols[i][0] != mixedcols[i-1][0]) {
                                setHeader({
                                    setHeader: setHeader,
                                    index: i,
                                    depth: 0
                                });
                            }
                        }
                    }
                    for (i = 0; i < extras.length; i++) {
                        x = "";
                        switch (extras[i].type) {
                            case "sum":
                                x = "Sum of ";
                                break;
                            case "average":
                                x = "Average of ";
                                break;
                            case "min":
                                x = "Minimum of ";
                                break;
                            case "max":
                                x = "Maximum of ";
                                break;
                            case "count":
                                x = "Count of ";
                                break;
                        }
                        if (headers.length == 1) {
                            headers[0].push({text: x + params.headers[extras[i].index]});
                        }
                        else {
                            headers[0].push({attrs: {rowSpan: headers.length}, text: x + params.headers[extras[i].index]});
                        }
                    }
                    return {
                        headers: headers,
                        mixedcols: mixedcols,
                        data: tdata
                    }
                };
            </script>
            <?php
        }

        public static function generate($uri, $data) {
            $n = sizeof($data);
            if (isset($data["sheets"])) {
                $data = EncodingClass::fromVariable($data);
            }
            else {
                $data = EncodingClass::fromVariable(array(
                    "n" => $n,
                    "data" => $data
                ));
            }
            $ch = curl_init();
            curl_setopt_array($ch, array(
                CURLOPT_URL => $uri,
                CURLOPT_POST => 1,
                CURLOPT_HEADER => true,
                CURLOPT_HTTPHEADER => array("Content-Type:multipart/form-data"),
                CURLOPT_POSTFIELDS => array('params' => $data),
                CURLOPT_RETURNTRANSFER => true
            ));
            $ch = curl_exec($ch);
            $k = strpos($ch, "ExcelGenerator:");
            if ($k !== FALSE) {
                return substr($ch, $k + strlen("ExcelGenerator:"));
            }
            else {
                return "";
            }
        }

        public static function extract($uri, $data) {
            $ch = curl_init();
            curl_setopt_array($ch, array(
                CURLOPT_URL => $uri,
                CURLOPT_POST => 1,
                CURLOPT_HEADER => true,
                CURLOPT_HTTPHEADER => array("Content-Type:multipart/form-data"),
                CURLOPT_POSTFIELDS => array('data' => $data),
                CURLOPT_RETURNTRANSFER => true
            ));
            $ch = curl_exec($ch);
            $k = strpos($ch, "ExcelExtractor:");
            if ($k !== FALSE) {
                return substr($ch, $k + strlen("ExcelExtractor:"));
            }
            else {
                return "";
            }
        }
    };
?>
