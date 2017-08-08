# CDKApp
MindTree Assignment

Project Title

CitySDK  App to display list of parking location in Amsterdam along with other details in Map. 

Prerequisites

 Any web browser (chrome, Mozilla , safari).

Assumptions

  For displaying parking availability on based on following calculation:
     
     Green light : if more than 15% of parking capacity.
     Red Light:  if less than  or equal to 15% of parking capacity.

 
Getting Started

  Below are the Steps to run CitySDK App:
  
1.Open index.html file in any browser. It will call API to get the list of parking   garage. API will called continuously at the interval of 10 sec to get the live data.
  
 2. It will redirect page to parkingGarage page here it will display parking garage list. Each list item is clickable. When user click on any item it will shrink the width of list container and will show map on right side.

 3.  When user clicks on map marker icon it will open info window to show details related to particular parking garage.

 4. Info Window content contain parking garage Name and long and short parking capacity and availability along with signal image (red on green based   on condition mentioned in assumption.)

 5.On top right on Map when user click on close button .Map will be closed and garage  list will capture full width.


Note:

Lack of clarity:

 API response have two types of parking (Long and short) so which to use for showing green and red light. That’s why not showing red or green light in list itself.

Issues:

 Getting CORS issue to load html template if using separate file (because we are running app directly from file).
So to avoid that issue Templates are used inside component.




