<?php

$LanguageModule_v_jswritten = 0;
$LanguageModule_v_defaultprofile = "";
$LanguageModule_v_defaultcode = "VN";

function LanguageModule_f_imageslink($code) {
    global $LanguageModule_v_languageCode, $LanguageModule_v_defaultcode;
    if ($code == "") $code = $LanguageModule_v_defaultcode;
    $k = sizeof($LanguageModule_v_languageCode);
    for ($i = 0; $i < $k; $i++) {
        if ($code == $LanguageModule_v_languageCode[$i][0]) return $LanguageModule_v_languageCode[$i][2];
    }
    return "";
}

function LanguageModule_initCountryCode() {
    global $LanguageModule_v_languageCode;

    $LanguageModule_v_languageCode = array( // must be sorted
        array("EN-US", "English - US", "./images/nationalflags/US.png"),
        array("VN", "Tiếng Việt", "./images/nationalflags/VN.png")
    );
}

function LanguageModule_text($key) {
    global $LanguageModule_v_languagesData, $LanguageModule_v_defaultcode, $LanguageModule_v_defaultprofile;
    return $LanguageModule_v_languagesData[$LanguageModule_v_defaultprofile][$key][$LanguageModule_v_defaultcode];
}

function LanguageModule_load($languageprofile, $tablename) {
    global $LanguageModule_v_languagesData, $LanguageModule_v_defaultprofile;
    $st = "SELECT `key`, `code`, `value` FROM ".$tablename;
    $result = mysql_query($st);
    
    $temp["default"]["default"] = "default";
    while ($row = mysql_fetch_row($result)) {
        $temp[$row[0]][$row[1]] = ($row[2]);
    }
    $LanguageModule_v_languagesData[$languageprofile] = $temp;
    if (strcmp($LanguageModule_v_defaultprofile, "") == 0) $LanguageModule_v_defaultprofile = $languageprofile;
}

function LanguageModule_writeJavascript($languageprofile, $code) {
    global $LanguageModule_v_jswritten, $LanguageModule_v_languageCode, $LanguageModule_v_languagesData;
    if ($LanguageModule_v_jswritten == 1) return;
    $LanguageModule_v_jswritten = 1;
    LanguageModule_initCountryCode();
    ?>
    <script type="text/javascript">
        "use strict";
        var LanguageModule = {
            code: [<?php
            $k = sizeof($LanguageModule_v_languageCode);
            for ($i = 0; $i < $k; $i++) {
                if ($i != 0) echo ", ";
                echo "{name: Base64.decode('".base64_encode($LanguageModule_v_languageCode[$i][0])."'), value: Base64.decode('".base64_encode(safeSQL_dec($LanguageModule_v_languageCode[$i][1]))."')}";
            }
            ?>],
            data: [],
            defaultprofile: Base64.decode("<?php echo base64_encode($languageprofile);?>"),
            defaultcode: Base64.decode("<?php echo base64_encode($code);?>"),
            setDefaultprofile: function (profile) {
                LanguageModule.defaultprofile = profile;
            },
            setDefaultCode: function (code) {
                LanguageModule.defaultcode = code;
            },
            getCodeIndex: function (codename) {
                var l, r, m, k;
                l = 0;
                r = LanguageModule.code.length - 1;
                while (l <= r) {
                    m = (l + r) >> 1;
                    k = stricmp(codename, LanguageModule.code[m].name);
                    if (k == 0) return m;
                    if (k < 0) {
                        r = m - 1;
                    }
                    else {
                        l = m + 1;
                    }
                }
                return -1;
            },
            text: function (profile, key, code) {
                var i, j, cIndex;
                if (key === undefined) {
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                    code = LanguageModule.defaultcode;
                }
                if (code === undefined) {
                    code = key;
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                }
                cIndex = LanguageModule.getCodeIndex(code);
                if (cIndex == -1) return "[key: " + key + "]";
                for (i = 0; i < LanguageModule.data.length; i++) {
                    if (LanguageModule.data[i].profile == profile) {
                        for (j = 0; j < LanguageModule.data[i].content.length; j++) {
                            if (LanguageModule.data[i].content[j].key == key) return LanguageModule.data[i].content[j].value[cIndex];
                        }
                        break;
                    }
                }
                return "[key: " + key + "]";
            },
            text2: function (profile, key, code, value) {
                if (code === undefined) {
                    value = key;
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                    code = LanguageModule.defaultcode;
                }
                if (value === undefined) {
                    value = code;
                    code = key;
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                }
                return printf(LanguageModule.text(profile, key, code), value);
            },
            insert: function (profile, key, code, value) {
                var i, t, cIndex, pIndex = -1;
                if (code === undefined) {
                    value = key;
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                    code = LanguageModule.defaultcode;
                }
                if (value === undefined) {
                    value = code;
                    code = key;
                    key = profile;
                    profile = LanguageModule.defaultprofile;
                }
                cIndex = LanguageModule.getCodeIndex(code);
                if (cIndex == -1) return;
                for (i = 0; i < LanguageModule.data.length; i++) {
                    if (LanguageModule.data[i].profile == profile) {
                        pIndex = i;
                        break;
                    }
                }
                if (pIndex == -1) {
                    pIndex = LanguageModule.data.length;
                    LanguageModule.data.push({
                        profile: profile,
                        content: []
                    });
                }
                for (i = 0; i < LanguageModule.data[pIndex].content.length; i++) {
                    if (LanguageModule.data[pIndex].content[i].key == key) {
                        LanguageModule.data[pIndex].content[i].value[cIndex] = value;
                        return;
                    }
                }
                t = [];
                for (i = 0; i < LanguageModule.code.length; i++) {
                    t.push("[key: " + key + "]");
                }
                t[cIndex] = value;
                LanguageModule.data[pIndex].content.push({
                    key: key,
                    value: t
                });
            }
        }
    <?php
        foreach ($LanguageModule_v_languagesData as $languageprofilename => $languageprofiledata) {
            foreach ($languageprofiledata as $keyname => $keydata) {
                foreach ($keydata as $codename => $value) {
                    echo "LanguageModule.insert(Base64.decode('".base64_encode($languageprofilename)."'), Base64.decode('".base64_encode($keyname)."'), Base64.decode('".base64_encode($codename)."'), Base64.decode('".base64_encode($value)."'));\r\n";
                }
            }
        }
    ?>
    </script>
    <?php
}

?>
