<?php
//website url
$siteURL = "https://lab.daithangminh.vn/home_co/Form/XMLparse/XMLparseForm_getByUrl.php?id=".$data["id"]."&screenshot=true";

//call Google PageSpeed Insights API
$gData = file_get_contents("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$siteURL&screenshot=true");

//decode json data
$gData = json_decode($gData, true);

//print_r($gData);

//screenshot data
$screenshot = $gData['lighthouseResult']['audits']['final-screenshot']['details']['data'];
//$screenshot = str_replace(array('_','-'),array('/','+'),$screenshot); 
// JSON.parse(e.target.responseText).lighthouseResult.audits["final-screenshot"].details.data
//display screenshot image
echo "<img src=\"".$screenshot."\" />";
?>