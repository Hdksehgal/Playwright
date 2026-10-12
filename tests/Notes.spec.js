/*
if we want to use record testcases using Test Generator Codegen
we'll use the below command:
-npx playwright codegen

what will happen in this is a playwright inspector and web browser will open
playwright inspector will record the code for the actions being performed in web browser
and we can copy that code to the visual studio code editor

when we close the playwright inspector it will automatically generate the testcase file 

-Record button: we can press the record button to stop recording our actions in the playwright inspector
-Pick Locator button: we can click on this button and then go to the browser window and select any element for whom we wish to have the locator
-Target dropdown: we can change the code on the basis of Target language or framework
Nodejs -> Javascript
Python
Net C# -> NUnit
Java

if you want to deep dive in for codegen use the below command
-npx playwright codegen --help

-if we use "npx playwright codegen --device "iPhone13" " 
this will open a an iphone simulator at the place of web browser
-if you want to check what other device we have give incorrect name in device name it will display the list of device's name

we can use the below command to open the web browser of specific size, 1280 is the x axis and 720 is y coordinate
-npx playwright codegen --viewport-size "1280,720"

*/