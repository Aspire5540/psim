<?php 
  require_once("..\config.php");
  ini_set('max_execution_time', '300000000');
  date_default_timezone_set('Asia/Bangkok');
 
?>  
  <html>
  <head>
  <title>Matching Map</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">		
      <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
      <title>Tiled map service</title>
      <!-- <link rel="stylesheet" href="https://js.arcgis.com/3.20/esri/themes/calcite/dijit/calcite.css">
      <link rel="stylesheet" href="https://js.arcgis.com/3.20/esri/themes/calcite/esri/esri.css"> -->
      <link rel="stylesheet" href="https://js.arcgis.com/4.18/esri/css/main.css">
      <style>
        html, body, #map {
        height: 98%;
        margin: 0;
        padding: 0;
        }
      </style>
  
  </head>
  
  <body class="calcite"> 
  <div>
  <!-- <?php
  // $searchNo = $_POST['search'];
  
  // $sqlPTCGIS = "SELECT * FROM ptcgis where PEA_NO = '".$searchNo."'";
  // $resultPTCGIS = mysqli_query($conn,$sqlPTCGIS);
  // $PTCGIS = mysqli_fetch_array($resultPTCGIS);
  // if ($PTCGIS) 
  // {	
  //   print "<table width=100% border=1 cellpadding=3>"; 
  //   print "<tr><td>PEA NO</td><td>CA</td><td>การไฟฟ้า</td><td>FEEDER</td><td>ลูกค้า</td><td>Location</td><td>พิกัดจากเครื่องจดหน่วย PTC(Lat,Long)</td><td>พิกัดจาก GIS(Lat,Long)</td><td>ระยะห่าง (เมตร)</td></tr>"; 
  //   print "<tr><td>".$PTCGIS['PEA_NO']. "</td>"; 
  //     print "<td>".$PTCGIS['CA']. "</td>"; 
  //     print "<td>".$PTCGIS['SERVICE']."</td>"; 
  //   print "<td>".$PTCGIS['FEEDERID']."</td>"; 
  //   print "<td>".$PTCGIS['CUSTOMER']."</td>"; 
  //   print "<td>".$PTCGIS['LOCATION']."</td>"; 
  //   print "<td>".$PTCGIS['PTC_LAT']." , ".$PTCGIS['PTC_LON']."</td>"; 
  //     print "<td>".$PTCGIS['GIS_LAT']." , ".$PTCGIS['GIS_LON']."</td>"; 
  //   print "<td>".distanceGeoPoints($PTCGIS['PTC_LAT'],$PTCGIS['PTC_LON'],$PTCGIS['GIS_LAT'],$PTCGIS['GIS_LON'])."</td></tr>";
    
  // }
  // else
  //   echo "ไม่พบข้อมูลมิเตอร์" ;	
  ?> -->
  <?php
  $resultxy = array();
  //$searchNo = $_POST['search'];
  
  $sqlTMatch = "SELECT * FROM trmatch where kva = 50 AND PLoadTOT >= 100";
  $resultTMatch = mysqli_query($conn,$sqlTMatch);
  $TMatch = mysqli_fetch_array($resultTMatch);
  //echo $TMatch[0];
  while ($TMatch){
    
    $xy = array($TMatch['x'],$TMatch['y']);
    echo $xy[0];
    array_push($resultxy,$xy);
  }
  echo  $resultxy;
  echo  count($resultxy);
  ?>
  </div>
  <!-- <script>
   var TX = "<?php print $TMatch['x'] ?>";
   var TY = "<?php print $TMatch['y'] ?>";
   var NX = "<?php print $TMatch['newx'] ?>";
   var NY = "<?php print $TMatch['newy'] ?>";
        dojoConfig = {
          parseOnLoad: true,
          async: true
        };
      </script>
      <script src="https://js.arcgis.com/3.204.18/"></script>
      <script>
        require([
        "dojo/parser",
        "dojo/ready",	
        "dojo/on",
        "dojo/dom",
        "dijit/registry",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "esri/map", 
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        
        "esri/graphic",
      
        "esri/tasks/QueryTask",
        "esri/tasks/query",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol"
        ], function(
        parser,
        ready,
        on,
        dom,
        registry,
        TextBox,
        Button,
        Map,
        ArcGISDynamicMapServiceLayer,
        ArcGISTiledMapServiceLayer,
        
        Graphic,
        
        QueryTask,
        Query,
        Graphic,
        SimpleMarkerSymbol,	
        ) {
          ready(function(){
            map = new Map("map", {});
            
            var tiled = new ArcGISTiledMapServiceLayer("http://gisn2.pea.co.th/arcgis/rest/services/PEA_CACHE_NOSTRA/MapServer");
            map.addLayer(tiled);
        
            var dynamic = new ArcGISDynamicMapServiceLayer("http://gisn2.pea.co.th/arcgis/rest/services/PEA_STAFF_POLE_VIEW/MapServer");
            map.addLayer(dynamic);
        
            on(map, "load", function(myMap){
              
              on(registry.byId("btnSearch"), "click", search);
            
            });
          }); 	
          
          function search(){
            var queryTask = new QueryTask("http://gisn2.pea.co.th/arcgis/rest/services/PEA_STAFF_POLE_VIEW/MapServer/4");
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.where =  "PEANO like '%" + registry.byId("txtSearch").get("value") + "%'";
            query.outSpatialReference = map.spatialReference;
            queryTask.execute(query, showResults);
          }        
          
          function showResults (results) {
            console.log("ผลลัพธ์การค้นหา",results);
            window.resultsGIS = results;
            if(results.features.length == 0){
              alert("ไม่พบข้อมูลที่ท่านค้นหา");
            }
            else{
              var tableStr = "<table border='1' cellpadding='3' cellspacing='3'>";
              tableStr += "<tr>";
              tableStr += "<th>PEANO</td>";
              tableStr += "</tr>";
              
              for(var i = 0; i < results.features.length; i++){
                tableStr += "<tr onclick='row_click("+results.features[i].attributes.OBJECTID+")'>";
                tableStr += "<td>" + results.features[i].attributes.PEANO + "</td>";
                tableStr += "</tr>";
              }
              
              tableStr += "</table>";
              dom.byId("divResult").innerHTML = tableStr;
            }
          }
          
          row_click = function(objectid){
            console.log("objectid", objectid);
            map.graphics.clear();
            for(var i = 0; i < window.resultsGIS.features.length; i++){
              if(window.resultsGIS.features[i].attributes.OBJECTID == objectid){
                var symbol = new SimpleMarkerSymbol();
                var graphic = new Graphic(window.resultsGIS.features[i].geometry,symbol);
                map.graphics.add(graphic);
                map.centerAndZoom(window.resultsGIS.features[i].geometry,13);
                break;
              }
            }
          }
        });
        
      </script> -->
  <!-- <div id="map">
        <div style="position:absolute;z-Index:999;background-color:white;width:300px;height:100px;top:10px;right:10px;overflow:auto;">
          <div id="txtSearch" data-dojo-type="dijit/form/TextBox"></div>
          <div id="btnSearch" data-dojo-type="dijit/form/Button" data-dojo-props="label:'ค้นหา'"></div> 
          <div id="divResult"></div>
        </div>
  </div>
  </body>
  </html> -->
  