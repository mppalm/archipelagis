# archipelagis
Data for the geospatial project. <br/>
<br/>
<br/>
Access the web map via this link: <br/>
https://mppalm.github.io/archipelagis/
<br/>
<br/>

<b> "population_2045.csv" <b/>
<br/>
How to upload the file "population_2045.csv" into QGIS: <br/>
In GQIS, go to Layer > Add Layer > Add Delimited Text Layer.

- Choose the csv file, give it a name. <br/>
- Encoding: latin1 (utf-8 does not display the ä,ö letters properly)
- File format: CSV
- Geometry definition: check "No geometry (attribute only table)".
- Add.
<br/>

<b> "paavo_municipality_codes_2024.csv" <b/>
<br/>
- Upload it into QGIS the same way as the "population_2045.csv", except change:
- Encoding: latin1
- File format: Custom delimiters > Semicolon
- Layer Settings: change "Municipality code" data type into "Text (string)"
- Add.
<br/>
The paavo_municipality_codes_2024.csv is derived from <br/>
"Postal code - municipality key 2024" Excel file available at <br/>
https://stat.fi/tup/paavo/paavon_aineistokuvaukset_en.html.
<br/>
<br/>
<b> "paavo_2024" </b>
Folder includes the "paavo_sw_f_2024.shp" file. <br/>
Attribute description: <br/>
- area = total area of the municipality <br/>
- mun_code = municipality code <br/>
- 65_69 = 65-69 years old population (the rest of the age groups have similar logic) <br/>
- elderly = paavo pt_elakel attribute renamed, refers to pensioners (those who receive pension) <br/>
- mun = municipality name <br/>
<br/>
<br/>
<b> "paavo_2045" </b>
Folder includes the "paavo_sw_f_2045.shp" file. <br/>
Same attributes from the 2024 version and in addition: <br/>
- 2045_total = total population (all age groups) <br/>
- 2045_65-74 = estimated population of 65-74 years old in 2045 <br/>
- 2045_75- = estimated population of over 75 years old in 2045 <br/>
   
  


